import './admin-confirm-modal.css'
import LighthouseSVG from "../../../utils/imgs/SVGs/LighthouseSVG.svg";
import WithInfo from "../../WithInfo/with-info";
import Button from "../../Button/button";
import {setModal, setModalContent} from "../../../utils/store/utils-store/utils-store-actions";
import {useDispatch, useSelector} from "react-redux";
import useFetchHook from "../../../utils/hooks/fetchHook";
import {useParams} from "react-router-dom";
import Input from "../../Input/input";
import {getModalContent} from "../../../utils/store/utils-store/utils-store-selectors";
import createLighthouseValidations from "../../../utils/validation/createLighthouseValidations.json";
import useValidate from "../../../utils/hooks/validateHook";
import Form from "../../Form/form";
const AdminConfirmModal = () => {
    const dispatch = useDispatch()
    const sendRequest = useFetchHook()
    const slug = useSelector(getModalContent).content.slug
    const validateInput = useValidate()
    const successCallback = () => {
        dispatch(setModalContent({
            type: 'success',
            content: 'Action registered, admin!'
        }))
    }
    const verdictChallenge = async (verdict, details) => {
        const data = {
            verdict,
            details
        }
        const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/challenges-admin/${slug}`, JSON.stringify(data), 'POST', false, successCallback, ['Sending e-mail to the author', 'Sending more e-mails', 'Even more e-mails'])
    }
    const closeModals = () => {
        dispatch(setModal(false))
    }

    const sendVerdict = async (event) => {
        event.preventDefault()
        let valid = true
        const details = event.target[0].value

        valid = validateInput('Details', details, {inputNull: false, inputMin: 5})
        if(!valid)
            return

        await verdictChallenge('send-back', details)
    }


    return (
        <div className='error-wrapper admin-modal'>
            <div className="error-header">
                <img src={LighthouseSVG} alt=""/>
                <h2>Admin menu</h2>
            </div>
            <div className="error-content admin-content">
                <h2>Confirm?</h2>
                <p>Add some details down below, admin.</p>
                <Form onSubmit={sendVerdict}>
                    <Input type='text' placeholder='Reason for sending back' />
                    <div className="admin-confirm-buttons">
                        <WithInfo clickHandler={() => null} data='Retire this challenge temporarely, until the author fixes it!'><Button type='normal' buttonType='submit' text='Send back' color='success' /></WithInfo>
                        <Button buttonType='reset' callback={closeModals} color='light' text='Cancel' />
                    </div>
                </Form>
            </div>
        </div>
    )
}
export default AdminConfirmModal