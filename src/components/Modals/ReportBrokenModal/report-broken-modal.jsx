import './report-broken-modal.css'
import BackSVG from "../../../utils/imgs/SVGs/BackSVG.svg";
import LighthouseSVG from "../../../utils/imgs/SVGs/LighthouseSVG.svg";
import CodeOfConduct from "../../CodeOfConduct/code-of-conduct";
import AuthorName from "../../AuthorName/author-name";
import Input from "../../Input/input";
import Button from "../../Button/button";
import {setModal, setModalContent} from "../../../utils/store/utils-store/utils-store-actions";
import {useDispatch, useSelector} from "react-redux";
import useFetchHook from "../../../utils/hooks/fetchHook";
import {getModalContent} from "../../../utils/store/utils-store/utils-store-selectors";
import reportDescriptionValidations from "../../../utils/validation/reportDescriptionValidations.json";
import Form from "../../Form/form";
import useValidate from "../../../utils/hooks/validateHook";
const ReportBrokenModal = () => {
    const sendRequest = useFetchHook()
    const challenge = useSelector(getModalContent).content
    const dispatch = useDispatch()
    const validateInput = useValidate()
    const backOneStep = () => {
        dispatch(setModalContent({
            type: 'report',
            content: challenge
        }))
    }
    const cancelReport = () => {
        dispatch(setModal(false))
    }
    const successCallback = () => {
        dispatch(setModalContent({
            type: 'success',
            data: 'Your report has been submitted and already assigned to an admin!'
        }))
    }

    const sendReport = async (event) => {
        event.preventDefault()
        let valid = true
        const comments = event.target[0].value

        valid = validateInput('Reason', comments, {inputNull: reportDescriptionValidations.reason.inputNull, inputMin: reportDescriptionValidations.reason.inputMin})
        if(!valid)
            return

        const data = {
            reason: 'broken',
            comments
        }
        const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/entity-report/${challenge.slug}?type=challenge-description`, JSON.stringify(data), 'POST', false, successCallback)
    }

    return (
        <div className='error-wrapper report-description-modal'>
            <div className="error-header">
                <img onClick={backOneStep} className='icon-svg' src={BackSVG} alt="Back"/>
                <img src={LighthouseSVG} alt=""/>
                <h2>Report as broken</h2>
            </div>
            <div className="error-content report-description-content">
                <p>Report, </p>
                <p>{challenge.title} by </p>
                <AuthorName author={challenge.author} />

                <Form className='report-description-form' onSubmit={sendReport}>
                    <Input id='report-reason' placeholder='Reason for reporting' required={true}/>
                    <div className="admin-verdict-buttons">
                        <Button ariaLabel='Report as broken challenge' buttonType='submit'
                                text='Report' color='light'/>
                        <Button ariaLabel='Cancel action' buttonType='reset' callback={cancelReport} text='Cancel'
                                color='light'/>
                    </div>
                </Form>


            </div>
        </div>
    )
}
export default ReportBrokenModal