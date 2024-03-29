import './comments-page.css'
import Transition from "../../utils/js/transitions";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import useFetchHook from "../../utils/hooks/fetchHook";
import ChallengeMeta from "../ChallengeMeta/challenge-meta";
import Input from "../Input/input";
import Button from "../Button/button";
import {useDispatch} from "react-redux";
import {setModal, setModalContent} from "../../utils/store/utils-store/utils-store-actions";
import Comment from "../Comment/comment";
import TopSection from "../TopSection/top-section";
import AuthorName from "../AuthorName/author-name";
import Difficulty from "../Difficulty/difficulty";
import Missing from "../Missing/missing";
import useUpdateData from "../../utils/hooks/updateDataHook";
const CommentsPage = () => {
    const challengeSlug = useParams()['slug']
    const [data, setData] = useState(undefined)
    const sendRequest = useFetchHook()
    const dispatch = useDispatch()
    const updateData = useUpdateData(`${process.env.REACT_APP_SERVER_URL}/challenges/${challengeSlug}`)
    const newComment = () => {
        dispatch(setModal(true))
        dispatch(setModalContent({
            type: 'newComment',
            data,
            updateDataCallback
        }))
    }
    const updateDataCallback = async () => {
        setData(await updateData())
    }


    useEffect(() => {
        (async () => {
            const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/challenges/${challengeSlug}`, undefined, 'GET', true)
            setData(res)
        })()
    }, []);
    // console.log('===', data)
    if(data)
    return (
        <Transition mode='fullscreen'>
            <TopSection title={data.title} nameOfPage='Challenge' children={<> <AuthorName author={data.author} /> <Difficulty difficulty={data.difficulty}/> </>} />

            <div className='wrapper comments-page'>
                <div className="comments">
                    {data.comments.length ? data.comments.map(comment => {
                        return <Comment updateDataCallback={updateDataCallback} data={comment} />
                    }) : <Missing text='Nobody said anything yet!' />}
                </div>
            </div>
            <Button ariaLabel='Add a new comment' callback={newComment} type='plus' />

            {/*<ChallengeMeta type='stats' data={data} />*/}
        </Transition>
    )
}
export default CommentsPage