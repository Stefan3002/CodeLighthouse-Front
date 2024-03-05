import './account-settings-modal.css'
import LighthouseSVG from "../../../utils/imgs/SVGs/LighthouseSVG.svg";
import Button from "../../Button/button";
import {useDispatch, useSelector} from "react-redux";
import {setModal, setModalContent} from "../../../utils/store/utils-store/utils-store-actions";
import {getModalContent} from "../../../utils/store/utils-store/utils-store-selectors";
import useFetchHook from "../../../utils/hooks/fetchHook";
const AccountSettingsModal = () => {
    const dispatch = useDispatch()
    const userID = useSelector(getModalContent).content
    const sendRequest = useFetchHook()
    const successCallback = (msg) => {
        dispatch(setModalContent({
            type: 'success',
            content: msg
        }))
    }

    const purgeAccount = async () => {
        const reqData = {
            userID
        }
        const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/purge-account`,JSON.stringify(reqData) , 'POST', false, successCallback, ['Sorry to see you go!', 'Goodbye!'])
    }
    const purgeAccountSecondConfirm = () => {
        dispatch(setModalContent({
            type: 'confirm',
            content: purgeAccount,
            extraData: '<p><strong>One more time! Are you sure?</strong> <br />This action is <strong> IRREVERSIBLE! </strong> Confirm purging?</p>'

        }))
    }
    const purgeAccountConfirm = () => {
        dispatch(setModalContent({
            type: 'confirm',
            content: purgeAccountSecondConfirm,
            extraData: '<p>This action is <strong> IRREVERSIBLE! </strong> Confirm purging?</p>'

        }))
    }

    return (
        <div className='error-wrapper create-challenge-wrapper'>
            <div className="error-header create-challenge-header">
                <img src={LighthouseSVG} alt=""/>
                <h2>Account settings</h2>
            </div>
            <div className="error-content">
                <p>Review <b>your</b> account. </p>
                {/*<p dangerouslySetInnerHTML={{__html: data.extraData}} />*/}
                <div className="confirm-buttons">
                    {/*<Button color='success' callback={purgeAccountConfirm}  buttonType='submit' text='Yes' type='normal' />*/}
                    <Button color='danger' callback={purgeAccountConfirm} buttonType='reset' text='Delete account' type='normal' />
                </div>
            </div>

            {/*</form>*/}
        </div>
    )
}
export default AccountSettingsModal