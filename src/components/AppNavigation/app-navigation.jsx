import './app-navigation.css'
import {Link, Outlet} from "react-router-dom";
import LogoImgNoBg from "../../utils/imgs/logo/LogoSVG.svg";
const AppNavigation = () => {
    return (
        <>
            <nav className='app-navigation-wrapper'>
                <img className='logo-header-app-nav' src={LogoImgNoBg} alt=""/>
                <ul className='app-navigation'>
                    <Link to='/app/home'><li>Home</li></Link>
                    <li>Lighthouses</li>
                    <Link to='/app/challenges'><li>Solve</li></Link>
                    <li>Profile</li>
                </ul>
            </nav>
            <Outlet />
        </>

    )
}
export default AppNavigation