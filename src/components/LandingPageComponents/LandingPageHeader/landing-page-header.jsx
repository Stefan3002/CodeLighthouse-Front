import './landing-page-header.css'
import LogoImgNoBg from '../../../utils/imgs/logo/LogoSVG.svg'
import LandingPageHome from "../LandingPageHome/landing-page-home";
import Button from "../../Button/button";
import {Link} from "react-router-dom";
import transition from "../../../utils/js/transitions";
import Transition from "../../../utils/js/transitions";
import LandingPageAsideMenu from "../LandingPageAsideMenu/landing-page-aside-menu";
import {useEffect, useState} from "react";
import LandingPageBulletList from "../LandingPageBulletList/landing-page-bullet-list";
import LandingPageSlides from "../LandingPageSlides/landing-page-slides";
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

            <LandingPageSlides />


            <LandingPageAsideMenu />
        </div>
        </Transition>
    )
}
export default LandingPageHeader
