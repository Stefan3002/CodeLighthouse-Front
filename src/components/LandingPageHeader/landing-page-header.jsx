import './landing-page-header.css'
import LogoImgNoBg from '../../utils/imgs/logo/LogoSVG.svg'
import LandingPageHome from "../LandingPageHome/landing-page-home";
import Button from "../Button/button";
import {Link} from "react-router-dom";
import transition from "../../utils/js/transitions";
import Transition from "../../utils/js/transitions";
import LandingPageAsideMenu from "../LandingPageAsideMenu/landing-page-aside-menu";
// import transition from "../../utils/js/transitions";
const LandingPageHeader = () => {
    return (
        <Transition>
        <div className='landing-page-header slide'>
            <div className="slide-hero slide-hero-home">
                <img className='logo-header' src={LogoImgNoBg} alt=""/>
                {/*<h1 className='title'>CodeLighthouse</h1>*/}
                <p className='subtitle'>Enlighten your coding skills</p>
                <Button text='But how?' />
            </div>
            <LandingPageAsideMenu />
        </div>
        </Transition>
    )
}
export default LandingPageHeader
