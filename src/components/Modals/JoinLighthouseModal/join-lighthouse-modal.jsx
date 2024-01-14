import './join-lighthouse-modal.css'
import LighthouseSVG from "../../../utils/imgs/SVGs/LighthouseSVG.svg";
import Input from "../../Input/input";
import Button from "../../Button/button";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getModalContent} from "../../../utils/store/utils-store/utils-store-selectors";
import useFetchHook from "../../../utils/hooks/fetchHook";
import {getUser} from "../../../utils/store/user-store/user-store-selectors";
import useUpdateData from "../../../utils/hooks/updateDataHook";
import {setModalContent} from "../../../utils/store/utils-store/utils-store-actions";
import BackSVG from "../../../utils/imgs/SVGs/BackSVG.svg";
import useValidate from "../../../utils/hooks/validateHook";
import joinLighthouseValidations from '../../../utils/validation/joinLighhouseValidations.json'
const JoinLighthouseModal = () => {
    const validateInput = useValidate()
    const sendRequest = useFetchHook()
    const user = useSelector(getUser)
    const updateUserData = useUpdateData()
    const dispatch = useDispatch()



    const previewSuccessCallback = async (enrollmentCode, data) => {
        dispatch(setModalContent({
            type: 'lighthousePreview',
            data: {
                ...data,
                code: enrollmentCode
            }
        }))
        // await updateUserData()
    }
    const enrollLighthouse = async (event) => {
        event.preventDefault()
        let valid = true

        const code = event.target[0].value
        const lighthouseId = event.target[1].value

        valid = validateInput('Enrollment code of Lighthouse', code, {inputNull: joinLighthouseValidations.code.inputNull, inputMin: joinLighthouseValidations.code.inputMin})
        if(!valid)
            return

        valid = validateInput('ID of Lighthouse', lighthouseId, {inputNull: joinLighthouseValidations.id.inputNull, inputMin: joinLighthouseValidations.id.inputMin})
        if(!valid)
            return

        const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/lighthouses-preview/${lighthouseId}`,null , 'GET', true, (data) => previewSuccessCallback(code, data))

    }

    const backOneStep = () => {
        dispatch(setModalContent({
            type: 'menuLighthouse',
            content: undefined
        }))
    }

    return (
        // <Transition mode='fullscreen'>
        <div className='error-wrapper'>
            <div className="error-header">
                <img onClick={backOneStep} className='icon-svg' src={BackSVG} alt="Back"/>
                <img src={LighthouseSVG} alt=""/>
                <h2>Join Lighthouse!</h2>
            </div>
            <div className="error-content">
                <p>Enter the <b>enrollment code</b> of the lighthouse:</p>
                <form className='enroll-inputs' onSubmit={enrollLighthouse}>
                    <Input type='text' placeholder='Enrollment code' />
                    <Input type='text' placeholder='Id of the Lighthouse.' />
                    <Button color='light' buttonType='submit' text='Join' type='normal' />
                </form>

            </div>
        </div>
        // </Transition>
    )
}
export default JoinLighthouseModal