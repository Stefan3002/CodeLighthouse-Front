import './app-navigation.css'
import {Outlet} from "react-router-dom";
import LogoImgNoBg from "../../utils/imgs/logo/LogoSVG.svg";
const AppNavigation = () => {
    return (
        <>
            <nav className='app-navigation-wrapper'>
                <img className='logo-header-app-nav' src={LogoImgNoBg} alt=""/>
                <ul className='app-navigation'>
                    <li>Home</li>
                    <li>Lighthouses</li>
                    <li>Solve</li>
                    <li>Profile</li>
                </ul>
            </nav>
            <Outlet />
        </>

    )
}
export default AppNavigation