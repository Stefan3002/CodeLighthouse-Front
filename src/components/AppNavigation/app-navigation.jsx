import './app-navigation.css'
import {Link, Outlet} from "react-router-dom";
import LogoImgNoBg from "../../utils/imgs/logo/LogoSVG.svg";
import {useSelector} from "react-redux";
import {getUser} from "../../utils/store/user-store/user-store-selectors";
const AppNavigation = () => {

    const user = useSelector(getUser)

    return (
        <>
            <nav className='app-navigation-wrapper'>
                <img className='logo-header-app-nav' src={LogoImgNoBg} alt=""/>
                <ul className='app-navigation'>
                    <Link to='/app'><li>Home</li></Link>
                    <Link to='/app/lighthouses'><li>Lighthouses</li></Link>
                    <Link to='/app/challenges'><li>Solve</li></Link>
                    <Link to='https://stefan3002.github.io/CodeLighthouse-Docs/creating-challenges.html'><li>Docs</li></Link>
                    <Link to={`/app/users/${user.id}`}><li>{user.username}</li></Link>
                </ul>
            </nav>
            <Outlet />
        </>

    )
}
export default AppNavigation