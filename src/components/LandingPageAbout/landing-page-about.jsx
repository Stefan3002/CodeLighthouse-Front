import './landing-page-about.css'
import LogoImgNoBg from "../../utils/imgs/logo/LogoSVG.svg";
import Button from "../Button/button";
import {Link} from "react-router-dom";
import CodeIMG from '../../utils/imgs/about/CodeIMG.jpg'
const LandingPageAbout = () => {
    return (
        <div className='slide'>
            <div className="slide-hero about-inner">
                <img className='logo-header' src={LogoImgNoBg} alt=""/>
                <div className="about">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore excepturi optio provident ut?
                        Consequuntur enim explicabo itaque quia sint? Cupiditate, exercitationem, veritatis. Ab eius in
                        laborum odio, similique ullam voluptate?</p>
                    <img src={CodeIMG} alt="" className="about-img"/>
                </div>
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
    )
}
export default LandingPageAbout