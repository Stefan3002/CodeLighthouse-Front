import './success-modal.css'
import LighthouseSVG from "../../../utils/imgs/SVGs/LighthouseSVG.svg";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getModalContent} from "../../../utils/store/utils-store/utils-store-selectors";
import useFetchHook from "../../../utils/hooks/fetchHook";
import {getUser} from "../../../utils/store/user-store/user-store-selectors";
const SuccessModal = () => {
    const modalContent = useSelector(getModalContent)

    if(!modalContent.code)
        return (
            // <Transition mode='fullscreen'>
            <div className='error-wrapper success-wrapper super-success'>
                <div className="error-header">
                    <img src={LighthouseSVG} alt=""/>
                    <h2>Success!</h2>
                </div>
                <div className="error-content">
                    <h3>The request was <strong>successful</strong>!</h3>
                    <p dangerouslySetInnerHTML={{__html: modalContent.content ? modalContent.content : modalContent.data ? modalContent.data : null}}></p>
                    {/*<form className='enroll-inputs' onSubmit={enrollLighthouse}>*/}
                    {/*    <Input type='text' placeholder='Enrollment code' />*/}
                    {/*    <Input type='text' placeholder='Id of the Lighthouse.' />*/}
                    {/*    <Button buttonType='submit' text='Join' type='normal' />*/}
                    {/*</form>*/}

                </div>
            </div>
            // </Transition>
        )
    else
        return (
            // <Transition mode='fullscreen'>
            <div className='error-wrapper success-wrapper super-success'>
                <div className="error-header code-success-header">
                    <div>
                        <img src={LighthouseSVG} alt=""/>
                        <h2>Success!</h2>
                    </div>
                    <p>Execution Time: {(modalContent.data.time * 1000).toString().slice(0, 6)} ms</p>
                </div>
                <div className="error-content">
                    <h3>The request was <strong>successful</strong>!</h3>
                    <p dangerouslySetInnerHTML={{__html: modalContent.data ? modalContent.data.logs : null}}></p>
                    {/*<form className='enroll-inputs' onSubmit={enrollLighthouse}>*/}
                    {/*    <Input type='text' placeholder='Enrollment code' />*/}
                    {/*    <Input type='text' placeholder='Id of the Lighthouse.' />*/}
                    {/*    <Button buttonType='submit' text='Join' type='normal' />*/}
                    {/*</form>*/}

                </div>
            </div>
            // </Transition>
        )
}
export default SuccessModal