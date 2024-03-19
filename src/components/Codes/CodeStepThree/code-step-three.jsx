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
import usePollHook from "../../../utils/hooks/pollHook";
const CodeStepThree = ({setCodeStep, data}) => {
    const MAXIMUM_POLLS = 10
    const user = useSelector(getUser)
    const slug = useParams()['slug']
    const sendRequest = useFetchHook()
    const pollRequest = usePollHook()
    const lang = useSelector(getLanguage)
    const code = useSelector(getCode)
    const donePolling = useRef(true)




    const sendCodeForCompilation = async () => {

        const reqData = {
            code,
            userId: user.user_id,
            language: lang,
            timeLimit: data.time_limit
        }
        const reqUrl = `${process.env.REACT_APP_SERVER_URL}/run/${slug}`
        await pollRequest(reqData, reqUrl)

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
                    <Button ariaLabel='Submit your solution' disabled={!donePolling.current} color='success' callback={sendCodeForCompilation} text='Submit.' />
                </div>
                <div className='code-step-three-choice'>
                    <Heading text='Nevermind'/>
                    <img className='illustration-svg' src={ReturnSVG} alt=""/>
                    <Button ariaLabel='Go back' callback={() => setCodeStep(1)} text='Back'/>
                </div>

            </div>
        )
}

export default CodeStepThree