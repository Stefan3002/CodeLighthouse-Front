import './create-comment-modal.css'
import LighthouseSVG from "../../../utils/imgs/SVGs/LighthouseSVG.svg";
import Input from "../../Input/input";
import Button from "../../Button/button";
import useFetchHook from "../../../utils/hooks/fetchHook";
import {useDispatch, useSelector} from "react-redux";
import {getUser} from "../../../utils/store/user-store/user-store-selectors";
import {getModalContent} from "../../../utils/store/utils-store/utils-store-selectors";
import {setModal, setModalContent} from "../../../utils/store/utils-store/utils-store-actions";
const CreateCommentModal = () => {
    const sendRequest = useFetchHook()
    const user = useSelector(getUser)
    const modalContent = useSelector(getModalContent)
    const dispatch = useDispatch()

    const successCallback = () => {
        dispatch(setModal(true))
        dispatch(setModalContent({
            type: 'success',
            content: 'Comment added!'
        }))
    }
    const createNewComment = async (event) => {
        event.preventDefault()
        const content = event.target[0].value

        const data = {
            content,
            userId: user.user_id
        }
        const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/challenges/${modalContent.data.slug}/comments`,JSON.stringify(data) , 'POST', false, successCallback)

    }

    return (
        // <Transition mode='fullscreen'>
        <div className='error-wrapper create-challenge-wrapper'>
            <div className="error-header create-challenge-header">
                <img src={LighthouseSVG} alt=""/>
                <h2>Add a comment!</h2>
            </div>
            <form onSubmit={createNewComment} className="error-content">
                <p>Type in the <b>content</b> of your comment!</p>
                <Input type='textarea' rows='20' cols='60' placeholder='I love this challenge because...' />
                <Button marginated={true} color='light' buttonType='submit' text='Create' type='normal' />
            </form>
        </div>
        // </Transition>
    )
}
export default CreateCommentModal