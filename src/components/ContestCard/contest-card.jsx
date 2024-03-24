import './contest-card.css'
import {Link} from "react-router-dom";
import {exponentialDelay} from "../../utils/js/exponentialDelay";
import AuthorName from "../AuthorName/author-name";
import DateTime from "../DateTime/date-time";
import CalendarSVG from "../../utils/imgs/SVGs/CalendarSVG.svg";
import ClockSVG from "../../utils/imgs/SVGs/ClockSVG.svg";
import CopySVG from "../../utils/imgs/SVGs/CopySVG.svg";
import LiveSVG from '../../utils/imgs/SVGs/LiveSVG.svg'
import {setModal, setModalContent} from "../../utils/store/utils-store/utils-store-actions";
import {useDispatch} from "react-redux";
const ContestCard = ({type = 'regular', data, animationDelay}) => {
    const dispatch = useDispatch()
    const copyCodeToClipboard = () => {
        navigator.clipboard.writeText(data.enrollment_code)
        dispatch(setModal(true))
        dispatch(setModalContent({
            type: 'pop-up',
            data: 'Copied to clipboard!'
        }))
    }

    if(type === 'regular')
        return (
            <Link to={`/app/contests/${data.id}`}>
                <div style={{animationDelay: `${exponentialDelay(animationDelay)}ms`}} className='lighthouse-card'>
                    <div className="lighthouse-card-header">
                        <h2>{data.archived ? `${data.name} (archived)` : data.public ? `${data.name} {open}` : data.name}</h2>
                    </div>
                    <div className="contest-card-content">
                        {/*<AuthorName color='dark' author={data.author} />*/}
                        <DateTime data={data.start_date} icon={CalendarSVG}/>
                        <DateTime data={data.start_time} icon={ClockSVG}/>
                    </div>

                    {/*<div>*/}
                    {/*    <img className='icon-svg' src={LiveSVG} alt=""/>*/}
                    {/*    <p>Contest Started!</p>*/}
                    {/*</div>*/}
                </div>
            </Link>
        )
    else
        if(type === 'open')
            return (

                    <div style={{animationDelay: `${exponentialDelay(animationDelay)}ms`}} className='lighthouse-card'>
                        <img onClick={copyCodeToClipboard} src={CopySVG} className='icon-svg copy-to-clipboard' alt="Copy code"/>
                        <Link to={`/app/contests/${data.id}`}>
                        <div className="lighthouse-card-header">
                            <h2>{data.name}</h2>
                        </div>
                        <div className="contest-card-content">
                            {/*<AuthorName color='dark' author={data.author} />*/}
                            <DateTime data={data.start_date} icon={CalendarSVG}/>
                            <DateTime data={data.start_time} icon={ClockSVG}/>
                        </div>
                        <p className='community-enrollment_code'>{data.enrollment_code}</p>

                        {/*<div>*/}
                        {/*    <img className='icon-svg' src={LiveSVG} alt=""/>*/}
                        {/*    <p>Contest Started!</p>*/}
                        {/*</div>*/}
                        </Link>
                    </div>

            )
}
export default ContestCard