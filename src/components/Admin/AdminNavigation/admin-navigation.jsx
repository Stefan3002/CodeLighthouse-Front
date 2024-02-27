import './admin-navigation.css'
import {Link, Outlet} from "react-router-dom";
import Transition from "../../../utils/js/transitions";
const AdminNavigation = () => {
    return (
        <Transition mode='fullscreen'>
            <nav className='app-navigation-wrapper'>
                {/*<img className='logo-header-app-nav' src={LogoImgNoBg} alt=""/>*/}
                <ul className='app-navigation'>
                    <Link to='pending'><li>Pending</li></Link>
                    <Link to='denied'><li>Denied</li></Link>
                    <Link to='reports'><li>Reports</li></Link>
                    <Link to='contests'><li>Contests</li></Link>
                </ul>
            </nav>
            <Outlet />
        </Transition>
    )
}
export default AdminNavigation