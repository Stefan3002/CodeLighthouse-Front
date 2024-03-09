import './join-contest-modal.css'
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
import joinLighthouseValidations from "../../../utils/validation/joinLighhouseValidations.json";
import useUpdateData from "../../../utils/hooks/updateDataHook";
import Form from "../../Form/form";
const JoinContestModal = () => {
    const validateInput = useValidate()
    const user = useSelector(getUser)
    const sendRequest = useFetchHook()
    const dispatch = useDispatch()
    const [selectedFiles, setSelectedFiles] = useState([])
    const modalContent = useSelector(getModalContent)
    const updateUserData = useUpdateData()


    const successCallback = async () => {
        dispatch(setModalContent({
            type: 'success',
            data: undefined
        }))
        await updateUserData()
    }
    const joinContest = async (code) => {
        const dataReq = {
            enrollment_code: code
        }
        const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/entities/1?type=contest`,JSON.stringify(dataReq) , 'POST', false, successCallback)
        // await updateUserData()
    }

    const previewSuccessCallback = async (enrollmentCode, data) => {
        dispatch(setModalContent({
            type: 'lighthousePreview',
            data: {
                ...data,
                code: enrollmentCode,
                forwardCallback: () => joinContest(enrollmentCode)
            }
        }))
        // await updateUserData()
    }
    const enrollContest = async (event) => {
        event.preventDefault()
        let valid = true

        const code = event.target[0].value
        // const lighthouseId = event.target[1].value

        valid = validateInput('Enrollment code of Contest', code, {inputNull: joinLighthouseValidations.code.inputNull, inputMin: joinLighthouseValidations.code.inputMin})
        if(!valid)
            return

        // valid = validateInput('ID of Lighthouse', lighthouseId, {inputNull: joinLighthouseValidations.id.inputNull, inputMin: joinLighthouseValidations.id.inputMin})
        // if(!valid)
        //     return
        const dataFetch = {
            enrollmentCode: code
        }
        const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/content-preview?type=contest`,JSON.stringify(dataFetch) , 'POST', true, (data) => previewSuccessCallback(code, data))

    }

    const backOneStep = () => {
        dispatch(setModalContent({
            type: 'menuLighthouse',
            content: modalContent.oldContent
        }))
    }

    return (
        <div className='error-wrapper'>
            <div className="error-header">
                <img onClick={backOneStep} className='icon-svg' src={BackSVG} alt="Back"/>
                <img src={LighthouseSVG} alt=""/>
                <h2>Join Contest!</h2>
            </div>
            <div className="error-content create-lighthouse-content">
                <p>Enter the <b>enrollment code</b> of the contest:</p>
                <Form className='enroll-inputs' onSubmit={enrollContest}>
                    <Input type='text' placeholder='Enrollment code'/>
                    {/*<Input type='text' placeholder='Id of the Lighthouse.'/>*/}
                    <Button color='light' buttonType='submit' text='Join' type='normal'/>
                </Form>
            </div>
        </div>
    )
}
export default JoinContestModal