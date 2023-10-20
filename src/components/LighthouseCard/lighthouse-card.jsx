import './lighthouse-card.css'
import {Link} from "react-router-dom";
const LighthouseCard = ({data}) => {
    return (
        <Link to={`/app/lighthouses/${data.id}`}>
        <div className='lighthouse-card'>
            <div className="lighthouse-card-header">
                <h2>{data.name}</h2>
                <p>{data.author.username}</p>
            </div>
            <div className="lighthouse-card-content">

            </div>
        </div>
        </Link>
    )
}
export default LighthouseCard