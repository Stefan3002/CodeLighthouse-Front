import './modify-comment-modal.css'
import LighthouseSVG from "../../../utils/imgs/SVGs/LighthouseSVG.svg";
import Form from "../../Form/form";
import Input from "../../Input/input";
import DifficultyPicker from "../../DifficultyPicker/difficulty-picker";
import EditorCard from "../../EditorCard/editor-card";
import WithInfo from "../../WithInfo/with-info";
import Button from "../../Button/button";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getModalContent} from "../../../utils/store/utils-store/utils-store-selectors";
import createCommentValidations from "../../../utils/validation/createCommentValidations.json";
import useValidate from "../../../utils/hooks/validateHook";
import {setModal, setModalContent} from "../../../utils/store/utils-store/utils-store-actions";
import useFetchHook from "../../../utils/hooks/fetchHook";
import modal from "../../Error/modal";
import {useNavigate} from "react-router-dom";
const ModifyCommentModal = () => {
    const modalContent = useSelector(getModalContent)
    const validateInput = useValidate()
    const dispatch = useDispatch()
    const sendRequest = useFetchHook()
    const slug = useNavigate().slug
    const successCallback = () => {
        dispatch(setModal(true))
        dispatch(setModalContent({
            type: 'success',
            content: 'Comment modified!'
        }))
        modalContent.updateDataCallback()
    }
    const updateComment = async (event) => {
        event.preventDefault()
        const content = event.target[0].value

        let valid = true
        valid = validateInput('Content', content, {inputNull: createCommentValidations.content.inputNull, inputMin: createCommentValidations.content.inputMin})
        if(!valid)
            return
        const dataFetch = {
            content,
            commentID: modalContent.commentID
        }
        const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/challenges/${slug}/comments`,JSON.stringify(dataFetch) , 'PUT', false, successCallback)

    }

    return (
        <div className='error-wrapper create-challenge-wrapper'>
            <div className="error-header create-challenge-header">
                <img src={LighthouseSVG} alt=""/>
                <h2>Update your comment!</h2>
            </div>

            <Form onSubmit={updateComment} className="error-content modify-challenge-content">
                <p>Change the <b>statement.</b> Write plain <b>text</b> only.</p>
                <Input value={modalContent.content} type='textarea' cols={60} rows={20}  />
                <Button color='light' marginated={true} buttonType='submit' text='Update' type='normal'/>
            </Form>
        </div>
    )
}
export default ModifyCommentModal