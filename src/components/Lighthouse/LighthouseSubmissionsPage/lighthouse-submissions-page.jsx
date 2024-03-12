import './lighthouse-submissions-page.css'
import {useEffect, useState} from "react";
import useFetchHook from "../../../utils/hooks/fetchHook";
import Transition from "../../../utils/js/transitions";
import {useParams} from "react-router-dom";
import EditorCard from "../../EditorCard/editor-card";
import {useDispatch, useSelector} from "react-redux";
import {setModal, setModalContent} from "../../../utils/store/utils-store/utils-store-actions";
import Form from "../../Form/form";
import Button from "../../Button/button";
import Input from "../../Input/input";
import gradeValidations from "../../../utils/validation/gradeValidations.json";
import useValidate from "../../../utils/hooks/validateHook";
import useUpdateData from "../../../utils/hooks/updateDataHook";
import Assignment from "../../Assignment/assignment";
import {getUser} from "../../../utils/store/user-store/user-store-selectors";
const LighthouseSubmissionsPage = () => {
    const sendRequest = useFetchHook()
    const [data, setData] = useState(undefined)
    const [dataAssignment, setDataAssignment] = useState(undefined)
    const assignmentID = useParams().assignmentId
    const dispatch = useDispatch()
    const validateInput = useValidate()
    const updateData = useUpdateData(`${process.env.REACT_APP_SERVER_URL}/submissions/${assignmentID}`)
    const lighthouseId = useParams().id
    const user = useSelector(getUser)

    useEffect(() => {
        (async () => {
            console.log('ss', dataAssignment)
            if(dataAssignment && user.id === dataAssignment.lighthouse.author) {
                const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/submissions/${assignmentID}`, undefined, 'GET', false)
                setData(res)
            }
        })()
    }, [dataAssignment]);

    useEffect(() => {
        (async () => {
            const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/assignments/${assignmentID}`, undefined , 'GET', false)
            setDataAssignment(res)
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

    const successCallback = async () => {
        dispatch(setModal(true))
        dispatch(setModalContent({
            type: 'success',
            content: 'Submission graded!'
        }))
        setData(await updateData())
    }

    const sendGrade = async (event) => {
        const grade = event.target[0].value
        const authorID = event.target[1].value
        let valid = true
        valid = validateInput("Grade", +grade, {inputNull: gradeValidations.grade.inputNull, inputMin: gradeValidations.grade.inputMin, inputMax: gradeValidations.grade.inputMax})
        if(!valid)
            return

        const dataFetch = {
            grade,
            authorID
        }
        const res = sendRequest(`${process.env.REACT_APP_SERVER_URL}/grade-submissions/${assignmentID}`,JSON.stringify(dataFetch) , 'POST', false, successCallback)

    }

    if(dataAssignment) {
        return (
            <Transition mode='fullscreen'>
                <div className='wrapper submissions-assignment-page'>

                    <Assignment assignment={dataAssignment} />

                    <div className="assignment-submissions">
                        {data && Object.keys(data).map(username => {
                            return <div className='submission'>
                                <EditorCard seeAllSubmissions={() => seeAllSubmissions(username)} assignmentSubmission={true} submission={data[username][0]} author={data[username][0].user} type='submission' />
                                <div className="submission-footer">
                                    <p>Grade: {data[username][1] ? <strong>{data[username][1]}</strong> : '-'}</p>
                                    <Form className='grade-wrapper' onSubmit={sendGrade}>
                                        <Input step='1' type="number"/>
                                        <input type="text" style={{display: 'none'}} value={data[username][0].user.id} disabled/>
                                        <Button color='light' text='Grade' />
                                    </Form>
                                </div>
                            </div>
                        })}
                    </div>
                </div>
            </Transition>
        )
    }
}
export default LighthouseSubmissionsPage