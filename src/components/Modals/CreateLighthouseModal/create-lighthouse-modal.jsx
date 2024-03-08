import './create-lighthouse-modal.css'
import LighthouseSVG from "../../../utils/imgs/SVGs/LighthouseSVG.svg";
import Input from "../../Input/input";
import Button from "../../Button/button";
import {setModalContent} from "../../../utils/store/utils-store/utils-store-actions";
import {useDispatch, useSelector} from "react-redux";
import useFetchHook from "../../../utils/hooks/fetchHook";
import {getUser} from "../../../utils/store/user-store/user-store-selectors";
import {setUser} from "../../../utils/store/user-store/user-store-actions";
import {useEffect} from "react";
import useUpdateData from "../../../utils/hooks/updateDataHook";
import BackSVG from "../../../utils/imgs/SVGs/BackSVG.svg";
import createLighthouseValidations from "../../../utils/validation/createLighthouseValidations.json";
import useValidate from "../../../utils/hooks/validateHook";
import {getModalContent} from "../../../utils/store/utils-store/utils-store-selectors";
import Form from "../../Form/form";
const CreateLighthouseModal = () => {
    const validateInput = useValidate()
    const sendRequest = useFetchHook()
    const user = useSelector(getUser)
    const dispatch = useDispatch()
    const updateUserData = useUpdateData()
    const modalContent = useSelector(getModalContent)

    const successCallback = async () => {
       await updateUserData()
    }

    const createNewLighthouse = async (event) => {
        event.preventDefault()
        let valid = true
        const name = event.target[0].value
        const description = event.target[1].value
        const community = event.target[2].checked

        valid = validateInput('Name of Lighthouse', name, {inputNull: createLighthouseValidations.name.inputNull, inputMin: createLighthouseValidations.name.inputMin})
        if(!valid)
            return

        valid = validateInput('Description of Lighthouse', description, {inputNull: createLighthouseValidations.description.inputNull, inputMin: createLighthouseValidations.description.inputMin})
        if(!valid)
            return

        const data = {
            name,
            description,
            community,
            'user_id': user.user_id
        }

        const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/create-lighthouses`,JSON.stringify(data) , 'POST', false, successCallback)
        dispatch(setModalContent({
            type: 'success',
            data: undefined,
        }))
    }

    const backOneStep = () => {
        dispatch(setModalContent({
            type: 'menuLighthouse',
            content: modalContent.oldContent
        }))
    }

    return (
        // <Transition mode='fullscreen'>
        <div className='error-wrapper'>
            <div className="error-header">
                <img onClick={backOneStep} className='icon-svg' src={BackSVG} alt="Back"/>
                <img src={LighthouseSVG} alt=""/>
                <h2>Create Lighthouse!</h2>
            </div>
            <div className="error-content create-lighthouse-content">
                <p>Let's configure the <b>Lighthouse</b> to enlighten people!</p>
                <Form onSubmit={createNewLighthouse} className='enroll-inputs' >
                    <Input type='text' placeholder='Name.' />
                    <Input type='textarea' rows='12' cols='40' placeholder='Description.' />
                    <p>Make it a community? (public lighthouse)</p>
                    <Input type='checkbox' placeholder='Yes, make it public!' />
                    <Button buttonType='submit' text='Create' type='normal' />
                </Form>

            </div>
        </div>
        // </Transition>
    )
}
export default CreateLighthouseModal