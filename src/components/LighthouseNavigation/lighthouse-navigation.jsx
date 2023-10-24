import './lighthouse-navigation.css'
import Transition from "../../utils/js/transitions";
import LogoImgNoBg from "../../utils/imgs/logo/LogoSVG.svg";
import {Link} from "react-router-dom";
const LighthouseNavigation = () => {
    return (
        <Transition mode='fullscreen'>
            <nav className='app-navigation-wrapper'>
                {/*<img className='logo-header-app-nav' src={LogoImgNoBg} alt=""/>*/}
                <ul className='app-navigation'>
                    <Link to=''><li>Lighthouse</li></Link>
                    <Link to='assignments'><li>Assignments</li></Link>
                    <Link to='people'><li>People</li></Link>
                </ul>
            </nav>
        </Transition>
    )
}
export default LighthouseNavigation