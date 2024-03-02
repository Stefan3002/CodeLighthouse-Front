import './confirm-modal.css'
import LighthouseSVG from "../../../utils/imgs/SVGs/LighthouseSVG.svg";
import Input from "../../Input/input";
import Button from "../../Button/button";
import {useDispatch, useSelector} from "react-redux";
import {getModalContent} from "../../../utils/store/utils-store/utils-store-selectors";
import {setModal} from "../../../utils/store/utils-store/utils-store-actions";
const ConfirmModal = () => {
    const dispatch = useDispatch()
    const data = useSelector(getModalContent)
    const forwardCallback = data.content

    const cancelAction = () => {
        dispatch(setModal(false))
    }

    return (
        <div className='error-wrapper create-challenge-wrapper'>
            <div className="error-header create-challenge-header">
                <img src={LighthouseSVG} alt=""/>
                <h2>Are you sure?</h2>
            </div>
            <div className="error-content">
                    <p>Please <b>confirm</b> your action! </p>
                    <p dangerouslySetInnerHTML={{__html: data.extraData}} />
                <div className="confirm-buttons">
                    <Button color='success' callback={forwardCallback}  buttonType='submit' text='Yes' type='normal' />
                    <Button color='danger' callback={cancelAction} buttonType='reset' text='No' type='normal' />
                </div>
            </div>

            {/*</form>*/}
        </div>
    )
}
export default ConfirmModal