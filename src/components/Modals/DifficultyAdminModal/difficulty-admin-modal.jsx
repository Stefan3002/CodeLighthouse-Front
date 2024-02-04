import './difficulty-admin-modal.css'
import LighthouseSVG from "../../../utils/imgs/SVGs/LighthouseSVG.svg";
import Input from "../../Input/input";
import WithInfo from "../../WithInfo/with-info";
import Button from "../../Button/button";
import {useDispatch, useSelector} from "react-redux";
import useFetchHook from "../../../utils/hooks/fetchHook";
import {getDifficulty, getModalContent} from "../../../utils/store/utils-store/utils-store-selectors";
import useValidate from "../../../utils/hooks/validateHook";
import {setModal, setModalContent} from "../../../utils/store/utils-store/utils-store-actions";
import DifficultyPicker from "../../DifficultyPicker/difficulty-picker";
import Difficulty from "../../Difficulty/difficulty";
import useUpdateData from "../../../utils/hooks/updateDataHook";
const DifficultyAdminModal = () => {
    const dispatch = useDispatch()
    const sendRequest = useFetchHook()
    const data = useSelector(getModalContent).content
    const slug = data.data.slug
    const validateInput = useValidate()
    const selectedDifficulty = useSelector(getDifficulty)
    const updateData = useUpdateData(`${process.env.REACT_APP_SERVER_URL}/challenges/${slug}`)

    const successCallback = async () => {
        dispatch(setModalContent({
            type: 'success',
            content: 'Action registered, admin!'
        }))
        data.setDataHook(await updateData(true))
    }

    const closeModals = () => {
        dispatch(setModal(false))
    }

    const sendDifficulty = async () => {
        const data = {
            verdict: 'difficulty',
            details: selectedDifficulty
        }
        const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/challenges-admin/${slug}`, JSON.stringify(data), 'POST', false, successCallback, ['Sending e-mail to the author', 'Sending more e-mails', 'Even more e-mails'])

    }


    return (
        <div className='error-wrapper admin-modal'>
            <div className="error-header">
                <img src={LighthouseSVG} alt=""/>
                <h2>Admin menu</h2>
            </div>
            <div className="error-content admin-content">
                <h2>Select difficulty</h2>
                <p>Select a difficulty, admin.</p>

                <DifficultyPicker type='difficulties'/>

                <div className='admin-confirm-buttons'>
                <WithInfo clickHandler={sendDifficulty}
                          data='Change the difficulty of this challenge'><Button
                    buttonType='normal' text='Change difficulty' color='success'/></WithInfo>
                <Button buttonType='reset' callback={closeModals} color='light' text='Cancel'/>
                </div>


            </div>
        </div>
    )
}
export default DifficultyAdminModal