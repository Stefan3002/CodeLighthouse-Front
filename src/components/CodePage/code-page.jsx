import './code-page.css'
import {Editor} from "@monaco-editor/react";
import {useParams} from "react-router-dom";
import Transition from "../../utils/js/transitions";
import {useEffect, useState} from "react";
import useFetchHook from "../../utils/hooks/fetchHook";
import {useDispatch, useSelector} from "react-redux";
import {getLanguage} from "../../utils/store/utils-store/utils-store-selectors";
import LanguageSelector from "../LanguageSelector/language-selector";
import Button from "../Button/button";
import {setError, setModal, setModalContent} from "../../utils/store/utils-store/utils-store-actions";
const CodePage = () => {
    const slug = useParams()['slug']
    const sendRequest = useFetchHook()
    const lang = useSelector(getLanguage)
    const [code, setCode] = useState(undefined)
    const [data, setData] = useState(undefined)
    const dispatch = useDispatch()
    console.log('dataa is', data)

    const sendCodeForCompilation = async () => {

        const data = {
            code
        }
        const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/run/${slug}`,JSON.stringify(data) , 'POST', false)
        if(res.OK) {
            dispatch(setModal(true))
            dispatch(setModalContent({
                type: 'success',
                data: res.data
            }))
        }
        else
            dispatch(setError(res.data))

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
            <div className='wrapper code-page'>
                <div className="code-page-text">
                    <LanguageSelector modifiable={false} />
                    <p dangerouslySetInnerHTML={{__html: data.description}}></p>
                </div>
                {/*<div className="code-page-editor">*/}
                    <Editor onChange={(code) => setCode(code)} width='50%' height='300px' defaultLanguage={lang} />
                    <Button callback={sendCodeForCompilation} text='Send.' />
                {/*</div>*/}
            </div>
        </Transition>
    )
}
export default CodePage