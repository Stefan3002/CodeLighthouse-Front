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

    )
}
export default ExpandedCodeModal