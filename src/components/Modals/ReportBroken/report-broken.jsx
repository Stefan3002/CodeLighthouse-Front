import './report-broken.css'
import BackSVG from "../../../utils/imgs/SVGs/BackSVG.svg";
import LighthouseSVG from "../../../utils/imgs/SVGs/LighthouseSVG.svg";
import CodeOfConduct from "../../CodeOfConduct/code-of-conduct";
import AuthorName from "../../AuthorName/author-name";
import Input from "../../Input/input";
import Button from "../../Button/button";
import {setModalContent} from "../../../utils/store/utils-store/utils-store-actions";
import {useDispatch, useSelector} from "react-redux";
import useFetchHook from "../../../utils/hooks/fetchHook";
import {getModalContent} from "../../../utils/store/utils-store/utils-store-selectors";
const ReportBroken = () => {
    const sendRequest = useFetchHook()
    const challenge = useSelector(getModalContent).content
    const dispatch = useDispatch()

    const backOneStep = () => {
        dispatch(setModalContent({
            type: 'report',
            content: challenge
        }))
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
                <p>{challenge.title} by </p>
                <AuthorName author={challenge.author} />
                {/*<Input type='text' placeholder='Reason for sending back / denying.' />*/}
                <form onSubmit={reportChallenge}>
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
export default ReportBroken