import './modal.css'
import Transition from "../../utils/js/transitions";
import ErrorSVG from '../../utils/imgs/ErrorSVG.svg'
import LighthouseSVG from '../../utils/imgs/SVGs/LighthouseSVG.svg'
import {useSelector} from "react-redux";
import {getModalContent} from "../../utils/store/utils-store/utils-store-selectors";
import Input from "../Input/input";
import Button from "../Button/button";
const Modal = ({error, type='error'}) => {
    const modalContent = useSelector(getModalContent)

    const enrollLighthouse = (event) => {
        event.preventDefault()
        const code = event.target[0].value
        console.log(code)
    }

    if(type === 'error')
        return (
            <Transition mode='fullscreen'>
            <div className='error-wrapper'>
                <div className="error-header">
                    <img src={ErrorSVG} alt=""/>
                    <h2>Error!</h2>
                </div>
                <div className="error-content">
                    <p>We <b>apologize</b>. We got something <b>wrong.</b></p>
                    <p className='error-message'>{error}</p>
                </div>
            </div>
            </Transition>
        )
    else
        if(type === 'joinLighthouse') {
            return (
                <Transition mode='fullscreen'>
                    <div className='error-wrapper'>
                        <div className="error-header">
                            <img src={LighthouseSVG} alt=""/>
                            <h2>Join Lighthouse!</h2>
                        </div>
                        <div className="error-content">
                            <p>Enter the <b>enrollment code</b> of the lighthouse:</p>
                            <form onSubmit={enrollLighthouse}>
                                <Input type='text' />
                                <Button buttonType='submit' text='Join' type='normal' />
                            </form>

                        </div>
                    </div>
                </Transition>
            )
        }
}
export default Modal