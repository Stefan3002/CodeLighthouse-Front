import './admin-navigation.css'
import {Link, Outlet} from "react-router-dom";
import Transition from "../../../utils/js/transitions";
const AdminNavigation = () => {
    return (
        <Transition mode='fullscreen'>
            <nav className='app-navigation-wrapper'>
                {/*<img className='logo-header-app-nav' src={LogoImgNoBg} alt=""/>*/}
                <ul className='app-navigation'>
                    <li><Link to='pending'>Challenges</Link></li>
                    {/*<Link to='denied'><li>Denied</li></Link>*/}
                    <li><Link to='reports'>Reports</Link></li>
                    {/*<Link to='contests'><li>Contests</li></Link>*/}
                </ul>
            </nav>
            <Outlet />
        </Transition>
    )
}
export default AdminNavigation