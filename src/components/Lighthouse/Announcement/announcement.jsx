import './announcement.css'
import AuthorName from "../../AuthorName/author-name";
import DateTime from "../../DateTime/date-time";
import DateSVG from '../../../utils/imgs/SVGs/CalendarSVG.svg'
const Announcement = ({data}) => {
    console.log(data)
    return (
        <div className='announcement'>
            <div className="announcement-content">
                <p dangerouslySetInnerHTML={{__html: data.content}}></p>
            </div>
            <div className="announcement-meta">
                <AuthorName color='dark' author={data.author} />
                <DateTime icon={DateSVG} data={data.date} />
            </div>
        </div>
    )
}
export default Announcement