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
const CreateLighthouseModal = () => {
    const sendRequest = useFetchHook()
    const user = useSelector(getUser)
    const dispatch = useDispatch()
    const updateUserData = useUpdateData()

    const successCallback = async () => {
       await updateUserData()
    }

    const createNewLighthouse = async (event) => {
        event.preventDefault()
        const name = event.target[0].value
        const description = event.target[1].value

        const data = {
            name,
            description,
            'user_id': user.user_id
        }

        const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/create-lighthouses`,JSON.stringify(data) , 'POST', false, successCallback)
        dispatch(setModalContent({
            type: 'success',
            data: undefined
        }))
    }

    return (
        // <Transition mode='fullscreen'>
        <div className='error-wrapper'>
            <div className="error-header">
                <img src={LighthouseSVG} alt=""/>
                <h2>Create Lighthouse!</h2>
            </div>
            <div className="error-content">
                <p>Let's configure the <b>Lighthouse</b> to enlighten people!</p>
                <form className='enroll-inputs' onSubmit={createNewLighthouse}>
                    <Input type='text' placeholder='Name.' />
                    <Input type='textarea' rows='12' cols='40' placeholder='Description.' />
                    <Button buttonType='submit' text='Create' type='normal' />
                </form>

            </div>
        </div>
        // </Transition>
    )
}
export default CreateLighthouseModal