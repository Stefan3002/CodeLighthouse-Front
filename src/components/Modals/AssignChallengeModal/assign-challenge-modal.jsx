import './assign-challenge-modal.css'
import LighthouseSVG from "../../../utils/imgs/SVGs/LighthouseSVG.svg";
import ChallengePicker from "../../ChallengePicker/challenge-picker";
import Button from "../../Button/button";
import Input from "../../Input/input";
import {useDispatch, useSelector} from "react-redux";
import {getModalContent, getSelectedChallenge} from "../../../utils/store/utils-store/utils-store-selectors";
import {getUser} from "../../../utils/store/user-store/user-store-selectors";
import useFetchHook from "../../../utils/hooks/fetchHook";
import {setModal, setSidePanel} from "../../../utils/store/utils-store/utils-store-actions";
import useUpdateData from "../../../utils/hooks/updateDataHook";
import useValidate from "../../../utils/hooks/validateHook";
import createAssignmentValidation from "../../../utils/validation/createAssignmentValidations.json";
import Form from "../../Form/form";
const AssignChallengeModal = () => {
    const validateInput = useValidate()
    const selectedChallenge = useSelector(getSelectedChallenge)
    const modalContent = useSelector(getModalContent)
    const user = useSelector(getUser)
    const sendRequest = useFetchHook()
    const dispatch = useDispatch()
    const updateUserData = useUpdateData()

    const successCallback = async () => {
        await updateUserData()
        dispatch(setModal(false))
        dispatch(setSidePanel(false))
    }


    const assignLighthouseChallenge = async (event) => {
        event.preventDefault()
        let valid = true
        const title = event.target[0].value
        const description = event.target[1].value
        const dueDate = event.target[2].value
        const dueTime = event.target[3].value

        valid = validateInput('Title', title, {inputNull: createAssignmentValidation.title.inputNull, inputMin: createAssignmentValidation.title.inputMin, inputMax: createAssignmentValidation.title.inputMax})
        if(!valid)
            return

        valid = validateInput('Details', description, {inputNull: createAssignmentValidation.description.inputNull, inputMin: createAssignmentValidation.description.inputMin})
        if(!valid)
            return

        valid = validateInput('Due date', dueDate, {inputNull: createAssignmentValidation.dueDate.inputNull})
        if(!valid)
            return

        valid = validateInput('Due time', dueTime, {inputNull: createAssignmentValidation.dueTime.inputNull})
        if(!valid)
            return

        valid = validateInput('Selected challenge', selectedChallenge, {inputNull: false})
        if(!valid)
            return

        valid = validateInput('Selected students', modalContent.selectedPeople, {inputNull: false})
        if(!valid)
            return

        const data = {
            selectedChallenge,
            dueDate,
            dueTime,
            description,
            title,
            users: [...modalContent.selectedPeople, user.user_id]
        }


        const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/assignments/${modalContent.data.id}`,JSON.stringify(data) , 'POST', false, successCallback)

    }

    const openStudentSelection = async () => {

        // const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/lighthouses/${modalContent.data}`,undefined , 'GET', true)
        dispatch(setSidePanel({
            opened: true,
            type: 'students',
            data: modalContent.data.people
        }))
    }


    return (
        // <Transition mode='fullscreen'>
        <div className='error-wrapper'>
            <div className="error-header">
                <img src={LighthouseSVG} alt=""/>
                <h2>Create a new assignment!</h2>
            </div>
            <div className="error-content">
                <p>Select the <b>challenge</b> to enlighten your students:</p>
                <div className='enroll-inputs'>
                    <ChallengePicker authorColor='dark' />
                    <p>Not for everyone? <b>Select</b> the students you want!</p>
                    <Button ariaLabel='Select students' color='light' callback={openStudentSelection} text='Select' />
                    <p>{modalContent.selectedPeople && modalContent.selectedPeople.length ? modalContent.selectedPeople.length : 'No'} students selected.</p>

                    <Form className='assignment-inputs' onSubmit={assignLighthouseChallenge}>

                        <p><b>Title</b> of the assignment!</p>
                        <Input placeholder='The first assignment'/>

                        <p><b>Details?</b> They go here!</p>
                        <Input type='textarea' rows='20' cols='60' placeholder='<h2>Exam date</h2>'/>
                        <p><b>Due?</b> Select a date and a time!</p>
                        <div className='assignment-inputs-due'>
                            <Input type='date'/>
                            <Input type='time'/>
                        </div>
                        <Button ariaLabel='Create assignment' color='light' marginated={true} buttonType='submit'
                                text='Create' type='normal'/>
                    </Form>
                </div>

            </div>
        </div>
        // </Transition>
    )
}
export default AssignChallengeModal