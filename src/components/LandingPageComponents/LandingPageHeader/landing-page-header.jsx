import './landing-page-header.css'
import LogoImgNoBg from '../../../utils/imgs/logo/LogoSVG.svg'
import LandingPageHome from "../LandingPageHome/landing-page-home";
import Button from "../../Button/button";
import {Link} from "react-router-dom";
import transition from "../../../utils/js/transitions";
import Transition from "../../../utils/js/transitions";
import LandingPageAsideMenu from "../LandingPageAsideMenu/landing-page-aside-menu";
import {useEffect, useState} from "react";
// import transition from "../../utils/js/transitions";
const LandingPageHeader = () => {
    const [windowSize, setWindowSize] = useState(window.innerWidth)

    useEffect(() => {
        const handleResize = () => {
            setWindowSize(window.innerWidth)
        }
        const resizeEvent = window.addEventListener('resize', () => handleResize)
        return () => window.removeEventListener('resize', resizeEvent)
    }, []);

    return (
        <Transition mode={windowSize <= 1100 ? 'fullscreen' : 'partial'}>
        <div className='landing-page-header slide'>
            <div className="slide-hero slide-hero-home">
                <img className='logo-header' src={LogoImgNoBg} alt=""/>
                {/*<h1 className='title'>CodeLighthouse</h1>*/}
                <p className='subtitle'>Enlighten your <b>coding</b> skills.</p>
                <Button ariaLabel='Go to the About page' type='anchor' href='/about' text='But how?' />
            </div>
            <LandingPageAsideMenu />
        </div>
        </Transition>
    )
}
export default LandingPageHeader
