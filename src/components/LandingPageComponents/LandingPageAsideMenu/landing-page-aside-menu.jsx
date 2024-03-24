import './landing-page-aside-menu.css'
import {Link, useNavigate} from "react-router-dom";
import LandingPageAsideFooter from "../LandingPageAsideFooter/landing-page-aside-footer";
import {useSelector} from "react-redux";
import {getUser} from "../../../utils/store/user-store/user-store-selectors";
import {getIsLoggedIn} from "../../../utils/store/auth-store/auth-store-selectors";
const LandingPageAsideMenu = () => {
    // const loggedIn = useSelector(getUser)
    // if(loggedIn)
    //     window.location.href = 'app'


    return (
        <div className="slide-aside">
            <div className='landing-page-navigation'>
                <ul className='navigation-wrapper'>
                    <li className='landing-page-menu-item'><Link to='/' >Home</Link></li>
                    <li className='landing-page-menu-item'><Link to='/about' >About</Link></li>
                    <li className='landing-page-menu-item'><Link to='/features'>Features</Link></li>
                    <li className='landing-page-menu-item'><Link id='log-in-anchor' to='/auth'>Log in</Link></li>
                </ul>
                <LandingPageAsideFooter />
            </div>
        </div>
    )
}
export default LandingPageAsideMenu