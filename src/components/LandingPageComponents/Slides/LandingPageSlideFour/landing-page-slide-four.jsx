import './landing-page-slide-four.css'
import {motion} from "framer-motion"

import image3 from '../../../../utils/imgs/landing-page/CLCard3.png'
import image2 from '../../../../utils/imgs/landing-page/CLCard2.png'
import LandingPageBulletList from "../../LandingPageBulletList/landing-page-bullet-list";
import LogoImgNoBg from "../../../../utils/imgs/logo/LogoSVG.svg";
import Button from "../../../Button/button";
import {animate, exit, initial, transition} from "../../../../utils/js/landingPageSlideAnimate";
const LandingPageSlideFour = () => {

    return (
        <motion.div key='landing-page-slide-two' transition={{...transition}} initial={{...initial}} animate={{...animate}} exit={{...exit}} className="slide-hero slide-hero-home">
            <img className='logo-header' src={LogoImgNoBg} alt=""/>
            <h2 className='landing-subtitle'>Coding is about <span className='highlight-subtitle'>taking initiative</span>!</h2>
            <p className='subtitle'>Let's go and <b>register</b>!</p>
            <Button type='anchor' href='/auth' ariaLabel='Go to the next slide' text='Register'/>

        </motion.div>
    )
}
export default LandingPageSlideFour