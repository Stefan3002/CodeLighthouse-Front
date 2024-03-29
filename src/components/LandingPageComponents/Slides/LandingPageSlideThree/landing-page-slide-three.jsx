import './landing-page-slide-three.css'
import {motion} from "framer-motion"

import image3 from '../../../../utils/imgs/landing-page/CLCard3.png'
import image2 from '../../../../utils/imgs/landing-page/CLCard2.png'
import LandingPageBulletList from "../../LandingPageBulletList/landing-page-bullet-list";
import LogoImgNoBg from "../../../../utils/imgs/logo/LogoSVG.svg";
import Button from "../../../Button/button";
import {animate, exit, initial, transition} from "../../../../utils/js/landingPageSlideAnimate";
const LandingPageSlideThree = ({setCurrentSlide}) => {

    const cards = [
        {
            title: 'Choose your challenge',
            description: 'Challenges are community driven. You can choose from a wide range of challenges and start coding!',
            image: image3
        },
        {
            title: 'Write your own tests',
            description: 'Whenever you want to test a limit test case, you can write your own tests and run them against the challenge!',
            image: image2
        }
    ]
    const changeSlide = () => {
        setCurrentSlide(4)
    }

    return (
        <motion.div key='landing-page-slide-three' transition={{...transition}} initial={{...initial}} animate={{...animate}} exit={{...exit}} className="slide-hero slide-hero-home">
            <img className='logo-header' src={LogoImgNoBg} alt=""/>
            <h2 className='landing-subtitle'>Coding is about <span className='highlight-subtitle'>coding</span>!</h2>
            <p className='subtitle'>Yeah, really! It is about <b>practicing</b>!</p>

            <div className="landing-page-slide-three-cards">
                {cards.map((card, index) => {
                    return <div className={`landing-page-slide-three-card ${index === 1 && 'landing-page-slide-three-card-high'}`}>
                        <div className="card-left-side">
                            <h3>{card.title}</h3>
                            <p>{card.description}</p>
                            <Button type='anchor' href='/features' color={index % 2 === 1 ? `light` : 'dark'} text='More' />
                        </div>
                        {/*<img className='slide-three-card-right-img' src={card.image} alt=""/>*/}
                    </div>
                })}
            </div>
            <Button marginated={true} ariaLabel='Go to the next slide' callback={changeSlide} text='But how?'/>

        </motion.div>
    )
}
export default LandingPageSlideThree