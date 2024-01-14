import './lighthouse-preview-modal.css'
import LighthouseSVG from "../../../utils/imgs/SVGs/LighthouseSVG.svg";
import {useDispatch, useSelector} from "react-redux";
import {getModalContent} from "../../../utils/store/utils-store/utils-store-selectors";
import AuthorName from "../../AuthorName/author-name";
import Button from "../../Button/button";
import {setModal, setModalContent} from "../../../utils/store/utils-store/utils-store-actions";
import useFetchHook from "../../../utils/hooks/fetchHook";
import useUpdateData from "../../../utils/hooks/updateDataHook";
import {getUser} from "../../../utils/store/user-store/user-store-selectors";
const LighthousePreviewModal = () => {
    const data = useSelector(getModalContent)
    const sendRequest = useFetchHook()
    const dispatch = useDispatch()
    const updateUserData = useUpdateData()
    const user = useSelector(getUser)
    const closeModals = () => {
        dispatch(setModal(false))
    }
    const successCallback = async () => {
        dispatch(setModalContent({
            type: 'success',
            data: undefined
        }))
        await updateUserData()
    }
    const joinLighthouse = async () => {
        const dataReq = {
            user_id: user.user_id,
            enrollment_code: data.data.code
        }
        const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/lighthouses/${data.data.id}`,JSON.stringify(dataReq) , 'POST', false, successCallback)
        await updateUserData()
    }

    return (
        <div className='error-wrapper success-wrapper super-success'>
            <div className="error-header code-success-header">
                <div>
                    <img src={LighthouseSVG} alt=""/>
                    <h2>Is this the Lighthouse?</h2>
                </div>
            </div>
            <div className="error-content">
                <h3>{data.data.name}</h3>
                <AuthorName color='light' author={data.data.author} />

                <Button callback={joinLighthouse} color='success' text='Join' marginated={true} marginatedHorizontal={true} />
                <Button callback={closeModals} color='light' text='Cancel' />
            </div>
        </div>
    )
}
export default LighthousePreviewModal