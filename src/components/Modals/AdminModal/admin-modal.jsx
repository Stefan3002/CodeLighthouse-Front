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
import WithInfo from "../../WithInfo/with-info";

const AdminModal = () => {
    const sendRequest = useFetchHook()
    const data = useSelector(getModalContent).content
    const {slug} = data
    const dispatch = useDispatch()

    const successCallback = () => {
        dispatch(setModalContent({
            type: 'success',
            content: 'Action registered, admin!'
        }))
    }
    const openAdminConfirmation = () => {
        dispatch(setModalContent({
            type: 'admin-confirm',
            content: data
        }))
    }

    const openDifficultyAdmin = () => {
        dispatch(setModalContent({
            type: 'difficulty-admin',
            content: data
        }))
    }

    const verdictChallenge = async (verdict) => {
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
                    <WithInfo clickHandler={() => verdictChallenge('approve')} data='Make this challenge public!'><Button buttonType='normal' text='Approve' color='light' /></WithInfo>
                    <WithInfo clickHandler={openAdminConfirmation} data='Retire this challenge temporarely, until the author fixes it!'><Button buttonType='normal' text='Send back' color='success' /></WithInfo>
                    <WithInfo clickHandler={() => verdictChallenge('deny')} data='Retire this challenge FOREVER!'><Button  buttonType='normal' text='Deny' color='danger' /></WithInfo>
                </div>
                <div className="admin-verdict-buttons">
                    <Button callback={openDifficultyAdmin} buttonType='normal' text='Difficulty' color='light' />
                </div>
            </div>
        </div>
    )
}
export default AdminModal