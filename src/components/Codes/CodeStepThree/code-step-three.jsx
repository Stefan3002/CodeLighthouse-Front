import './code-step-three.css'
import {useDispatch, useSelector} from "react-redux";
import {getUser} from "../../../utils/store/user-store/user-store-selectors";
import {useParams} from "react-router-dom";
import useFetchHook from "../../../utils/hooks/fetchHook";
import {getCode, getLanguage} from "../../../utils/store/utils-store/utils-store-selectors";
import {setLoading, setModal, setModalContent} from "../../../utils/store/utils-store/utils-store-actions";
import EditorCard from "../../EditorCard/editor-card";
import Button from "../../Button/button";
import Heading from "../../Heading/heading";
import SubmitSVG from '../../../utils/imgs/SVGs/CommitSVG.svg'
import ReturnSVG from '../../../utils/imgs/SVGs/GoBackSVG.svg'
import {useRef, useState} from "react";
const CodeStepThree = ({setCodeStep, data}) => {
    const MAXIMUM_POLLS = 10
    const user = useSelector(getUser)
    const slug = useParams()['slug']
    const sendRequest = useFetchHook()
    const lang = useSelector(getLanguage)
    const code = useSelector(getCode)
    const dispatch = useDispatch()
    const taskId = useRef()
    const intervalPolling = useRef()
    const numberOfPolls = useRef(0)
    const donePolling = useRef(true)


    const successCallback2 = (data) => {
        donePolling.current = true
        dispatch(setModal(true))
        dispatch(setModalContent({
            type: 'success',
            code: true,
            data: data.data
        }))
    }

    const successCallback = (data) => {
        donePolling.current = false
        dispatch(setLoading(true))
        clearInterval(intervalPolling.current)
        intervalPolling.current = setInterval(async () => {
            if(numberOfPolls.current > MAXIMUM_POLLS) {
                clearInterval(intervalPolling.current)
                numberOfPolls.current = 0
                donePolling.current = true
                dispatch(setLoading(false))
            }
            else {
                const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/poll/${taskId.current}`, null, 'GET', true, undefined, ['Is it done?', 'Now?', 'NOW?'])
                // If there was an error with the user code
                // sendRequest hook already caught it, but did not return here anything
                if(!res) {
                    numberOfPolls.current = MAXIMUM_POLLS
                    donePolling.current = true
                    dispatch(setLoading(false))
                }
                numberOfPolls.current += 1
                console.log('res', res, taskId, numberOfPolls.current)
                if(res && res.status){
                    successCallback2(res.data)
                    clearInterval(intervalPolling.current)
                    numberOfPolls.current = 0
                    dispatch(setLoading(false))
                }


            }
        }, 1000)

    }

    const sendCodeForCompilation = async () => {

        const reqData = {
            code,
            userId: user.user_id,
            language: lang,
            timeLimit: data.time_limit
        }
        const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/run/${slug}`,JSON.stringify(reqData) , 'POST', false, successCallback, ['The real test!', 'Get ready!', 'Aaaaaaannnnddddd...'])
        taskId.current = res.data
    }


    if(data)
        return (
            <div key='code-step-two' className='wrapper code-page-wrapper code-page code-step code-step-three'>
                {/*<div className="code-page-text">*/}
                {/*    <p dangerouslySetInnerHTML={{__html: data.description}}></p>*/}
                {/*</div>*/}
                {/*<EditorCard value={data.codes[0].hard_tests} height='300px' type='code' headerText='Hard test cases' />*/}
                <div className='code-step-three-choice'>
                    <Heading text='Ready to submit?' />
                    <img className='illustration-svg' src={SubmitSVG} alt=""/>
                    <Button disabled={!donePolling.current} color='success' callback={sendCodeForCompilation} text='Submit.' />
                </div>
                <div className='code-step-three-choice'>
                    <Heading text='Nevermind'/>
                    <img className='illustration-svg' src={ReturnSVG} alt=""/>
                    <Button callback={() => setCodeStep(1)} text='Back'/>
                </div>

            </div>
        )
}

export default CodeStepThree