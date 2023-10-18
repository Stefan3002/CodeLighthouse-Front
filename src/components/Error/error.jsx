import './error.css'
import Transition from "../../utils/js/transitions";
import ErrorSVG from '../../utils/imgs/ErrorSVG.svg'
const ErrorModal = ({error}) => {
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
}
export default ErrorModal