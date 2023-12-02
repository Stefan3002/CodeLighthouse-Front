import './submissions-page.css'
import Transition from "../../utils/js/transitions";
import {useEffect, useState} from "react";
import useFetchHook from "../../utils/hooks/fetchHook";
import {useSelector} from "react-redux";
import {getUser} from "../../utils/store/user-store/user-store-selectors";
import {Editor} from "@monaco-editor/react";
import EditorCard from "../EditorCard/editor-card";
import Heading from "../Heading/heading";
import {useParams} from "react-router-dom";
import TopSection from "../TopSection/top-section";
import AuthorName from "../AuthorName/author-name";
import Difficulty from "../Difficulty/difficulty";
const SubmissionsPage = () => {
    const sendRequest = useFetchHook()
    const [data, setData] = useState(undefined)
    const user = useSelector(getUser)
    const slug = useParams().slug

    useEffect(() => {
        (async () => {
            const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/challenges/${slug}`, undefined, 'GET')
            setData(res)
        })()
    }, []);

    console.log(user, data)
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
            </div>
            {user.solved_challenges.includes(data.id) ?
                <>
                    <Heading text='Community submissions' />
                <div className="submissions-page-list">
                        {data.submissions.map(submission => {
                            if(submission.user.user_id !== user.user_id )
                                return <EditorCard author={submission.user} showAuthor={true} type='submission' submission={submission} />
                        })}
                </div>
                </>: null}


        </div>
        </Transition>
    )
}
export default SubmissionsPage