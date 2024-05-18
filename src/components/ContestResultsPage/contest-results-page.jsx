import './contest-results-page.css'
import Input from "../Input/input";
import AuthorName from "../AuthorName/author-name";
import WithInfo from "../WithInfo/with-info";
import ReloadSVG from "../../utils/imgs/SVGs/ReloadSVG.svg";
import ChangeSVG from "../../utils/imgs/SVGs/ModifySVG.svg";
import Missing from "../Missing/missing";
import Transition from "../../utils/js/transitions";
import {useDispatch, useSelector} from "react-redux";
import {getUser} from "../../utils/store/user-store/user-store-selectors";
import {useParams} from "react-router-dom";
import useFetchHook from "../../utils/hooks/fetchHook";
import {useEffect, useState} from "react";
import useUpdateData from "../../utils/hooks/updateDataHook";
import ChallengeCard from "../ChallengeCard/challenge-card";
import SecondPlaceSVG from "../../utils/imgs/SVGs/Second place.svg";
import FirstPlaceSVG from "../../utils/imgs/SVGs/First place.svg";
import ThirdPlaceSVG from "../../utils/imgs/SVGs/Third place.svg";
import {overdue} from "../../utils/js/functions";
const ContestResultsPage = () => {
    const user = useSelector(getUser)
    const contestID = useParams()['id']
    const sendRequest = useFetchHook()
    const [data, setData] = useState(undefined)


    useEffect(() => {
        (async () => {
            const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/contests/${contestID}`, undefined, 'GET', true)
            console.log('res', res)
            setData(res)
        })()
    }, []);

    const [dataChallenge, setDataChallenge] = useState(undefined)

    const filterChallengeLeaderboard = async (challengeSlug) => {
        const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/contest-challenge-leaderboard/${contestID}/${challengeSlug}`, undefined, 'GET', true)
        if(res) {
            // res.submissions?.sort((s1, s2) => {
            //     if (s1.exec_time >= s2.exec_time)
            //         return 1
            //     return -1
            // })
            setDataChallenge({
                submissions: res
            })
        }
    }
    console.log('aaa', dataChallenge)
    if(data)
    return (
        <Transition mode='fullscreen'>
            <div className='wrapper contest-results-page'>
                <div className="contest-results-header">
                    {/*<div className="enrollment-details-main">*/}
                    {/*</div>*/}

                </div>
                {/*<div className='results-inner'>*/}
                    {/*{data.people.map(person => {*/}
                    {/*    return <AuthorName author={person} color='dark' />*/}
                    {/*})}*/}
                {(user.admin_user || overdue(data.start_date, data.start_time)) &&
                    <div className="results-challenges">
                        {data.challenges.map(challenge => {
                            return <div onClick={() => filterChallengeLeaderboard(challenge.slug)}>
                                <ChallengeCard noLink={true} authoColor='dark' challenge={challenge} type='small-card'/>
                            </div>
                        })}
                    </div>
                }


                {/*</div>*/}
                {(dataChallenge && (user.admin_user || overdue(data.start_date, data.start_time))) &&
                    <>
                        <div className="leaderboard-podium">
                            <div className="second-place leaderboard-place">
                                <img className='icon-svg' src={SecondPlaceSVG} alt=""/>
                                {dataChallenge.submissions[1] ?
                                    <p>{(dataChallenge.submissions[1]?.exec_time * 1000).toString().slice(0, 6)} ms</p>
                                    : <p>No time</p>}
                                <AuthorName color='light' author={dataChallenge.submissions[1]?.user}/>
                            </div>
                            <div className="first-place leaderboard-place">
                                <img className='icon-svg' src={FirstPlaceSVG} alt=""/>
                                {dataChallenge.submissions[0] ?
                                    <p>{(dataChallenge.submissions[0]?.exec_time * 1000).toString().slice(0, 6)} ms</p>
                                    : <p>No time</p>}
                                <AuthorName color='light' author={dataChallenge.submissions[0]?.user}/>
                            </div>
                            <div className="third-place leaderboard-place">
                                <img className='icon-svg' src={ThirdPlaceSVG} alt=""/>
                                {dataChallenge.submissions[2] ?
                                    <p>{(dataChallenge.submissions[2]?.exec_time * 1000).toString().slice(0, 6)} ms</p>
                                    :
                                    <p>No time</p>}

                                <AuthorName color='light' author={dataChallenge.submissions[2]?.user}/>
                            </div>
                        </div>

                        <div className="leaderboard-non-podium">
                            {dataChallenge.submissions?.map((submission, idx) => {
                                if (idx > 2)
                                    return <div
                                        className={`leaderboard-non-podium-place ${user.user_id === submission.user.user_id ? 'high-place' : null}`}>
                                        <p>{idx + 1}</p>
                                        <AuthorName color={user.user_id === submission.user.user_id ? 'dark' : 'light'}
                                                    author={submission.user}/>
                                        <p>{(submission.exec_time * 1000).toString().slice(0, 6)} ms</p>
                                    </div>
                                else
                                    return <></>
                            })}
                        </div>
                    </>

                }


            </div>

        </Transition>
    )
}
export default ContestResultsPage