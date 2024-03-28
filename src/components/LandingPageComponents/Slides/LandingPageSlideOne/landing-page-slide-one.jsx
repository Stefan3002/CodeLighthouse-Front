import './landing-page-slide-one.css'
import {motion} from "framer-motion"

import LandingPageBulletList from "../../LandingPageBulletList/landing-page-bullet-list";
import LogoImgNoBg from "../../../../utils/imgs/logo/LogoSVG.svg";
import Button from "../../../Button/button";
import {animate, initial, exit, transition} from "../../../../utils/js/landingPageSlideAnimate";
const LandingPageSlideOne = ({setCurrentSlide}) => {

    const changeSlide = () => {
        setCurrentSlide(2)
    }


    return (
        <motion.div key='landing-page-slide-one' transition={{...transition}} initial={{...initial}} animate={{...animate}} exit={{...exit}}  className="slide-hero slide-hero-home">
            <img className='logo-header' src={LogoImgNoBg} alt=""/>
            <h2 className='landing-subtitle'>Coding is about <span className='highlight-subtitle'>shedding</span> light!</h2>
            <p className='subtitle'>Enlighten your <b>coding</b> skills.</p>
            <Button ariaLabel='Go to the next slide' callback={changeSlide} text='But how?'/>
        </motion.div>
    )
}
export default LandingPageSlideOne