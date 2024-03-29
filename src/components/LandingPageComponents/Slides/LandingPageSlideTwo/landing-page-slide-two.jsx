import './landing-page-slide-two.css'
import {motion} from "framer-motion"

import image1 from '../../../../utils/imgs/landing-page/CLCard1.png'
import image2 from '../../../../utils/imgs/landing-page/CLCard2.png'
import LandingPageBulletList from "../../LandingPageBulletList/landing-page-bullet-list";
import LogoImgNoBg from "../../../../utils/imgs/logo/LogoSVG.svg";
import Button from "../../../Button/button";
import {animate, exit, initial, transition} from "../../../../utils/js/landingPageSlideAnimate";
const LandingPageSlideTwo = ({setCurrentSlide}) => {

    const cards = [
        {
            title: 'Public communities',
            description: 'Companies, universities, teachers, everyone can create communities with open access. Just join and start coding!',
            image: image1
        },
        // {
        //     title: 'Private lighthouses',
        //     description: 'Maybe you have a private group of friends or a university class that wants to code together. Create a private lighthouse and start coding!',
        //     image: image2
        // }
    ]

    const changeSlide = () => {
        setCurrentSlide(3)
    }
    return (
        <motion.div key='landing-page-slide-two' transition={{...transition}} initial={{...initial}} animate={{...animate}} exit={{...exit}} className="slide-hero">
            <img className='logo-header' src={LogoImgNoBg} alt=""/>
            <h2 className='landing-subtitle'>Coding is about <span className='highlight-subtitle'>learning</span>!</h2>
            <p className='subtitle'>Enroll in public communities and <b>code</b>!</p>

            <div className="landing-page-slide-two-cards">
                {cards.map((card, index) => {
                    if(index % 2 === 0)
                        return <div className="landing-page-slide-two-card">
                            <div className="card-left-side">
                                <h3>{card.title}</h3>
                                <p>{card.description}</p>
                                <Button type='anchor' href='/features' color='light' text='More' />
                            </div>
                            <img className='card-right-img' src={card.image} alt=""/>
                        </div>
                    else
                        return <div className="landing-page-slide-two-card">
                            <img className='card-right-img' src={card.image} alt=""/>
                            <div className="card-left-side card-inversed-text">
                                <h3>{card.title}</h3>
                                <p>{card.description}</p>
                                <Button color='light' text='More'/>
                            </div>
                        </div>
                })}

            </div>
            <Button marginated={true} ariaLabel='Go to the next slide' callback={changeSlide} text='But how?'/>

        </motion.div>
    )
}
export default LandingPageSlideTwo