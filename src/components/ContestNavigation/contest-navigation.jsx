import './contest-navigation.css'
import {Link} from "react-router-dom";
import Transition from "../../utils/js/transitions";
const ContestNavigation = () => {
    return (
        <Transition mode='fullscreen'>
            <nav className='app-navigation-wrapper'>
                {/*<img className='logo-header-app-nav' src={LogoImgNoBg} alt=""/>*/}
                <ul className='app-navigation'>
                    <Link to=''><li>Contest</li></Link>
                    <Link to='assignments'><li>Solve</li></Link>
                    <Link to='results'><li>Results</li></Link>
                    <Link to='people'><li>People</li></Link>
                </ul>
            </nav>
        </Transition>
    )
}
export default ContestNavigation