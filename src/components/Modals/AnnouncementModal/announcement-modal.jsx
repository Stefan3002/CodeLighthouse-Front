import './announcement-modal.css'
import LighthouseSVG from "../../../utils/imgs/SVGs/LighthouseSVG.svg";
import Input from "../../Input/input";
import Button from "../../Button/button";
import {useDispatch, useSelector} from "react-redux";
import {getModalContent} from "../../../utils/store/utils-store/utils-store-selectors";
import useFetchHook from "../../../utils/hooks/fetchHook";
import {setModalContent} from "../../../utils/store/utils-store/utils-store-actions";
import useUpdateData from "../../../utils/hooks/updateDataHook";
import Transition from "../../../utils/js/transitions";
import createAnnouncementValidations from "../../../utils/validation/createAnnouncementValidations.json";
import useValidate from "../../../utils/hooks/validateHook";
const AnnouncementModal = () => {
    const lighthouse = useSelector(getModalContent)
    const validateInput = useValidate()
    const sendRequest = useFetchHook()
    const dispatch = useDispatch()
    const updateData = useUpdateData()
    const successCallback = async () => {
        dispatch(setModalContent({
            type: 'success',
            content: 'Announcement posted!'
        }))
        await updateData()
    }

    const createAnnouncement = async (event) => {
        event.preventDefault()
        let valid = true
        const content = event.target[0].value

        valid = validateInput('Announcement', content, {inputNull: createAnnouncementValidations.content.inputNull, inputMin: createAnnouncementValidations.content.inputMin})
        if(!valid)
            return


        const data = {
            content,
            lighthouseId: lighthouse.data.id
        }
        const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/announcements`, JSON.stringify(data) , 'POST', false, successCallback, ['Creating the announcement!', 'Sending e-mails to the students!', 'We lost some of their e-mails!?', 'No, here they are!'])
    }

    return (
        <div className='error-wrapper create-challenge-wrapper'>
            <div className="error-header create-challenge-header">
                <img src={LighthouseSVG} alt=""/>
                <h2>Make an announcement!</h2>
            </div>
            <form onSubmit={createAnnouncement} className="error-content announcement-content-modal">
                <p>Type in your <b>announcement</b> in HTML. </p>
                <Input type='textarea' rows='20' cols='60' placeholder='<h2>Exam date</h2>' />
                <Button color='light' marginated={true} buttonType='submit' text='Create' type='normal' />
            </form>
        </div>
    )
}
export default AnnouncementModal