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
const ReportBrokenModal = () => {
    const sendRequest = useFetchHook()
    const challenge = useSelector(getModalContent).content
    const dispatch = useDispatch()

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

    const sendReport = async () => {
        const data = {
            reason: 'broken'
        }
        const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/challenges-report/${challenge.slug}`, JSON.stringify(data), 'POST', false, successCallback)
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
                    <div className="admin-verdict-buttons">
                        <Button buttonType='submit' callback={sendReport} text='Report' color='light' />
                        <Button buttonType='reset' callback={cancelReport} text='Cancel' color='light' />
                    </div>
            </div>
        </div>
    )
}
export default ReportBrokenModal