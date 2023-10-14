import './landing-page-features.css'
import LogoImgNoBg from "../../utils/imgs/logo/LogoSVG.svg";
import Button from "../Button/button";
import {Link} from "react-router-dom";
import TeacherSVG from '../../utils/imgs/features/TeacherSVG.svg'
import StudentSVG from '../../utils/imgs/features/StudentSVG.svg'
import CompanySVG from '../../utils/imgs/features/CompanySVG.svg'
import FeaturesText from '../../utils/text/features.json'
import Transition from "../../utils/js/transitions";
const LandingPageFeatures = () => {
    return (
        <Transition>
        <div className='slide'>
            <div className="slide-hero features-hero">
                <img className='logo-header' src={LogoImgNoBg} alt=""/>
                <div className="features">
                    <div className="feature">
                        <img src={TeacherSVG} alt='Picture of a teacher.' className="feature-icon"/>
                        <h2 className='feature-name'>For Teachers</h2>
                        <p className='feature-description' dangerouslySetInnerHTML={{__html: FeaturesText.TeacherFeature}}></p>
                    </div>
                    <div className="feature">
                        <img src={StudentSVG} alt='Picture of a student.' className="feature-icon"/>
                        <h2 className='feature-name'>For Individuals</h2>
                        <p className='feature-description' dangerouslySetInnerHTML={{__html: FeaturesText.StudentFeature}}></p>
                    </div>
                    <div className="feature">
                        <img src={CompanySVG} alt='Picture of a company.' className="feature-icon"/>
                        <h2 className='feature-name'>For Companies</h2>
                        <p className='feature-description' dangerouslySetInnerHTML={{__html: FeaturesText.CompanyFeature}}></p>
                    </div>
                </div>
                {/*Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda fuga quos reiciendis? Accusantium cupiditate, dolorum ducimus est eum eveniet exercitationem illo minus odio possimus, quaerat quasi reiciendis unde, vitae voluptatibus.*/}
            </div>
            <div className="slide-aside">
                <div className='landing-page-navigation'>
                    <ul className='navigation-wrapper'>
                        <Link to='/' ><li>Home</li></Link>
                        <Link to='/about' ><li>About</li></Link>
                        <Link to='/features'><li>Features</li></Link>
                        <Link to='/auth'><li>Log in</li></Link>
                    </ul>
                </div>
            </div>
        </div>
        </Transition>
    )
}
export default LandingPageFeatures