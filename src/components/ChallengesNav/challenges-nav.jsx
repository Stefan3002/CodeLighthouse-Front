import './challenges-nav.css'
import {Link, Outlet} from "react-router-dom";
import Transition from "../../utils/js/transitions";
const ChallengesNav = () => {
    return (
        <div>
            <nav className='app-navigation-wrapper'>
                <ul className='app-navigation'>
                    <Link to=''><li>Challenge</li></Link>
                    <Link to='comments'><li>Comments</li></Link>
                    <Link to='stats'><li>Stats</li></Link>
                    <Link to='submissions'><li>Submissions</li></Link>
                </ul>
            </nav>
            <Outlet />
        </div>
    )
}
export default ChallengesNav