import {motion} from "framer-motion"
import './transitions.css'
import LogoImgBG from "../imgs/logo/Logo_White_BG.png";
const Transition = ({children, mode = 'partial'}) => {
    const animationParametersOne = {
        initial: {
            scaleY: 0
        },
        animate: {
            scaleY: 0
        },
        exit: {
            scaleY: 1
        },
        transition: {
            ease: 'easeInOut',
            duration: .4
        }
    }
    const animationParametersTwo = {
        initial: {
            scaleY: 1
        },
        animate: {
            scaleY: 0
        },
        exit: {
            scaleY: 0
        },
        transition: {
            delay: .2,
            ease: 'easeInOut',
            duration: .4
        }
    }
    return (
        // <motion.div transition={animationParameters.transition} initial={animationParameters.initial} animate={animationParameters.animate} exit={animationParameters.exit}>
        //     {children}
        // </motion.div>
        <>
            {children}
            <motion.div style={{width: `${mode === 'partial' ? '80%' : '100%'}`}} className='animation-in' transition={animationParametersOne.transition} initial={animationParametersOne.initial} animate={animationParametersOne.animate} exit={animationParametersOne.exit} >
                <img className='logo-header' src={LogoImgBG} alt=""/>
            </motion.div>
            <motion.div style={{width: `${mode === 'partial' ? '80%' : '100%'}`}} className='animation-out' transition={animationParametersTwo.transition} initial={animationParametersTwo.initial} animate={animationParametersTwo.animate} exit={animationParametersTwo.exit} >
                <img className='logo-header' src={LogoImgBG} alt=""/>
            </motion.div>
        </>
    )
}
export default Transition