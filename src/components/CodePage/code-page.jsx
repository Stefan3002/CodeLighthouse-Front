import './code-page.css'
import {useParams} from "react-router-dom";
import Transition from "../../utils/js/transitions";
import {useEffect, useState} from "react";
import useFetchHook from "../../utils/hooks/fetchHook";
import {useDispatch, useSelector} from "react-redux";
import {getCode, getLanguage} from "../../utils/store/utils-store/utils-store-selectors";
import Button from "../Button/button";
import {setModal, setModalContent} from "../../utils/store/utils-store/utils-store-actions";
import ChallengeMeta from "../ChallengeMeta/challenge-meta";
import {getUser} from "../../utils/store/user-store/user-store-selectors";
import EditorCard from "../EditorCard/editor-card";
const CodePage = () => {
    const user = useSelector(getUser)
    const slug = useParams()['slug']
    const sendRequest = useFetchHook()
    const lang = useSelector(getLanguage)
    const code = useSelector(getCode)
    const [data, setData] = useState(undefined)
    const dispatch = useDispatch()

    const successCallback = (data) => {
        dispatch(setModal(true))
        dispatch(setModalContent({
            type: 'success',
            data: data.data
        }))
    }

    const sendCodeForCompilation = async () => {

        const data = {
            code,
            userId: user.user_id,
            language: lang
        }
        const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/run/${slug}`,JSON.stringify(data) , 'POST', false, successCallback)
        // if(res.OK) {
        //     dispatch(setModal(true))
        //     dispatch(setModalContent({
        //         type: 'success',
        //         data: res.data
        //     }))
        // }
        // else
        //     dispatch(setError(res.data))

    }


    useEffect(() => {
        (async () => {
            const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/challenges/${slug}`, undefined, 'GET', true)
            setData(res)
        })()
    }, []);
    if(data)
    return (
        <Transition mode='fullscreen'>
            <div className='wrapper code-page-wrapper code-page'>
                <div className="code-page-text">
                    <p dangerouslySetInnerHTML={{__html: data.description}}></p>
                </div>
                {/*<div className="code-page-editor">*/}
                <EditorCard height='300px' type='code' />
                    <Button callback={sendCodeForCompilation} text='Send.' />
                {/*</div>*/}
            </div>
            <ChallengeMeta data={data} />
        </Transition>
    )
}
export default CodePage