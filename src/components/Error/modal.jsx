import './modal.css'
import Transition from "../../utils/js/transitions";
import ErrorSVG from '../../utils/imgs/ErrorSVG.svg'
import LighthouseSVG from '../../utils/imgs/SVGs/LighthouseSVG.svg'
import {useDispatch, useSelector} from "react-redux";
import {getLanguage, getModalContent, getSelectedChallenge} from "../../utils/store/utils-store/utils-store-selectors";
import Input from "../Input/input";
import Button from "../Button/button";
import useFetchHook from "../../utils/hooks/fetchHook";
import {getUser} from "../../utils/store/user-store/user-store-selectors";
import {setModal, setModalContent, setSidePanel} from "../../utils/store/utils-store/utils-store-actions";
import {useState} from "react";
import ChallengePicker from "../ChallengePicker/challenge-picker";
import {redirect, useNavigate, useParams} from "react-router-dom";
import {Editor} from "@monaco-editor/react";
import MaximizeSVG from '../../utils/imgs/SVGs/MaximizeSVG.svg'
import {slugify} from "../../utils/js/slugify";
import DifficultyPicker from "../DifficultyPicker/difficulty-picker";
import CreateChallengeModal from "../Modals/CreateChallengeModal/create-challenge-modal";
import AssignChallengeModal from "../Modals/AssignChallengeModal/assign-challenge-modal";
const Modal = ({error, type='error'}) => {
    const [code, setCode] = useState(undefined)
    const modalContent = useSelector(getModalContent)
    const sendRequest = useFetchHook()
    const user = useSelector(getUser)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const selectedLang = useSelector(getLanguage)
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





    const createNewComment = async (event) => {
        event.preventDefault()
        const content = event.target[0].value

        const data = {
            content,
            userId: user.user_id
        }
        const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/challenges/${modalContent.data.slug}/comments`,JSON.stringify(data) , 'POST', false)

    }
    const updateChallengeSuccess = (newSlug) => {
        dispatch(setModal(false))
        navigate(`/app/challenges/${slugify(newSlug)}`)
    }
    const updateChallenge = async (event) => {
        event.preventDefault()
        const title = event.target[0].value
        const description = event.target[1].value
        const trueFunction = event.target[2].value
        const randomFunction = event.target[3].value

        const data = {
            title, description, trueFunction, randomFunction, language: selectedLang
        }
        const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/challenges/${modalContent.data.slug}`,JSON.stringify(data) , 'PUT', false, () => updateChallengeSuccess(title))

    }

    if(type === 'error')
        return (
            // <Transition mode='fullscreen'>
            <div className='error-wrapper super-error'>
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
                <div className='error-wrapper success-wrapper super-success'>
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
        if(type === 'assignChallenge')
            return <AssignChallengeModal />
        else
        if(type === 'code') {
            return (
                // <Transition mode='fullscreen'>
                <div className='editor-wrapper big-editor'>
                    <div className="editor-wrapper-header">
                        <img onClick={() => {dispatch(setModal(false))

                        }} className='icon-svg code-editor-icon' src={MaximizeSVG} alt=""/>
                    </div>
                    <Editor defaultValue={modalContent.data.code} onChange={(code) => setCode(code)} width='100%' height='100%' defaultLanguage={modalContent.data.lang} />
                </div>
                // </Transition>
            )
        }
        else
    if(type === 'createChallenge')
        return <CreateChallengeModal />
    else
    if(type === 'newComment') {
        return (
            // <Transition mode='fullscreen'>
            <div className='error-wrapper create-challenge-wrapper'>
                <div className="error-header create-challenge-header">
                    <img src={LighthouseSVG} alt=""/>
                    <h2>Add a comment!</h2>
                </div>
                <form onSubmit={createNewComment} className="error-content">
                    <p>Type in the <b>content</b> of your comment!</p>
                    <Input type='textarea' rows='30' cols='80' placeholder='I love this challenge because...' />
                    <Button buttonType='submit' text='Create' type='normal' />
                </form>
            </div>
            // </Transition>
        )
    }
    else
    if(type === 'modifyChallenge') {
        return (
            // <Transition mode='fullscreen'>
            <div className='error-wrapper create-challenge-wrapper'>
                <div className="error-header create-challenge-header">
                    <img src={LighthouseSVG} alt=""/>
                    <h2>Update your challenge!</h2>
                </div>

                <form onSubmit={updateChallenge} className="error-content create-challenge-content">
                    <p>Give your challenge a <b>new, awesome name.</b></p>
                    <Input type='text' placeholder='Name' value={modalContent.data.title}/>
                    <DifficultyPicker type='languages' />
                    <div className="create-challenge-content-top">
                        <div className="create-challenge-content-group">
                            <p>And the <b>statement.</b> Write plain <b>html</b> for this part.</p>
                            <Input value={modalContent.data.description} type='textarea' rows='30' cols='80'/>
                        </div>
                        <div className="create-challenge-content-group">
                            <p>Write the <b>true function</b> of the challenge. </p>
                            <Input value={modalContent.data.codes.filter(code => code.language === selectedLang)[0].solution} type='textarea' rows='30' cols='80'/>
                        </div>

                    </div>
                    <div className="create-challenge-content-bottom">
                        <div className="create-challenge-content-group">
                            <p>Finally, write the <b>random function</b> that will generate the random inputs.</p>
                            <Input value={modalContent.data.codes.filter(code => code.language === selectedLang)[0].random_tests} type='textarea' rows='30' cols='80'/>
                        </div>
                    </div>

                    <Button buttonType='submit' text='Update' type='normal'/>

                </form>
            </div>
        )
    }
}
export default Modal