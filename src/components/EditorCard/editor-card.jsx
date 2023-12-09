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
import InfoSVG from '../../utils/imgs/SVGs/InfoSVG.svg'
const EditorCard = ({info = undefined, secondCode = undefined, headerText = '', height = '300px', value = 'No code was given for this language!', onChangeHandler = undefined, seeAllSubmissions = undefined,showAuthor = true , assignmentSubmission = false, color = 'dark', type = 'code', author, submission = null}) => {
    const dispatch = useDispatch()
    const lang = useSelector(getLanguage)
    const code = useSelector(getCode)
    // const [code, setCode] = useState(undefined)

    const openInfoModal = () => {
        dispatch(setModal(true))
        dispatch(setModalContent({
            type: 'info',
            content: info
        }))
    }

    if(type === 'challenge-code')
        return (
            <div className='editor-wrapper' style={{height: height}}>
                <Editor value={value} onChange={code => onChangeHandler(code)} defaultLanguage={lang} />
            </div>
        )
    else
    if(type === 'code')
        return (
            <div className='editor-wrapper editor-wrapper-code' style={{height: height}}>
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
                    <p className='code-editor-header-text'>{headerText}</p>
                    {info ? <img className='icon-svg' src={InfoSVG} onClick={openInfoModal} alt='Info'></img> : null}
                </div>
                <Editor value={value} onChange={
                    (code) => {
                        if(!secondCode)
                            dispatch(setCode(code))
                        if(secondCode)
                            secondCode(code)
                    }
                } defaultLanguage={lang.toLowerCase()} />
            </div>
        )
    else
        if(type === 'submission')
            return (
                <div className='editor-wrapper editor-wrapper-submission' >
                    <div style={{background: color === 'light' ? '#FEE1C7' : null}} className="editor-wrapper-header submission-editor-header">
                        {showAuthor ?
                            <AuthorName color={color === 'light' ? 'dark' : 'light'} author={author} />
                         : null}
                        {assignmentSubmission ?
                        <div className='submission-header'>
                            {/*<AuthorName color={color === 'light' ? 'dark' : 'light'} author={author} />*/}
                            <p onClick={seeAllSubmissions}>See all</p>
                        </div>
                            : null }
                        <LanguageSelector customLanguage={submission.language} type='simple-icon' />
                        <p style={{color: `${color === 'dark' ? '#FEE1C7' : '#32292F'}`}}>{(submission.exec_time * 1000).toString().slice(0, 6)} ms</p>
                        <DateTime icon={CalendarSVG} color={color === 'light' ? 'dark' : 'light'} data={submission.date} />
                        <DateTime icon={ClockSVG} color={color === 'light' ? 'dark' : 'light'} data={submission.time.slice(0, 5)} />
                    </div>
                    <Editor value={submission.code} onChange={(code) => dispatch(setCode(code))} defaultLanguage={lang} />
                </div>
            )
}

export default EditorCard