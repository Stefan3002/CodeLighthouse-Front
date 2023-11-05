import './submissions-page.css'
import Transition from "../../utils/js/transitions";
import {useEffect, useState} from "react";
import useFetchHook from "../../utils/hooks/fetchHook";
import {useSelector} from "react-redux";
import {getUser} from "../../utils/store/user-store/user-store-selectors";
import {Editor} from "@monaco-editor/react";
import EditorCard from "../EditorCard/editor-card";
const SubmissionsPage = () => {
    const sendRequest = useFetchHook()
    const [data, setData] = useState(undefined)
    const user = useSelector(getUser)

    // useEffect(() => {
    //     (async () => {
    //         const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/challenges/0/10`, undefined, 'GET')
    //         setData(res)
    //     })()
    // }, []);

    return (
        <Transition mode='fullscreen'>
        <div className='wrapper submissions-page'>
            {user.submissions.map(submission => {
                if(submission.user.user_id === user.user_id)
                    return <EditorCard author={user} type='submission' submission={user.submissions[0]} />

            })}
        </div>
        </Transition>
    )
}
export default SubmissionsPage