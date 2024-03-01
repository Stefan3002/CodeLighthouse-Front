import './contest-home-page.css'
import Heading from "../Heading/heading";
import {objectIn} from "../../utils/js/functions";
import ChallengeCard from "../ChallengeCard/challenge-card";
import Missing from "../Missing/missing";
import Button from "../Button/button";
import {setModal, setModalContent} from "../../utils/store/utils-store/utils-store-actions";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import useFetchHook from "../../utils/hooks/fetchHook";
import {useDispatch, useSelector} from "react-redux";
import {getUser} from "../../utils/store/user-store/user-store-selectors";
import useUpdateData from "../../utils/hooks/updateDataHook";
const ContestHomePage = () => {
    const id = useParams().id
    const [data, setData] = useState(undefined)
    const sendRequest = useFetchHook()
    const user = useSelector(getUser)
    const dispatch = useDispatch()
    const [solvedChallenges, setSolvedChallenges] = useState([])
    const updateUser = useUpdateData()
    const addChallenges = () => {
        dispatch(setModal(true))
        dispatch(setModalContent({
                type: 'contest-challenge',
                content: data.id
            }
        ))
    }
    useEffect(() => {
        const solved = []
        if(data)
            for(const challenge of data.challenges)
                for (const submission of user.submissions) {
                    if (challenge.slug === submission.challenge
                        &&
                        (new Date(`${submission.date} : ${submission.time}`) >= new Date(`${data.start_date} : ${data.start_time}`))
                        &&
                        (new Date(`${submission.date} : ${submission.time}`) <= new Date(`${data.end_date} : ${data.end_time}`))
                    )
                        solved.push(challenge)
                }
        setSolvedChallenges(solved)
    }, [data]);
    useEffect(() => {
        (async () => {
            updateUser(true)
            const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/contests/${id}`, undefined, 'GET', false)
            setData(res)
        })()
    }, []);
    console.log('aa', solvedChallenges)
    if(data) {
        const timeRemaining = Date.parse(`${data.start_date} : ${data.start_time}`) - Date.now()
        const timeRemainingSolve = Date.parse(`${data.end_date} : ${data.end_time}`) - Date.now()
        const timeRemainingReadable = Math.floor(timeRemaining / 60000)
        const timeRemainingSolveReadable = Math.floor(timeRemainingSolve / 60000)
        return (
            <div className='wrapper contest-page'>
                <Heading
                    text={`Your challenges (${data.challenges.length ? data.challenges.length - solvedChallenges.length : 'TBA'} remaining)`}/>
                <div className="contest-challenges">
                    {(timeRemainingReadable <= 0 || user.admin_user) && data.challenges && data.challenges.length ? data.challenges.map(challenge => {
                            if (!objectIn(solvedChallenges, challenge))
                                return <ChallengeCard authoColor='dark' challenge={challenge}/>
                        }) :
                        <div>
                            <Missing text='The organisers have not chosen the challenges yet!'/>
                            {user.admin_user &&
                                <>
                                    <p>Are you an admin?</p>
                                    <p>Select challenges for this contest by pressing the button below</p>
                                    <Button callback={addChallenges} text='Add challenges'/>
                                </>
                            }

                        </div>
                    }
                </div>
                <Heading
                    text={`Solved challenges (${solvedChallenges.length ? solvedChallenges.length : '0'} solved)`}/>
                <div className="contest-challenges">
                    {(timeRemainingReadable <= 0 || user.admin_user) && solvedChallenges && solvedChallenges.length ? solvedChallenges.map(challenge => {
                            return <ChallengeCard authoColor='dark' challenge={challenge}/>
                        }) :
                        <Missing text='No challenge solved yet!'/>
                    }
                </div>
                {user.admin_user && <Button callback={addChallenges} type='plus'/>}
            </div>

        )
    }
}
export default ContestHomePage