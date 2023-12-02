import './code-step-two.css'
import EditorCard from "../../EditorCard/editor-card";
import Button from "../../Button/button";
import ChallengeMeta from "../../ChallengeMeta/challenge-meta";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUser} from "../../../utils/store/user-store/user-store-selectors";
import {useParams} from "react-router-dom";
import useFetchHook from "../../../utils/hooks/fetchHook";
import {getCode, getLanguage} from "../../../utils/store/utils-store/utils-store-selectors";
import {setModal, setModalContent} from "../../../utils/store/utils-store/utils-store-actions";
const CodeStepOne = ({setCodeStep, data}) => {
    const user = useSelector(getUser)
    const slug = useParams()['slug']
    const sendRequest = useFetchHook()
    const lang = useSelector(getLanguage)
    const code = useSelector(getCode)
    const dispatch = useDispatch()

    const successCallback = (data) => {
        dispatch(setModal(true))
        dispatch(setModalContent({
            type: 'success',
            data: data.data
        }))
    }


    const sendCodeForHardCompilation = async () => {

        const data = {
            code,
            userId: user.user_id,
            language: lang
        }
        const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/run-hard/${slug}`,JSON.stringify(data) , 'POST', false, successCallback)

    }
    console.log(data)
    if(data)
    return (
        <div key='code-step-two' className='wrapper code-page-wrapper code-page code-step code-step-one'>
            <div className="code-page-text">
                <p dangerouslySetInnerHTML={{__html: data.description}}></p>
            </div>
            <EditorCard value={data.codes[0].hard_tests} height='300px' type='code' headerText='Hard test cases' />
            <Button callback={sendCodeForHardCompilation} text='Send.' />
            <Button callback={() => setCodeStep(1)} text='Back' />
            <Button callback={() => setCodeStep(3)} text='Next' />
        </div>
    )
}
export default CodeStepOne