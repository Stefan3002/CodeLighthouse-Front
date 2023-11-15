import './landing-page-aside-menu.css'
import {Link} from "react-router-dom";
import LandingPageAsideFooter from "../LandingPageAsideFooter/landing-page-aside-footer";
const LandingPageAsideMenu = () => {
    return (
        <div className="slide-aside">
            <div className='landing-page-navigation'>
                <ul className='navigation-wrapper'>
                    <Link to='/' ><li>Home</li></Link>
                    <Link to='/about' ><li>About</li></Link>
                    <Link to='/features'><li>Features</li></Link>
                    <Link to='/auth'><li>Log in</li></Link>
                </ul>
                <LandingPageAsideFooter />
            </div>
        </div>
    )
}
export default LandingPageAsideMenu