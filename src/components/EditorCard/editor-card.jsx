import './editor-card.css'
import {setCode, setModal, setModalContent} from "../../utils/store/utils-store/utils-store-actions";
import MaximizeSVG from "../../utils/imgs/SVGs/MaximizeSVG.svg";
import {Editor} from "@monaco-editor/react";
import {useDispatch, useSelector} from "react-redux";
import {getCode, getLanguage} from "../../utils/store/utils-store/utils-store-selectors";
import {useState} from "react";
import AuthorName from "../AuthorName/author-name";
import DateTime from "../DateTime/date-time";
import ClockSVG from '../../utils/imgs/SVGs/ClockSVG.svg'
import CalendarSVG from '../../utils/imgs/SVGs/CalendarSVG.svg'
import LanguageSelector from "../LanguageSelector/language-selector";
const EditorCard = ({seeAllSubmissions = undefined,showAuthor = true , assignmentSubmission = false, color = 'dark', type = 'code', author, submission = null}) => {
    const dispatch = useDispatch()
    const lang = useSelector(getLanguage)
    const code = useSelector(getCode)
    // const [code, setCode] = useState(undefined)


    if(type === 'code')
        return (
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
                <Editor onChange={(code) => dispatch(setCode(code))} width='100%' height='400px' defaultLanguage={lang} />
            </div>
        )
    else
        if(type === 'submission')
            return (
                <div className='editor-wrapper'>
                    <div style={{background: color === 'light' ? '#FEE1C7' : null}} className="editor-wrapper-header submission-editor-header">
                        {showAuthor ?
                            <AuthorName color={color === 'light' ? 'dark' : 'light'} author={author} />
                         : null}
                        {assignmentSubmission ?
                        <div className='submission-header'>
                            <AuthorName color={color === 'light' ? 'dark' : 'light'} author={author} />
                            <p onClick={seeAllSubmissions}>See all</p>
                        </div>
                            : null }
                        <LanguageSelector customLanguage={submission.language} type='simple-icon' />
                        <DateTime icon={CalendarSVG} color={color === 'light' ? 'dark' : 'light'} data={submission.date} />
                        <DateTime icon={ClockSVG} color={color === 'light' ? 'dark' : 'light'} data={submission.time} />
                    </div>
                    <Editor value={submission.code} onChange={(code) => dispatch(setCode(code))} width='100%' height='70%' defaultLanguage={lang} />
                </div>
            )
}

export default EditorCard