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

const ReportDescriptionModal = () => {
    const sendRequest = useFetchHook()
    const challenge = useSelector(getModalContent).content
    const dispatch = useDispatch()
    const backOneStep = () => {
        dispatch(setModalContent({
            type: 'report',
            content: challenge
        }))
    }

    const successCallback = () => {
        dispatch(setModalContent({
            type: 'success',
            data: 'Your report has been submitted and already assigned to an admin!'
        }))
    }

    const reportChallenge = async (event) => {
        event.preventDefault()
        const comments = event.target[0].value
        const readCodeofConduct = event.target[1].checked

        const data = {
            comments,
            readCodeofConduct,
            reason: 'description'
        }
        const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/challenges-report/${challenge.slug}`, JSON.stringify(data), 'POST', false, successCallback)
    }

    const cancelReport = () => {
        dispatch(setModal(false))
    }

    return (
        <div className='error-wrapper report-description-modal'>
            <div className="error-header">
                <img onClick={backOneStep} className='icon-svg' src={BackSVG} alt="Back"/>
                <img src={LighthouseSVG} alt=""/>
                <h2>Report description</h2>
            </div>
            <div className="error-content report-description-content">
                {/*<h2>Hey there!</h2>*/}
                <p>Before reporting the <b>description</b>, please read the <strong>Code of Conduct</strong> below.</p>

                <CodeOfConduct />
                <p>Report, </p>
                <p><strong>{challenge.title}</strong> by </p>
                <AuthorName author={challenge.author} />
                {/*<Input type='text' placeholder='Reason for sending back / denying.' />*/}
                <form className='report-description-form' onSubmit={reportChallenge}>
                    <Input placeholder='Reason for reporting' required={true}  />
                    <Input type='checkbox' placeholder='I have read the Code of Conduct' required={true}  />
                    <div className="admin-verdict-buttons">
                        <Button buttonType='submit' text='Report' color='light' />
                        <Button buttonType='reset' callback={cancelReport} text='Cancel' color='light' />
                    </div>
                </form>
            </div>
        </div>
    )
}
export default ReportDescriptionModal