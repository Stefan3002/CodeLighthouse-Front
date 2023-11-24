import './report-modal.css'
import LighthouseSVG from "../../../utils/imgs/SVGs/LighthouseSVG.svg";
import Button from "../../Button/button";
import {useDispatch, useSelector} from "react-redux";
import {getModalContent} from "../../../utils/store/utils-store/utils-store-selectors";
import AuthorName from "../../AuthorName/author-name";
import {setModalContent} from "../../../utils/store/utils-store/utils-store-actions";
import useFetchHook from "../../../utils/hooks/fetchHook";
const ReportModal = () => {
    const challenge = useSelector(getModalContent).content
    const dispatch = useDispatch()
    const sendRequest = useFetchHook()
    const reportDescription =  () => {
        dispatch(setModalContent({
            type: 'report-description',
            content: challenge
        }))
    }

    const successCallback = () => {
        dispatch(setModalContent({
            type: 'success',
            data: 'Your report has been submitted and already assigned to an admin!'
        }))
    }

    const reportBroken =  () => {
        dispatch(setModalContent({
            type: 'report-broken',
            content: challenge
        }))
    }

    const reportDifficulty = async () => {
        const data = {
            reason: 'difficulty'
        }
        const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/challenges-report/${challenge.slug}`, JSON.stringify(data), 'POST', false, successCallback)
    }

    return (
        <div className='error-wrapper report-modal'>
            <div className="error-header">
                <img src={LighthouseSVG} alt=""/>
                <h2>Report menu</h2>
            </div>
            <div className="error-content report-content">
                <h2>Hey there!</h2>
                <p>What seems to be <b>wrong</b> with this challenge?</p>
                <p>{challenge.title} by </p>
                <AuthorName author={challenge.author} />
                {/*<Input type='text' placeholder='Reason for sending back / denying.' />*/}
                <div className="admin-verdict-buttons">
                    <Button callback={reportDescription} buttonType='normal' text='Description' color='light' />
                    <Button callback={reportBroken} buttonType='normal' text='Broken' color='light' />
                    <Button callback={reportDifficulty} buttonType='normal' text='Difficulty' color='light' />
                </div>
            </div>
        </div>
    )
}
export default ReportModal