import './landing-page-features.css'
import LogoImgNoBg from "../../../utils/imgs/logo/LogoSVG.svg";
import Button from "../../Button/button";
import {Link} from "react-router-dom";
import TeacherSVG from '../../../utils/imgs/features/TeacherSVG.svg'
import StudentSVG from '../../../utils/imgs/features/StudentSVG.svg'
import CompanySVG from '../../../utils/imgs/features/CompanySVG.svg'
import FeaturesText from '../../../utils/text/features.json'
import Transition from "../../../utils/js/transitions";
import LandingPageAsideMenu from "../LandingPageAsideMenu/landing-page-aside-menu";
import {useEffect, useState} from "react";
import appFeatures from '../../../utils/text/app-features.json'
import TickSVG from "../../../utils/imgs/features/TickSVG.svg";
import SpeedSVG from "../../../utils/imgs/features/SpeedSVG.svg";
import PowerfulSVG from "../../../utils/imgs/features/PowerfulSVG.svg";
import {exponentialDelay} from "../../../utils/js/exponentialDelay";
const LandingPageFeatures = () => {

    const [windowSize, setWindowSize] = useState(window.innerWidth)

    useEffect(() => {
        const handleResize = () => {
            setWindowSize(window.innerWidth)
        }
        window.addEventListener('resize', () => handleResize)
        return () => window.removeEventListener('resize', () => handleResize)
    }, []);

    const getFeatureIcon = (icon) => {
        switch (icon){
            case 'For Teachers':
                return TeacherSVG
            case 'For Individuals':
                return StudentSVG
            case 'For Companies':
                return CompanySVG
        }
    }


    return (
        <Transition mode={windowSize <= 1100 ? 'fullscreen' : 'partial'}>
        <div className='slide'>
            <div className="slide-hero features-hero slide-hero-features">
                <img className='logo-header' src={LogoImgNoBg} alt=""/>
                <div className="features">
                    {appFeatures.features.map((feature, idx) => {
                        return <div key={`Feature-${feature.title}`} style={{animationDelay: `${exponentialDelay(idx)}ms`}} className="feature">
                            <img src={getFeatureIcon(feature.title)} alt='Picture of a teacher.' className="feature-icon"/>
                            <h2 className='feature-name'>{feature.title}</h2>
                            <p className='feature-description' dangerouslySetInnerHTML={{__html: feature.description}}></p>
                        </div>
                    })}
                </div>
                {/*Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda fuga quos reiciendis? Accusantium cupiditate, dolorum ducimus est eum eveniet exercitationem illo minus odio possimus, quaerat quasi reiciendis unde, vitae voluptatibus.*/}
            </div>
            <LandingPageAsideMenu />
        </div>
        </Transition>
    )
}
export default LandingPageFeatures