import './landing-page-home.css'
import LandingPageHeader from "../LandingPageHeader/landing-page-header";
import {motion, AnimatePresence} from "framer-motion"
// import transition from "../../utils/js/transitions";
const LandingPageHome = () => {
    return (
        <div className='landing-page-home'>
            <LandingPageHeader />
        </div>
    )
}
export default LandingPageHome