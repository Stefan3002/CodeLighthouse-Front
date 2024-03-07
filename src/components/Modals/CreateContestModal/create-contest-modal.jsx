import './create-contest-modal.css'
import BackSVG from "../../../utils/imgs/SVGs/BackSVG.svg";
import LighthouseSVG from "../../../utils/imgs/SVGs/LighthouseSVG.svg";
import Input from "../../Input/input";
import Button from "../../Button/button";
import createContestValidations from "../../../utils/validation/createContestValidations.json";
import {setModalContent} from "../../../utils/store/utils-store/utils-store-actions";
import useValidate from "../../../utils/hooks/validateHook";
import {useDispatch, useSelector} from "react-redux";
import {getUser} from "../../../utils/store/user-store/user-store-selectors";
import useFetchHook from "../../../utils/hooks/fetchHook";
import createAnnouncementValidations from "../../../utils/validation/createAnnouncementValidations.json";
import {useState} from "react";
import SelectedFiles from "../../SelectedFiles/selected-files";
import DateTime from "../../DateTime/date-time";
import {getModalContent} from "../../../utils/store/utils-store/utils-store-selectors";
const CreateContestModal = () => {
    const validateInput = useValidate()
    const user = useSelector(getUser)
    const sendRequest = useFetchHook()
    const dispatch = useDispatch()
    const [selectedFiles, setSelectedFiles] = useState([])
    const modalContent = useSelector(getModalContent)
    const backOneStep = () => {
        dispatch(setModalContent({
            type: 'menuLighthouse',
            content: modalContent.oldContent
        }))
    }
    const changeFilesUploaded = (event) => {
        const files = event.target.files
        setSelectedFiles(files)
    }
    const successCallback = async () => {
        // await updateUserData()
    }

    const createNewContest = async (event) => {
        event.preventDefault()
        let valid = true
        const name = event.target[0].value
        const description = event.target[1].value
        const publicContest = event.target[2].checked

        const startDate = event.target[4].value
        const startTime = event.target[5].value

        const endDate = event.target[6].value
        const endTime = event.target[7].value

        valid = validateInput('Name of the Contest', name, {inputNull: createContestValidations.name.inputNull, inputMin: createContestValidations.name.inputMin})
        if(!valid)
            return

        valid = validateInput('Description of the Contest', description, {inputNull: createContestValidations.description.inputNull, inputMin: createContestValidations.description.inputMin})
        if(!valid)
            return

        valid = validateInput('Starting date', startDate, {inputNull: createContestValidations.startDate.inputNull})
        if(!valid)
            return

        valid = validateInput('Starting time', startTime, {inputNull: createContestValidations.startTime.inputNull})
        if(!valid)
            return

        valid = validateInput('Ending date', endDate, {inputNull: createContestValidations.endDate.inputNull})
        if(!valid)
            return

        valid = validateInput('Ending time', endTime, {inputNull: createContestValidations.endTime.inputNull})
        if(!valid)
            return

        const files = event.target[3].files
        // console.log('aaaaaaaaa', files)
        if(files.length) {
            valid = validateInput('File', files[0].type, {beIn: createContestValidations.file.beIn})
            if (!valid)
                return
        }

        const dataFiles = new FormData()

        dataFiles.append('files', files[0])
        dataFiles.append('name', name)
        dataFiles.append('description', description)
        dataFiles.append('publicContest', publicContest)

        dataFiles.append('startDate', startDate)
        dataFiles.append('startTime', startTime)
        dataFiles.append('endDate', endDate)
        dataFiles.append('endTime', endTime)

        // dataFiles.append('lighthouseId', lighthouse.data.id)


        // const data = {
        //     name,
        //     description,
        //     publicContest,
        //     'user_id': user.user_id
        // }

        const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/create-contest`, dataFiles, 'POST', false, successCallback, ['Creating a new contest!', 'Get ready!'], true)
        dispatch(setModalContent({
            type: 'success',
            data: undefined,
        }))
    }

    return (
        <div className='error-wrapper'>
            <div className="error-header">
                <img onClick={backOneStep} className='icon-svg' src={BackSVG} alt="Back"/>
                <img src={LighthouseSVG} alt=""/>
                <h2>Create Contest!</h2>
            </div>
            <div className="error-content create-lighthouse-content">
                <p>Let's configure the <b>Contest</b> to verify the enlightment of the people!</p>
                <form className='enroll-inputs' onSubmit={createNewContest}>
                    <Input type='text' placeholder='Name of contest.'/>
                    <Input type='textarea' rows='12' cols='40' placeholder='Description of contest.'/>
                    <p>Make it an open contest? (public contest)</p>
                    <Input type='checkbox' placeholder='Yes, make it public!'/>

                    <p>If private, upload the list of admitted competitors</p>
                    <Input onChangeCallback={changeFilesUploaded} type='file'/>
                    <SelectedFiles data={selectedFiles}/>

                    <p>Start date and time</p>
                    <div className='assignment-inputs-due'>
                        <Input type='date'/>
                        <Input type='time'/>
                    </div>
                    <p>End date and time</p>
                    <div className='assignment-inputs-due'>
                        <Input type='date'/>
                        <Input type='time'/>
                    </div>

                    <Button marginated={true} buttonType='submit' text='Create' type='normal'/>


                </form>
            </div>
        </div>
    )
}
export default CreateContestModal