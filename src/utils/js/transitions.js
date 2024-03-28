import {motion} from "framer-motion"
import './transitions.css'
import LogoImgBG from "../imgs/logo/Logo_White_BG.png";
const Transition = ({modalContent, children, mode = 'partial', delay = .2, scaleY = 1}) => {
    const animationParametersOne = {
        initial: {
            scaleY: 0
        },
        animate: {
            scaleY: 0
        },
        exit: {
            scaleY
        },
        transition: {
            ease: 'easeInOut',
            duration: .4
        }
    }
    const animationParametersTwo = {
        initial: {
            scaleY
        },
        animate: {
            scaleY: 0
        },
        exit: {
            scaleY: 0
        },
        transition: {
            delay,
            ease: 'easeInOut',
            duration: .4
        }
    }

    const animationParametersPopUp = {
        initial: {
            y: '-100%'
        },
        animate: {
            y: 0
        },
        exit: {
            y: '-100%'
        },
        transition: {
            ease: 'easeInOut',
            duration: .5
        }
    }

    const animationParametersModal = {
        initial: {
            x: '-50%',
            y: '-100%',
            opacity: 0
        },
        animate: {
            y: 0,
            opacity: 1
        },
        exit: {
            y: '100%',
            opacity: 0
        },
        transition: {
            ease: 'easeInOut',
            duration: .3
        }
    }

    const animationParametersModalSecondStep = {
        initial: {
            x: '50%',
            y: 0,
            opacity: 0
        },
        animate: {
            x: '-50%',
            opacity: 1
        },
        exit: {
            y: '100%',
            opacity: 0
        },
        transition: {
            ease: 'easeInOut',
            duration: .3
        }
    }

    const animationParametersCodeStep= {
        initial: {
            x: '100%',
            opacity: 0
        },
        animate: {
            x: 0,
            opacity: 1
        },
        exit: {
            x: '-100%',
            // opacity: 0
        },
        transition: {
            ease: 'easeInOut',
            duration: .5
        }

    }


    if(mode === 'partial' || mode === 'fullscreen')
    return (
        // <motion.div transition={animationParameters.transition} initial={animationParameters.initial} animate={animationParameters.animate} exit={animationParameters.exit}>
        //     {children}
        // </motion.div>
        <>
            {children}
            <motion.div key={`curtain-one`} style={{width: `${mode === 'partial' ? '83.5%' : '100%'}`}} className='animation-in' transition={animationParametersOne.transition} initial={animationParametersOne.initial} animate={animationParametersOne.animate} exit={animationParametersOne.exit} >
                {/*<img className='logo-header' src={LogoImgBG} alt=""/>*/}
            </motion.div>
            <motion.div key={`curtain-two`} style={{width: `${mode === 'partial' ? '83.5%' : '100%'}`}} className='animation-out' transition={animationParametersTwo.transition} initial={animationParametersTwo.initial} animate={animationParametersTwo.animate} exit={animationParametersTwo.exit} >
                {/*<img className='logo-header' src={LogoImgBG} alt=""/>*/}
            </motion.div>
        </>
    )
    else
        if(mode === 'pop-up')
            return (
                <motion.div className='pop-up-animation' transition={animationParametersPopUp.transition} initial={animationParametersPopUp.initial} animate={animationParametersPopUp.animate} exit={animationParametersPopUp.exit} >
                    {children}
                </motion.div>
            )
    else
        if(mode === 'modal')
            // This is to animate second steps from multi-step modals
            // that will enter from the right
            if(modalContent === 'joinLighthouse' || modalContent === 'createLighthouse' || modalContent === 'report-description' || modalContent === 'admin-confirm' || modalContent === 'lighthousePreview' || modalContent === 'difficulty-admin')
                return (
                    <motion.div key={`modal-${modalContent}`} className='modal-animation' {...animationParametersModalSecondStep} >
                        {children}
                    </motion.div>
                )
            else
                return (
                    <motion.div key={`modal-${modalContent}`} className='modal-animation' {...animationParametersModal} >
                        {children}
                    </motion.div>
                )
        else
        if(mode === 'codeStep')
            return (
                <motion.div key={`code-step-transition-${modalContent}`} className='code-step-animation' {...animationParametersCodeStep} >
                    {children}
                </motion.div>
            )

}
export default Transition