import './announcement-modal.css'
import LighthouseSVG from "../../../utils/imgs/SVGs/LighthouseSVG.svg";
import Input from "../../Input/input";
import Button from "../../Button/button";
import {useDispatch, useSelector} from "react-redux";
import {getModalContent, getSocketConnection} from "../../../utils/store/utils-store/utils-store-selectors";
import useFetchHook from "../../../utils/hooks/fetchHook";
import {setModal, setModalContent} from "../../../utils/store/utils-store/utils-store-actions";
import useUpdateData from "../../../utils/hooks/updateDataHook";
import Transition from "../../../utils/js/transitions";
import createAnnouncementValidations from "../../../utils/validation/createAnnouncementValidations.json";
import useValidate from "../../../utils/hooks/validateHook";
import {notifyAnnouncement} from "../../../utils/notifications/lighthouseNotifications";
import {useState} from "react";
import SelectedFiles from "../../SelectedFiles/selected-files";
import {useParams} from "react-router-dom";
import Form from "../../Form/form";
const AnnouncementModal = () => {
    const lighthouse = useSelector(getModalContent)
    const validateInput = useValidate()
    const sendRequest = useFetchHook()
    const dispatch = useDispatch()
    const lighthouseId = useParams().id
    const updateData = useUpdateData(`${process.env.REACT_APP_SERVER_URL}/lighthouses/${lighthouseId}`)
    const socketConnection = useSelector(getSocketConnection)
    const [selectedFiles, setSelectedFiles] = useState([])
    const successCallback = async (event, content) => {
        notifyAnnouncement(socketConnection, `<h2>New announcement</h2>${content.trim(0, 40)} <br /> in ${lighthouse.data.name}`, `/app/lighthouses/${lighthouse.data.id}`, lighthouse.data.id)

        dispatch(setModal(true))
        dispatch(setModalContent({
            type: 'success',
            content: 'Announcement posted!'
        }))
        lighthouse.updateLighthouseDataHook(await updateData(true))

    }

    const createAnnouncement = async (event) => {
        event.preventDefault()
        let valid = true
        const content = event.target[0].value

        valid = validateInput('Announcement', content, {inputNull: createAnnouncementValidations.content.inputNull, inputMin: createAnnouncementValidations.content.inputMin})
        if(!valid)
            return

        const files = event.target[1].files
        if(files.length) {
            valid = validateInput('File', files[0].type, {beIn: createAnnouncementValidations.file.beIn})
            if (!valid)
                return
        }

        const dataFiles = new FormData()

        dataFiles.append('files', files[0])
        dataFiles.append('content', content)
        dataFiles.append('lighthouseId', lighthouse.data.id)

        const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/announcements`, dataFiles , 'POST', false, (event) => successCallback(event, content), ['Creating the announcement!', 'Sending e-mails to the students!', 'We lost some of their e-mails!?', 'No, here they are!'], true)
    }

    const changeFilesUploaded = (event) => {
        const files = event.target.files
        setSelectedFiles(files)
    }

    return (
        <div className='error-wrapper create-challenge-wrapper'>
            <div className="error-header create-challenge-header">
                <img src={LighthouseSVG} alt=""/>
                <h2>Make an announcement!</h2>
            </div>
            <Form onSubmit={createAnnouncement} className="error-content announcement-content-modal">
                <p>Type in your <b>announcement</b> in HTML. </p>
                <Input type='textarea' rows='20' cols='60' placeholder='<h2>Exam date</h2>' />
                <Input onChangeCallback={changeFilesUploaded} type='file' />
                <SelectedFiles data={selectedFiles} />
                <Button ariaLabel='Create announcement' color='light' buttonType='submit' text='Create' type='normal' />
            </Form>
        </div>
    )
}
export default AnnouncementModal