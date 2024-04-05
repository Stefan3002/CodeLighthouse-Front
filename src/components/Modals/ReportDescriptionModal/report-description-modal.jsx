import './report-description-modal.css'
import LighthouseSVG from "../../../utils/imgs/SVGs/LighthouseSVG.svg";
import AuthorName from "../../AuthorName/author-name";
import Button from "../../Button/button";
import {useDispatch, useSelector} from "react-redux";
import {getModalContent} from "../../../utils/store/utils-store/utils-store-selectors";
import BackSVG from '../../../utils/imgs/SVGs/BackSVG.svg'
import {setModal, setModalContent} from "../../../utils/store/utils-store/utils-store-actions";
import CodeOfConduct from "../../CodeOfConduct/code-of-conduct";
import useFetchHook from "../../../utils/hooks/fetchHook";
import Input from "../../Input/input";
import reportDescriptionValidations from "../../../utils/validation/reportDescriptionValidations.json";
import useValidate from "../../../utils/hooks/validateHook";
import Form from "../../Form/form";

const ReportDescriptionModal = () => {
    const sendRequest = useFetchHook()
    const validateInput = useValidate()
    const data = useSelector(getModalContent)
    const entity = data.content
    const dispatch = useDispatch()
    const mode = data.mode ? data.mode : 'challenge-description'
    const backOneStep = () => {
        dispatch(setModalContent({
            type: 'report',
            content: entity
        }))
    }

    const successCallback = () => {
        dispatch(setModalContent({
            type: 'success',
            data: 'Your report has been submitted and already assigned to an admin!'
        }))
    }

    const reportentity = async (event) => {
        event.preventDefault()
        let valid = true
        const comments = event.target[0].value

        valid = validateInput('Reason', comments, {inputNull: reportDescriptionValidations.reason.inputNull, inputMin: reportDescriptionValidations.reason.inputMin})
        if(!valid)
            return

        const readCodeofConduct = event.target[1].checked

        valid = validateInput('Read Code of Conduct', readCodeofConduct, {checked: reportDescriptionValidations.conduct.checked})
        if(!valid)
            return

        const data = {
            comments,
            readCodeofConduct,
            reason: mode
        }
        const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/entity-report/${mode === 'comment' ? entity.id : entity.slug}?type=${mode}`, JSON.stringify(data), 'POST', false, successCallback)
    }

    const cancelReport = () => {
        dispatch(setModal(false))
    }

    return (
        <div className='error-wrapper report-description-modal'>
            <div className="error-header">
                {mode === 'entity-description' &&
                    <img onClick={backOneStep} className='icon-svg' src={BackSVG} alt="Back"/>
                }
                <img src={LighthouseSVG} alt=""/>
                <h2>Report {mode}</h2>
            </div>
            <div className="error-content report-description-content">
                {/*<h2>Hey there!</h2>*/}
                <p>Before reporting the <b>{mode}</b>, please read the <strong>Code of Conduct</strong> below.</p>
                <CodeOfConduct />
                <p>Report, </p>
                <p><strong>{entity.title ? entity.title : mode}</strong> by </p>
                <AuthorName author={entity.author} />
                {mode === 'comment' &&
                    <>
                        <p>{entity.content.slice(0, 100)}</p>
                        {entity.content.length > 100 &&
                        <p>More...(not shown)</p>
                        }
                    </>
                }
                {/*<Input type='text' placeholder='Reason for sending back / denying.' />*/}
                <Form className='report-description-form' onSubmit={reportentity}>
                    <Input id='report-reason' placeholder='Reason for reporting' required={true}  />
                    <Input type='checkbox' placeholder='I have read the Code of Conduct' required={true}  />
                    <div className="admin-verdict-buttons">
                        <Button id='send-report' buttonType='submit' text='Report' color='light' />
                        <Button buttonType='reset' callback={cancelReport} text='Cancel' color='light' />
                    </div>
                </Form>
            </div>
        </div>
    )
}
export default ReportDescriptionModal