import './error-modal.css'
import ErrorSVG from "../../../utils/imgs/ErrorSVG.svg";
import {useDispatch, useSelector} from "react-redux";
import {getModalContent} from "../../../utils/store/utils-store/utils-store-selectors";
import {useState} from "react";
const ErrorModal = ({error}) => {
    
    return (
        // <Transition mode='fullscreen'>
        <div className='error-wrapper super-error'>
            <div className="error-header">
                <img src={ErrorSVG} alt=""/>
                <h2>Error!</h2>
            </div>
            <div className="error-content">
                <p>We <b>apologize</b>. We got something <b>wrong.</b></p>
                <p className='error-message' dangerouslySetInnerHTML={{__html: error}}></p>
            </div>
        </div>
        // </Transition>
    )
}
export default ErrorModal