import './comment.css'
import AuthorName from "../AuthorName/author-name";
import {useDispatch, useSelector} from "react-redux";
import {getUser} from "../../utils/store/user-store/user-store-selectors";
import DeleteSVG from '../../utils/imgs/SVGs/DeleteSVG.svg'
import ModifySVG from '../../utils/imgs/SVGs/ModifyLightSVG.svg'
import ReportSVG from '../../utils/imgs/SVGs/ExclamationLightSVG.svg'
import {useEffect} from "react";
import useFetchHook from "../../utils/hooks/fetchHook";
import {useParams} from "react-router-dom";
import {setModal, setModalContent} from "../../utils/store/utils-store/utils-store-actions";
import WithInfo from "../WithInfo/with-info";
const Comment = ({data, updateDataCallback}) => {
    const user = useSelector(getUser)
    const challengeSlug = useParams()['slug']
    const sendRequest = useFetchHook()
    const dispatch = useDispatch()

    const deleteCommentConfirm = () => {
        dispatch(setModal(true))
        dispatch(setModalContent({
            type: 'confirm',
            content: deleteComment,
            extraData: '<p>Are you sure you want to <strong>delete</strong> your comment?</p>'
        }))
    }

    const deleteComment = async() => {
        const dataFetch = {
            commentID: data.id
        }
        const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/challenges/${challengeSlug}/comments`, JSON.stringify(dataFetch), 'DELETE', false, successCallback)
    }
    const successCallback = () => {
        dispatch(setModal(true))
        dispatch(setModalContent({
            type: 'success',
            content: 'Comment deleted!'
        }))
        updateDataCallback()
    }

    const reportComment = () => {
        dispatch(setModal(true))
        dispatch(setModalContent({
            type: 'report-description',
            content: data,
            mode: 'comment'
        }))
    }
    const modifyComment = () => {
        dispatch(setModal(true))
        dispatch(setModalContent({
            type: 'modifyComment',
            content: data.content,
            commentID: data.id,
            updateDataCallback
        }))
    }
    console.log(data)
    return (
        <div className='comment'>
            <div className="comment-content">
                <p>{data.content}</p>
                {data.modified &&
                <p className='stat-small-text'>(Modified)</p>
                }
            </div>
            <div className="comment-meta">
                <AuthorName author={data.author} />
                <div className="comment-actions">
                    <WithInfo data='Report this comment' clickHandler={reportComment}><img src={ReportSVG} className='icon-svg' alt="Delete"/></WithInfo>
                    {((user.admin_user) || (user.id === data.author.id)) &&
                        <WithInfo clickHandler={deleteCommentConfirm} data='Delete this comment'><img src={DeleteSVG} className='icon-svg' alt="Delete"/></WithInfo>
                    }
                    {user.id === data.author.id &&
                        <WithInfo clickHandler={modifyComment} data='Modify this comment'><img src={ModifySVG} className='icon-svg' alt="Modify"/></WithInfo>
                    }
                </div>
            </div>
        </div>
    )
}
export default Comment