import './lighthouse-assignments-page.css'
import Missing from "../Missing/missing";
import Button from "../Button/button";
import {useDispatch, useSelector} from "react-redux";
import {setModal, setModalContent} from "../../utils/store/utils-store/utils-store-actions";
import {useEffect, useState} from "react";
import useFetchHook from "../../utils/hooks/fetchHook";
import {useParams} from "react-router-dom";
import {getUser} from "../../utils/store/user-store/user-store-selectors";
import ChallengeCard from "../ChallengeCard/challenge-card";
const LighthouseAssignmentsPage = () => {
    const dispatch = useDispatch()
    const [data, setData] = useState(undefined)
    const sendRequest = useFetchHook()
    const lighthouseId = useParams().id
    const user = useSelector(getUser)
   const assignChallenge = () => {
       dispatch(setModal(true))
       dispatch(setModalContent('assignChallenge'))
   }
    useEffect(() => {
        (async () => {
            const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/lighthouses/${lighthouseId}`, undefined , 'GET', false)
            setData(res)
        })()
    }, []);
    console.log(data)
   if (data)
    return (
        <div className='wrapper assignments-page'>
            {!data.assignments.length ? <Missing text='No assignments yet!' /> :
                <>
                    {data.assignments.map(assignment => {
                        return <ChallengeCard challenge={assignment} type='assignment' />
                    })}
                </>
            }
            {user.user_id === data.author.user_id ? <Button type='plus' callback={assignChallenge} /> : null}

        </div>
    )
}
export default LighthouseAssignmentsPage