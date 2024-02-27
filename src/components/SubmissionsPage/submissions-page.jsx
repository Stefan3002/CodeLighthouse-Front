import './submissions-page.css'
import Transition from "../../utils/js/transitions";
import {useEffect, useState} from "react";
import useFetchHook from "../../utils/hooks/fetchHook";
import {useDispatch, useSelector} from "react-redux";
import {getUser} from "../../utils/store/user-store/user-store-selectors";
import {Editor} from "@monaco-editor/react";
import EditorCard from "../EditorCard/editor-card";
import Heading from "../Heading/heading";
import {useParams} from "react-router-dom";
import TopSection from "../TopSection/top-section";
import AuthorName from "../AuthorName/author-name";
import Difficulty from "../Difficulty/difficulty";
import Missing from "../Missing/missing";
import useUpdateData from "../../utils/hooks/updateDataHook";
import {setUser} from "../../utils/store/user-store/user-store-actions";
const SubmissionsPage = () => {
    const sendRequest = useFetchHook()
    const [data, setData] = useState(undefined)
    const user = useSelector(getUser)
    const slug = useParams().slug
    const updateData = useUpdateData()

    const [solved, setSolved] = useState(false)

    useEffect(() => {
        (async () => {
            await updateData(true)
            const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/challenges/${slug}`, undefined, 'GET')
            setData(res)
        })()
    }, []);

    useEffect(() => {
        if(data)
        user.solved_challenges.map(solved_challenge => {
            if(solved_challenge.id === data.id){
                setSolved(true)
            }
        })
    }, [data]);

    if(data)
    return (
        <Transition mode='fullscreen'>
            <TopSection title={data.title} nameOfPage='Challenge' children={<> <AuthorName author={data.author} /> <Difficulty difficulty={data.difficulty}/> </>} />
            <div className='wrapper submissions-page'>
            <Heading text='Your submissions' />
            <div className="submissions-page-list">
                {user.submissions.map(submission => {
                    if(submission.challenge === slug)
                        return <EditorCard author={user} type='submission' showAuthor={true} submission={submission} />
                })}
            </div><Heading text='Community submissions' />
            {solved ?

                <div className="submissions-page-list">
                        {data.submissions.map(submission => {
                            if(submission.user.user_id !== user.user_id )
                                return <EditorCard author={submission.user} showAuthor={true} type='submission' submission={submission} />
                        })}
                </div> : <Missing text='You did not solve this challenge yet!' />}


        </div>
        </Transition>
    )
}
export default SubmissionsPage