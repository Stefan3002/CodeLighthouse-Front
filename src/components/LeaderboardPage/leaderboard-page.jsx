import './leaderboard-page.css'
import Transition from "../../utils/js/transitions";
import {useEffect, useState} from "react";
import useFetchHook from "../../utils/hooks/fetchHook";
import {useParams} from "react-router-dom";
import AuthorName from "../AuthorName/author-name";
import FirstPlaceSVG from '../../utils/imgs/SVGs/First place.svg'
import SecondPlaceSVG from '../../utils/imgs/SVGs/Second place.svg'
import ThirdPlaceSVG from '../../utils/imgs/SVGs/Third place.svg'
import {useSelector} from "react-redux";
import {getUser} from "../../utils/store/user-store/user-store-selectors";
const LeaderboardPage = () => {
    const sendRequest = useFetchHook()
    const [data, setData] = useState(undefined)
    const slug = useParams().slug
    const user = useSelector(getUser)

    useEffect(() => {
        (async () => {
            const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/challenges/${slug}`, undefined, 'GET', false)
            if(res) {
                res.submissions?.sort((s1, s2) => {
                    if (s1.exec_time >= s2.exec_time)
                        return 1
                    return -1
                })
                setData(res)
            }
        })()
    }, []);

    if(data)
    return (
        <Transition mode='fullscreen'>
            <div className='wrapper leaderboard-page'>
                <div className="leaderboard-podium">
                    <div className="second-place leaderboard-place">
                        <img className='icon-svg' src={SecondPlaceSVG} alt=""/>
                        {data.submissions[1] ?
                        <p>{(data.submissions[1]?.exec_time * 1000).toString().slice(0, 6)} ms</p>
                        : <p>No time</p> }
                            <AuthorName color='light' author={data.submissions[1]?.user} />
                    </div>
                    <div className="first-place leaderboard-place">
                        <img className='icon-svg' src={FirstPlaceSVG} alt=""/>
                        {data.submissions[0] ?
                        <p>{(data.submissions[0]?.exec_time * 1000).toString().slice(0, 6)} ms</p>
                        : <p>No time</p> }
                            <AuthorName color='light' author={data.submissions[0]?.user} />
                    </div>
                    <div className="third-place leaderboard-place">
                        <img className='icon-svg' src={ThirdPlaceSVG} alt=""/>
                        {data.submissions[2] ?
                            <p>{(data.submissions[2]?.exec_time * 1000).toString().slice(0, 6)} ms</p>
                        :
                        <p>No time</p>}

                        <AuthorName color='light' author={data.submissions[2]?.user} />
                    </div>
                </div>

                <div className="leaderboard-non-podium">
                    {data.submissions?.map((submission, idx) => {
                        if(idx > 2)
                            return <div className={`leaderboard-non-podium-place ${user.user_id === submission.user.user_id ? 'high-place' : null}`}>
                                <p>{idx + 1}</p>
                                <AuthorName color={user.user_id === submission.user.user_id ? 'dark' : 'light'} author={submission.user} />
                                <p>{(submission.exec_time * 1000).toString().slice(0, 6)} ms</p>
                            </div>
                        else
                            return <></>
                    })}
                </div>

            </div>
        </Transition>
    )
}
export default LeaderboardPage