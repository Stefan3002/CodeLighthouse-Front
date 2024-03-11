import './assignment.css'
import {Link, useParams} from "react-router-dom";
import ChallengeCard from "../ChallengeCard/challenge-card";
import {useSelector} from "react-redux";
import {getUser} from "../../utils/store/user-store/user-store-selectors";
const Assignment = ({lighthouse = undefined, assignment}) => {
    const lighthouseId = useParams().id
    const user = useSelector(getUser)
    return (
        <div className='assignment'>
                <div className='expanded-challenge-card-header'>
                    {!lighthouse &&
                    <Link to={`/app/lighthouses/${lighthouseId}/submissions/${assignment.id}`}>
                        <p>See submissions</p>
                    </Link>
                    }
                    {lighthouse &&
                        <Link to={`/app/lighthouses/${lighthouse.id}/assignments`}>
                            <p>{lighthouse.name}</p>
                        </Link>
                    }
                </div>
                <ChallengeCard assignment={assignment} authoColor='dark' completed={user.solved_challenges.includes(assignment.challenge.id)}
                               challenge={assignment} type='assignment'/>
        </div>
    )
}
export default Assignment