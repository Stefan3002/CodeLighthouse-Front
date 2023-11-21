import './app-navigation.css'
import {Link, Outlet} from "react-router-dom";
import LogoImgNoBg from "../../utils/imgs/logo/LogoSVG.svg";
import {useSelector} from "react-redux";
import {getUser} from "../../utils/store/user-store/user-store-selectors";
import UserSVG from '../../utils/imgs/SVGs/User SVG.svg'
import AttachmentSVG from '../../utils/imgs/SVGs/AttachmentSVG.svg'
import HomeSVG from '../../utils/imgs/SVGs/HomeSVG.svg'
import CodeSVG from '../../utils/imgs/SVGs/CodeSVG.svg'
import LighthouseSVG from '../../utils/imgs/SVGs/LighthouseSVG.svg'
const AppNavigation = () => {

    const user = useSelector(getUser)

    return (
        <>
            <nav className='app-navigation-wrapper'>
                <img className='logo-header-app-nav' src={LogoImgNoBg} alt=""/>
                <ul className='app-navigation'>
                    <Link to='/app'><li className='menu-item'><img className='icon-svg' src={HomeSVG} alt=""/>Home</li></Link>
                    <Link to='/app/lighthouses'><li className='menu-item'><img className='icon-svg' src={LighthouseSVG} alt=""/>Lighthouses</li></Link>
                    <Link to='/app/challenges'><li className='menu-item'><img className='icon-svg' src={CodeSVG} alt=""/>Solve</li></Link>
                    <Link to='https://stefan3002.github.io/CodeLighthouse-Docs/creating-challenges.html'><li className='menu-item'><img className='icon-svg' src={AttachmentSVG} alt=""/>Docs</li></Link>
                    <Link to={`/app/users/${user?.id}`}><li className='menu-item'><img className='icon-svg' src={UserSVG} alt=""/>{user ? user.username : 'Profile'}</li></Link>
                </ul>
            </nav>
            <Outlet />
        </>

    )
}
export default AppNavigation