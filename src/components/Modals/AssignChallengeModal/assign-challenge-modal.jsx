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
const AssignChallengeModal = () => {
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
        const dueDate = event.target[0].value
        const dueTime = event.target[1].value
        const data = {
            selectedChallenge,
            dueDate,
            dueTime,
            users: [...modalContent.selectedPeople, user.user_id]
        }
        const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/assignments/${modalContent.data}`,JSON.stringify(data) , 'POST', false, successCallback)

    }

    const openStudentSelection = async () => {

        const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/lighthouses/${modalContent.data}`,undefined , 'GET', false)
        dispatch(setSidePanel({
            opened: true,
            type: 'students',
            data: res
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
                    <Button callback={openStudentSelection} text='Select' />
                    <p>{modalContent.selectedPeople ? modalContent.selectedPeople.length : 'No'} students selected.</p>
                    <p><b>Due?</b> Select a date and a time!</p>
                    <form className='assignment-inputs' onSubmit={assignLighthouseChallenge}>
                        <div className='assignment-inputs-due'>
                            <Input type='date'/>
                            <Input type='time'/>
                        </div>
                        <Button buttonType='submit' text='Create' type='normal' />
                    </form>
                </div>

            </div>
        </div>
        // </Transition>
    )
}
export default AssignChallengeModal