import './admin-modal.css'
import LighthouseSVG from "../../../utils/imgs/SVGs/LighthouseSVG.svg";
import EditorCard from "../../EditorCard/editor-card";
import Button from "../../Button/button";
import useFetchHook from "../../../utils/hooks/fetchHook";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getModalContent} from "../../../utils/store/utils-store/utils-store-selectors";
import {setModal, setModalContent} from "../../../utils/store/utils-store/utils-store-actions";
import Input from "../../Input/input";

const AdminModal = () => {
    const sendRequest = useFetchHook()
    const slug = useSelector(getModalContent).content.slug
    const dispatch = useDispatch()

    const successCallback = () => {
        dispatch(setModalContent({
            type: 'success',
            content: 'Action registered, admin!'
        }))
    }

    const verdictChallenge = async (verdict) => {
        console.log(slug)
        const data = {
            verdict
        }
        const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/challenges-admin/${slug}`, JSON.stringify(data), 'POST', false, successCallback)
    }

    return (
        <div className='error-wrapper admin-modal'>
            <div className="error-header">
                <img src={LighthouseSVG} alt=""/>
                <h2>Admin menu</h2>
            </div>
            <div className="error-content admin-content">
                <h2>Hey there Admin!</h2>
                <p>Verdict for this challenge?</p>
                {/*<Input type='text' placeholder='Reason for sending back / denying.' />*/}
                <div className="admin-verdict-buttons">
                    <Button callback={() => verdictChallenge('approve')} buttonType='normal' text='Approve' color='light' />
                    <Button callback={() => verdictChallenge('send-back')} buttonType='normal' text='Send back' color='success' />
                    <Button callback={() => verdictChallenge('deny')} buttonType='normal' text='Deny' color='danger' />
                </div>
                <div className="admin-verdict-buttons">
                    <Button callback={() => verdictChallenge('approve')} buttonType='normal' text='Difficulty' color='light' />
                </div>
            </div>
        </div>
    )
}
export default AdminModal