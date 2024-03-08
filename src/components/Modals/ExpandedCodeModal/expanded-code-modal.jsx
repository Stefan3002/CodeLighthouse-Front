import './expanded-code-modal.css'
import {setModal} from "../../../utils/store/utils-store/utils-store-actions";
import MaximizeSVG from "../../../utils/imgs/SVGs/MaximizeSVG.svg";
import {Editor} from "@monaco-editor/react";
import {useDispatch, useSelector} from "react-redux";
import {getCode, getModalContent} from "../../../utils/store/utils-store/utils-store-selectors";
import {useState} from "react";
import EditorCard from "../../EditorCard/editor-card";
import Transition from "../../../utils/js/transitions";
import LighthouseSVG from "../../../utils/imgs/SVGs/LighthouseSVG.svg";
import CodeOfConduct from "../../CodeOfConduct/code-of-conduct";
import Input from "../../Input/input";
import Button from "../../Button/button";
const ExpandedCodeModal = () => {
    const modalContent = useSelector(getModalContent)
    const dispatch = useDispatch()
    const code = useSelector(getCode)


    return (
        // <Transition mode='fullscreen'>
        <div className='error-wrapper big-editor'>
            <div className='error-header'>
                <img src={LighthouseSVG} alt=""/>
                <h2>Let's code</h2>
            </div>
            <div className="error-content">
                <EditorCard showExpand={false} value={code} type='code' />
            </div>
         </div>
        // </Transition>
        // <div className='error-wrapper report-description-modal'>
        //     <div className="error-header">
        //         {/*<img onClick={backOneStep} className='icon-svg' src={BackSVG} alt="Back"/>*/}
        //         <img src={LighthouseSVG} alt=""/>
        //         <h2>Ask Llama</h2>
        //     </div>
        //     <div className="error-content report-description-content">
        //         {/*<h2>Hey there!</h2>*/}
        //         <p>Ask <strong>Llama</strong> for some help down below.</p>
        //
        //         <CodeOfConduct type='chat-bot'/>
        //         {/*<p><strong>{challenge.title}</strong> by </p>*/}
        //         {/*<AuthorName author={challenge.author}/>*/}
        //         {/*<Input type='text' placeholder='Reason for sending back / denying.' />*/}
        //         {/*<form className='report-description-form' onSubmit={talkToBot}>*/}
        //         {/*    <Input placeholder='Question for Llama' required={true}/>*/}
        //         {/*    <p id='chat-bot-response'></p>*/}
        //         {/*    <h2>Coming soon!</h2>*/}
        //             {/*<Input type='checkbox' placeholder='I have read the Code of Conduct' required={true}/>*/}
        //             {/*<div className="admin-verdict-buttons">*/}
        //             {/*    <Button buttonType='submit' text='Ask' color='light'/>*/}
        //             {/*    <Button buttonType='reset' callback={cancelChat} text='Cancel' color='light'/>*/}
        //             {/*</div>*/}
        //         {/*</form>*/}
        //     </div>
        // </div>
    )
}
export default ExpandedCodeModal