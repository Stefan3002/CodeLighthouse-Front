import './change-email-modal.css'
import LighthouseSVG from "../../../utils/imgs/SVGs/LighthouseSVG.svg";
import Input from "../../Input/input";
import SelectedFiles from "../../SelectedFiles/selected-files";
import Button from "../../Button/button";
import {setModal, setModalContent} from "../../../utils/store/utils-store/utils-store-actions";
import {useDispatch, useSelector} from "react-redux";
import {getModalContent} from "../../../utils/store/utils-store/utils-store-selectors";
import changeUserEmailValidations from "../../../utils/validation/changeUserEmailValidations.json";
import useValidate from "../../../utils/hooks/validateHook";
import useFetchHook from "../../../utils/hooks/fetchHook";
import Form from "../../Form/form";
const ChangeEmailModal = () => {
    const data = useSelector(getModalContent)
    const dispatch = useDispatch()
    const validateInput = useValidate()
    const sendRequest = useFetchHook()

    const successCallback = (msg) => {
        dispatch(setModal(true))
        dispatch(setModalContent({
            'type': 'success',
            content: msg.data
        }))
    }
    const changeUserEmail = async (newEmail) => {
        const dataFetch = {
            userID: data.userID,
            newEmail
        }
        const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/contest-reset-email/${data.contestID}`, JSON.stringify(dataFetch), 'POST', false, successCallback)
    }

    const confirmAction = (event) => {
        event.preventDefault()
        let valid;
        const newEmail = event.target[0].value

        valid = validateInput('New e-mail', newEmail, {inputNull: changeUserEmailValidations.email.inputNull, inputMin: changeUserEmailValidations.email.inputMin})
        if(!valid)
            return


        dispatch(setModal(true))
        dispatch(setModalContent({
            'type': 'confirm',
            content: () => changeUserEmail(newEmail),
            extraData: `<p>User: <b>${data.content}</b></p><p>New e-mail: <strong>${newEmail}</strong></p>`
        }))
    }

    return (
        <div className='error-wrapper'>
            <div className="error-header">
                {/*<img onClick={backOneStep} className='icon-svg' src={BackSVG} alt="Back"/>*/}
                <img src={LighthouseSVG} alt=""/>
                <h2>Change data</h2>
            </div>
            <div className="error-content create-lighthouse-content">
                <p>Change e-mail of the user: <b>{data.content}</b></p>
                <Form className='enroll-inputs' onSubmit={confirmAction}>
                    <Input placeholder='New e-mail' />
                    <Button color='light' marginated={true} buttonType='submit' text='Change' type='normal'/>
                </Form>
            </div>
        </div>
    )
}
export default ChangeEmailModal