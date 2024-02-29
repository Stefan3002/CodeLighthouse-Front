import './contest-card.css'
import {Link} from "react-router-dom";
import {exponentialDelay} from "../../utils/js/exponentialDelay";
import AuthorName from "../AuthorName/author-name";
import DateTime from "../DateTime/date-time";
import CalendarSVG from "../../utils/imgs/SVGs/CalendarSVG.svg";
import ClockSVG from "../../utils/imgs/SVGs/ClockSVG.svg";
import LiveSVG from '../../utils/imgs/SVGs/LiveSVG.svg'
const ContestCard = ({data, animationDelay}) => {
    return (
        <Link to={`/app/contests/${data.id}`}>
            <div style={{animationDelay: `${exponentialDelay(animationDelay)}ms`}} className='lighthouse-card'>
                <div className="lighthouse-card-header">
                    <h2>{data.archived ? `${data.name} (archived)` : data.public ? `${data.name} {community}` : data.name}</h2>
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
}
export default ContestCard