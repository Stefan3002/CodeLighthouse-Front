import './modal.css'
import Transition from "../../utils/js/transitions";
import ErrorSVG from '../../utils/imgs/ErrorSVG.svg'
import LighthouseSVG from '../../utils/imgs/SVGs/LighthouseSVG.svg'
import {useDispatch, useSelector} from "react-redux";
import {getModalContent, getSelectedChallenge} from "../../utils/store/utils-store/utils-store-selectors";
import Input from "../Input/input";
import Button from "../Button/button";
import useFetchHook from "../../utils/hooks/fetchHook";
import {getUser} from "../../utils/store/user-store/user-store-selectors";
import {setModalContent, setSidePanel} from "../../utils/store/utils-store/utils-store-actions";
import {useState} from "react";
import ChallengePicker from "../ChallengePicker/challenge-picker";
import {useParams} from "react-router-dom";
const Modal = ({error, type='error'}) => {
    const modalContent = useSelector(getModalContent)
    const sendRequest = useFetchHook()
    const user = useSelector(getUser)
    const dispatch = useDispatch()
    const selectedChallenge = useSelector(getSelectedChallenge)
    const joinLighthouse = () => {
        dispatch(setModalContent({
            type: 'joinLighthouse',
            data: undefined
        }))
    }
    const createLighthouse = () => {
        dispatch(setModalContent({
            type: 'createLighthouse',
            data: undefined
        }))
    }

    const enrollLighthouse = async (event) => {
        event.preventDefault()
        const code = event.target[0].value
        const lighthouseId = event.target[1].value

        const data = {
            user_id: user.user_id,
            enrollment_code: code
        }

        const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/lighthouses/${lighthouseId}`,JSON.stringify(data) , 'POST', false)
        // setData(res)

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
        const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/assignments/${modalContent.data}`,JSON.stringify(data) , 'POST', false)

    }

    const createNewLighthouse = async (event) => {
        console.log('user', user)
        event.preventDefault()
        const name = event.target[0].value
        const description = event.target[1].value

        const data = {
            name,
            description,
            'user_id': user.user_id
        }

        const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/create-lighthouses`,JSON.stringify(data) , 'POST', false)
        dispatch(setModalContent({
            type: 'success',
            data: undefined
        }))
    }

    const openStudentSelection = async () => {

        const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/lighthouses/${modalContent.data}`,undefined , 'GET', false)
        dispatch(setSidePanel({
            opened: true,
            type: 'students',
            data: res
        }))
    }

    const createNewChallenge = async (event) => {
        event.preventDefault()
        const title = event.target[0].value
        const description = event.target[1].value
        const trueFunction = event.target[2].value
        const randomFunction = event.target[3].value

        const data = {
            title, description, trueFunction, randomFunction
        }
        const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/challenges`,JSON.stringify(data) , 'POST', false)

    }

    if(type === 'error')
        return (
            // <Transition mode='fullscreen'>
            <div className='error-wrapper'>
                <div className="error-header">
                    <img src={ErrorSVG} alt=""/>
                    <h2>Error!</h2>
                </div>
                <div className="error-content">
                    <p>We <b>apologize</b>. We got something <b>wrong.</b></p>
                    <p className='error-message'>{error}</p>
                </div>
            </div>
            // </Transition>
        )
    else
        if(type === 'joinLighthouse') {
            return (
                // <Transition mode='fullscreen'>
                    <div className='error-wrapper'>
                        <div className="error-header">
                            <img src={LighthouseSVG} alt=""/>
                            <h2>Join Lighthouse!</h2>
                        </div>
                        <div className="error-content">
                            <p>Enter the <b>enrollment code</b> of the lighthouse:</p>
                            <form className='enroll-inputs' onSubmit={enrollLighthouse}>
                                <Input type='text' placeholder='Enrollment code' />
                                <Input type='text' placeholder='Id of the Lighthouse.' />
                                <Button buttonType='submit' text='Join' type='normal' />
                            </form>

                        </div>
                    </div>
                // </Transition>
            )
        }
        else
        if(type === 'menuLighthouse') {
            return (
                // <Transition mode='fullscreen'>
                <div className='error-wrapper'>
                    <div className="error-header">
                        <img src={LighthouseSVG} alt=""/>
                        <h2>Join or create a Lighthouse?</h2>
                    </div>
                    <div className="error-content">
                        <p>What's it going to be? <b>Creating</b> or <b>joining</b> a lighthouse?</p>
                        <div className="modal-buttons">
                            <Button callback={createLighthouse} buttonType='' text='Create' type='normal' />
                            <Button callback={joinLighthouse} buttonType='' text='Join' type='normal' />
                        </div>
                    </div>
                </div>
                // </Transition>
            )
        }
        else
        if(type === 'createLighthouse') {
            return (
                // <Transition mode='fullscreen'>
                <div className='error-wrapper'>
                    <div className="error-header">
                        <img src={LighthouseSVG} alt=""/>
                        <h2>Create Lighthouse!</h2>
                    </div>
                    <div className="error-content">
                        <p>Let's configure the <b>Lighthouse</b> to enlighten people!</p>
                        <form className='enroll-inputs' onSubmit={createNewLighthouse}>
                            <Input type='text' placeholder='Name.' />
                            <Input type='textarea' rows='12' cols='40' placeholder='Description.' />
                            <Button buttonType='submit' text='Create' type='normal' />
                        </form>

                    </div>
                </div>
                // </Transition>
            )
        }
        else
        if(type === 'success') {
            return (
                // <Transition mode='fullscreen'>
                <div className='error-wrapper success-wrapper'>
                    <div className="error-header">
                        <img src={LighthouseSVG} alt=""/>
                        <h2>Success!</h2>
                    </div>
                    <div className="error-content">
                        <p>The request was <b>successful</b>!</p>
                        <p>{modalContent.data}</p>
                        {/*<form className='enroll-inputs' onSubmit={enrollLighthouse}>*/}
                        {/*    <Input type='text' placeholder='Enrollment code' />*/}
                        {/*    <Input type='text' placeholder='Id of the Lighthouse.' />*/}
                        {/*    <Button buttonType='submit' text='Join' type='normal' />*/}
                        {/*</form>*/}

                    </div>
                </div>
                // </Transition>
            )
        }
        else
        if(type === 'assignChallenge') {
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
                            <ChallengePicker />
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
        else
    if(type === 'createChallenge') {
        return (
            // <Transition mode='fullscreen'>
            <div className='error-wrapper create-challenge-wrapper'>
                <div className="error-header create-challenge-header">
                    <img src={LighthouseSVG} alt=""/>
                    <h2>Create a new challenge!</h2>
                </div>
                <form onSubmit={createNewChallenge} className="error-content create-challenge-content">
                    <p>Give your challenge a <b>name.</b></p>
                    <Input type='text' placeholder='Name' />
                    <div className="create-challenge-content-top">
                        <div className="create-challenge-content-group">
                            <p>And the <b>statement.</b> Write plain <b>html</b> for this part.</p>
                            <Input type='textarea' rows='30' cols='80' placeholder='E.g: <p>This is my challenge</p>' />
                        </div>
                        <div className="create-challenge-content-group">
                            <p>Write the <b>true function</b> of the challenge. </p>
                            <Input type='textarea' rows='30' cols='80' placeholder='E.g: def true_function(inputs):
    a = inputs[0]
    b = inputs[1]
    return a * b' />
                        </div>

                    </div>
                    <div className="create-challenge-content-bottom">
                        <div className="create-challenge-content-group">
                            <p>Finally, write the <b>random function</b> that will generate the random inputs.</p>
                            <Input type='textarea' rows='30' cols='80' placeholder='E.g: def random_function():
    tests = []
    for i in range(1, 100):
        tests.append((i, i + 1))
    return tests' />
                        </div>
                    </div>

                    <Button buttonType='submit' text='Create' type='normal' />

                </form>
            </div>
            // </Transition>
        )
    }
}
export default Modal