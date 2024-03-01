import './contest-page.css'
import LighthouseNavigation from "../Lighthouse/LighthouseNavigation/lighthouse-navigation";
import TopSection from "../TopSection/top-section";
import AuthorName from "../AuthorName/author-name";
import {Link, Outlet, useParams} from "react-router-dom";
import Transition from "../../utils/js/transitions";
import {useCallback, useEffect, useState} from "react";
import useFetchHook from "../../utils/hooks/fetchHook";
import ContestNavigation from "../ContestNavigation/contest-navigation";
import DateTime from "../DateTime/date-time";
import CalendarSVG from "../../utils/imgs/SVGs/CalendarSVG.svg";
import ClockSVG from "../../utils/imgs/SVGs/ClockSVG.svg";
import LiveSVG from "../../utils/imgs/SVGs/LiveSVG.svg";
import Button from "../Button/button";
import WithInfo from "../WithInfo/with-info";
import Missing from "../Missing/missing";
import {useDispatch, useSelector} from "react-redux";
import {getUser} from "../../utils/store/user-store/user-store-selectors";
import {setModal, setModalContent} from "../../utils/store/utils-store/utils-store-actions";
import ChallengeCard from "../ChallengeCard/challenge-card";
import Heading from "../Heading/heading";
import useUpdateData from "../../utils/hooks/updateDataHook";
import {objectIn} from "../../utils/js/functions";
const ContestPage = () => {
    const id = useParams().id
    const [data, setData] = useState(undefined)
    const sendRequest = useFetchHook()
    const updateUser = useUpdateData()

    useEffect(() => {
        (async () => {
            updateUser(true)
            const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/contests/${id}`, undefined, 'GET', false)
            setData(res)
        })()
    }, []);





    if(data) {
        const timeRemaining = Date.parse(`${data.start_date} : ${data.start_time}`) - Date.now()
        const timeRemainingSolve = Date.parse(`${data.end_date} : ${data.end_time}`) - Date.now()
        const timeRemainingReadable = Math.floor(timeRemaining / 60000)
        const timeRemainingSolveReadable = Math.floor(timeRemainingSolve / 60000)
        return (
            <Transition mode='fullscreen'>
                <ContestNavigation/>
                <TopSection nameOfPage='Contest' children={<>
                    <div className="contest-card-content">
                        {/*<AuthorName color='dark' author={data.author} />*/}
                        <DateTime data={data.start_date} color='light' icon={CalendarSVG}/>
                        <DateTime data={data.start_time} color='light' icon={ClockSVG}/>
                        <div>
                            {timeRemainingReadable < 0 && timeRemainingSolveReadable < 0 ? null :
                                <img className='icon-svg' src={LiveSVG} alt=""/>

                            }
                            {timeRemainingReadable >= 0 ?
                                <WithInfo data='Time until the contest starts!' clickHandler={undefined}><p>{timeRemainingReadable} minutes to go!</p></WithInfo>
                                :
                                timeRemainingSolveReadable >= 0 ?
                                <>
                                    <WithInfo data='Time until the end of the contest! Good luck! Note: You will be able to continue solving the challenges after the time expires, but the results will not be counted for this contest.' clickHandler={undefined} ><p>{timeRemainingSolveReadable} minutes to go!</p></WithInfo>
                                    {/*<Link to='solve'><Button marginated={true} color='light' text='Start'/></Link>*/}
                                </>
                                    : <p>Contest ended.</p>
                            }
                        </div>
                    </div>
                </>}
                            title={data.archived ? `${data.name} (archived)` : data.public ? `${data.name} {community}` : data.name}/>

                <Outlet />
            </Transition>
        )
    }
}
export default ContestPage