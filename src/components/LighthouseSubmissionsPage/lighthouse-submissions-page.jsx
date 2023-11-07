import './lighthouse-submissions-page.css'
import {useEffect, useState} from "react";
import useFetchHook from "../../utils/hooks/fetchHook";
import Transition from "../../utils/js/transitions";
import {useParams} from "react-router-dom";
import EditorCard from "../EditorCard/editor-card";
const LighthouseSubmissionsPage = () => {
    const sendRequest = useFetchHook()
    const [data, setData] = useState(undefined)
    const assignmentID = useParams().assignmentId

    useEffect(() => {
        (async () => {
            const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/submissions/${assignmentID}`, undefined , 'GET', false)
            setData(res)
        })()
    }, []);

    if(data)
    return (
        <Transition mode='fullscreen'>
        <div>
            {data.map(submission => {
                return <div className='submissions'>
                    <p>{submission.user.username}</p>
                    <EditorCard submission={submission} author={submission.user} type='submission' />
                </div>
            })}
        </div>
        </Transition>
    )
}
export default LighthouseSubmissionsPage