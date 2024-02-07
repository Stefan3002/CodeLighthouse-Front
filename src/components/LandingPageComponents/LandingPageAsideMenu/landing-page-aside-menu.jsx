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
                    <Link to='/' ><li className='landing-page-menu-item'>Home</li></Link>
                    <Link to='/about' ><li className='landing-page-menu-item'>About</li></Link>
                    <Link to='/features'><li className='landing-page-menu-item'>Features</li></Link>
                    <Link to='/auth'><li className='landing-page-menu-item'>Log in</li></Link>
                </ul>
                <LandingPageAsideFooter />
            </div>
        </div>
    )
}
export default LandingPageAsideMenu