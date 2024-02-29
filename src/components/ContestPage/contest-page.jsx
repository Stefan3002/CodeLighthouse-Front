import './contest-page.css'
import LighthouseNavigation from "../Lighthouse/LighthouseNavigation/lighthouse-navigation";
import TopSection from "../TopSection/top-section";
import AuthorName from "../AuthorName/author-name";
import {Link, Outlet, useParams} from "react-router-dom";
import Transition from "../../utils/js/transitions";
import {useEffect, useState} from "react";
import useFetchHook from "../../utils/hooks/fetchHook";
import ContestNavigation from "../ContestNavigation/contest-navigation";
import DateTime from "../DateTime/date-time";
import CalendarSVG from "../../utils/imgs/SVGs/CalendarSVG.svg";
import ClockSVG from "../../utils/imgs/SVGs/ClockSVG.svg";
import LiveSVG from "../../utils/imgs/SVGs/LiveSVG.svg";
import Button from "../Button/button";
const ContestPage = () => {
    const id = useParams().id
    const [data, setData] = useState(undefined)
    const sendRequest = useFetchHook()

    useEffect(() => {
        (async () => {
            const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/contests/${id}`, undefined, 'GET', false)
            setData(res)
        })()
    }, []);

    if(data) {
        const timeRemaining = Date.parse(`${data.start_date} : ${data.start_time}`) - Date.now()
        const timeRemainingReadable = Math.floor(timeRemaining / 60000)
        return (
            <Transition mode='fullscreen'>
                <ContestNavigation/>
                <TopSection nameOfPage='Contest' children={<>
                    <div className="contest-card-content">
                        {/*<AuthorName color='dark' author={data.author} />*/}
                        <DateTime data={data.start_date} color='light' icon={CalendarSVG}/>
                        <DateTime data={data.start_time} color='light' icon={ClockSVG}/>
                        <div>
                            <img className='icon-svg' src={LiveSVG} alt=""/>
                            {timeRemainingReadable >= 0 ?
                                <p>{timeRemainingReadable} minutes to go!</p>
                                :
                                <>
                                    <p>Contest started!</p>
                                    <Link to='solve'><Button marginated={true} color='light' text='Start'/></Link>
                                </>
                            }
                        </div>
                    </div>
                </>}
                            title={data.archived ? `${data.name} (archived)` : data.public ? `${data.name} {community}` : data.name}/>
                <div className='wrapper lighthouse-page'>
                    {/*<AssignmentsList limit={1} filters={false} user={user} data={user} filter='All' />*/}
                </div>
                <Outlet/>
            </Transition>
        )
    }
}
export default ContestPage