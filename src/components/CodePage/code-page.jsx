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
import ChallengeMeta from "../ChallengeMeta/challenge-meta";
import {editor} from "monaco-editor";
import Blur from "../Blur/blur";
import MaximizeSVG from '../../utils/imgs/SVGs/MaximizeSVG.svg'
import {getUser} from "../../utils/store/user-store/user-store-selectors";
const CodePage = () => {
    const user = useSelector(getUser)
    const slug = useParams()['slug']
    const sendRequest = useFetchHook()
    const lang = useSelector(getLanguage)
    const [code, setCode] = useState(undefined)
    const [data, setData] = useState(undefined)
    const dispatch = useDispatch()

    const sendCodeForCompilation = async () => {

        const data = {
            code,
            userId: user.user_id
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
            <div className='wrapper code-page-wrapper code-page'>
                <div className="code-page-text">
                    <p dangerouslySetInnerHTML={{__html: data.description}}></p>
                </div>
                {/*<div className="code-page-editor">*/}
                <div className='editor-wrapper'>
                    <div className="editor-wrapper-header">
                        <img onClick={() => {dispatch(setModal(true))
                            dispatch(setModalContent({
                                type: 'code',
                                data: {
                                    lang,
                                    code
                                }
                            }))
                        }} className='icon-svg code-editor-icon' src={MaximizeSVG} alt=""/>
                    </div>
                    <Editor onChange={(code) => setCode(code)} width='100%' height='400px' defaultLanguage={lang} />
                </div>
                    <Button callback={sendCodeForCompilation} text='Send.' />
                {/*</div>*/}
            </div>
            <ChallengeMeta data={data} />
        </Transition>
    )
}
export default CodePage