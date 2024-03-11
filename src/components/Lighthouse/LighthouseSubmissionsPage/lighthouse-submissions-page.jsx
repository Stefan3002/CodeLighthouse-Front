import './lighthouse-submissions-page.css'
import {useEffect, useState} from "react";
import useFetchHook from "../../../utils/hooks/fetchHook";
import Transition from "../../../utils/js/transitions";
import {useParams} from "react-router-dom";
import EditorCard from "../../EditorCard/editor-card";
import {useDispatch} from "react-redux";
import {setModal, setModalContent} from "../../../utils/store/utils-store/utils-store-actions";
import Form from "../../Form/form";
import Button from "../../Button/button";
import Input from "../../Input/input";
const LighthouseSubmissionsPage = () => {
    const sendRequest = useFetchHook()
    const [data, setData] = useState(undefined)
    const assignmentID = useParams().assignmentId
    const dispatch = useDispatch()

    useEffect(() => {
        (async () => {
            const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/submissions/${assignmentID}`, undefined , 'GET', false)
            setData(res)
        })()
    }, []);


    const seeAllSubmissions = (username) => {
        dispatch(setModal(true))
        dispatch(setModalContent({
            type: 'submissions',
            data: {
                username,
                submissions: data[username]
            }
        }))
    }

    const sendGrade = (event) => {
        const grade = event.target[0].value
    }

    if(data) {
        const usernames = Object.keys(data)
        return (
            <Transition mode='fullscreen'>
                <div className='wrapper submissions-assignment-page'>
                    {usernames.map(username => {
                        return <div className='submission'>
                            {data[username].map((submission, idx) => {
                                if(idx < 1)
                                    return <EditorCard seeAllSubmissions={() => seeAllSubmissions(username)} assignmentSubmission={true} submission={submission} author={submission.user} type='submission' />
                            })}
                            <div className="submission-footer">
                                <Form className='grade-wrapper' onSubmit={sendGrade}>
                                    <Input step='1' type="number"/>
                                    <Button color='light' text='Grade' />
                                </Form>
                            </div>
                        </div>
                    })}
                </div>
            </Transition>
        )
    }
}
export default LighthouseSubmissionsPage