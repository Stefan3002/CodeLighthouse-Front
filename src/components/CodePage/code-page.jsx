import './code-page.css'
import {Editor} from "@monaco-editor/react";
import {useParams} from "react-router-dom";
import Transition from "../../utils/js/transitions";
import {useEffect, useState} from "react";
import useFetchHook from "../../utils/hooks/fetchHook";
import {useSelector} from "react-redux";
import {getLanguage} from "../../utils/store/utils-store/utils-store-selectors";
import LanguageSelector from "../LanguageSelector/language-selector";
const CodePage = () => {
    const slug = useParams()['slug']
    const sendRequest = useFetchHook()
    const lang = useSelector(getLanguage)
    console.log(lang)
    const [data, setData] = useState(undefined)

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
                    <p dangerouslySetInnerHTML={{__html: data[0].fields.description}}></p>
                </div>
                {/*<div className="code-page-editor">*/}
                    <Editor width='50%' height='300px' defaultLanguage={lang} />
                {/*</div>*/}
            </div>
        </Transition>
    )
}
export default CodePage