import './modal.css'
import Transition from "../../utils/js/transitions";
import ErrorSVG from '../../utils/imgs/ErrorSVG.svg'
import LighthouseSVG from '../../utils/imgs/SVGs/LighthouseSVG.svg'
import {useSelector} from "react-redux";
import {getModalContent} from "../../utils/store/utils-store/utils-store-selectors";
import Input from "../Input/input";
import Button from "../Button/button";
import useFetchHook from "../../utils/hooks/fetchHook";
import {getUser} from "../../utils/store/user-store/user-store-selectors";
const Modal = ({error, type='error'}) => {
    const modalContent = useSelector(getModalContent)
    const sendRequest = useFetchHook()
    const user = useSelector(getUser)

    const enrollLighthouse = async (event) => {
        console.log('user', user)
        event.preventDefault()
        const code = event.target[0].value
        const lighthouseId = event.target[1].value

        const data = {
            user_id: user.user_id,
            enrollment_code: code
        }

        const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/lighthouses/${lighthouseId}`,JSON.stringify(data) , 'POST', false)
        // setData(res)

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
                            <form className='enroll-inputs' onSubmit={enrollLighthouse}>
                                <Input type='text' placeholder='Enrollment code' />
                                <Input type='text' placeholder='Id of the Lighthouse.' />
                                <Button buttonType='submit' text='Join' type='normal' />
                            </form>

                        </div>
                    </div>
                </Transition>
            )
        }
}
export default Modal