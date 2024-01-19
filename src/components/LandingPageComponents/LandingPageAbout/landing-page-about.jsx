import './landing-page-about.css'
import LogoImgNoBg from "../../../utils/imgs/logo/LogoSVG.svg";
import Button from "../../Button/button";
import {Link} from "react-router-dom";
import CodeIMG from '../../../utils/imgs/about/CodeIMG.jpg'
import Transition from "../../../utils/js/transitions";
import aboutText from '../../../utils/text/about.json'
import AboutHighIMG1 from '../../../utils/imgs/about/AboutHighIMG1.jpg'
import AboutHighIMG2 from '../../../utils/imgs/about/AboutHighIMG2.jpg'
import LandingPageAsideMenu from "../LandingPageAsideMenu/landing-page-aside-menu";
import Typewriter from "../../Typewriter/typewriter";
import Heading from "../../Heading/heading";
import {useEffect, useState} from "react";
const LandingPageAbout = () => {

    const [windowSize, setWindowSize] = useState(window.innerWidth)

    useEffect(() => {
        const handleResize = () => {
            setWindowSize(window.innerWidth)
        }
        window.addEventListener('resize', () => handleResize)
        return () => window.removeEventListener('resize', () => handleResize)
    }, []);

    return (
        <Transition mode={windowSize <= 1100 ? 'fullscreen' : 'partial'}>
        <div className='slide'>
            <div className="slide-hero about-inner">
                <img className='logo-header' src={LogoImgNoBg} alt=""/>
                <div className="about">
                    <div className="about-left">
                        <div className="about-typewriter">
                            <p><b>CodeLighthouse</b> is for:</p>
                            <Typewriter />
                            <Heading />
                        </div>
                        <p dangerouslySetInnerHTML={{__html: aboutText.description[0].text}}></p>
                    </div>
                    <img src={CodeIMG} alt="" className="about-img"/>
                </div>
            </div>
            <LandingPageAsideMenu />
        </div>
        </Transition>
    )
}
export default LandingPageAbout