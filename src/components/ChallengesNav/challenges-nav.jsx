import './challenges-nav.css'
import {Link, Outlet} from "react-router-dom";
import Transition from "../../utils/js/transitions";
const ChallengesNav = () => {
    return (
        <div>
            <nav className='app-navigation-wrapper'>
                <div className="app-navigation-outer">
                    <ul className='app-navigation'>
                        <Link to=''>
                            <li>Challenge</li>
                        </Link>
                        <Link id='challenge-comments-anchor' to='comments'>
                            <li>Comments</li>
                        </Link>
                        <Link to='stats'>
                            <li>Stats</li>
                        </Link>
                        <Link to='submissions'>
                            <li>Submissions</li>
                        </Link>
                        <Link to='leaderboard'>
                            <li>Leaderboard</li>
                        </Link>
                    </ul>
                </div>
            </nav>
            <Outlet/>
        </div>
    )
}
export default ChallengesNav