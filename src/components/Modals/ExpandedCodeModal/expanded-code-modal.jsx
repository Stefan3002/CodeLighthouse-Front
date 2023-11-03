import './expanded-code-modal.css'
import {setModal} from "../../../utils/store/utils-store/utils-store-actions";
import MaximizeSVG from "../../../utils/imgs/SVGs/MaximizeSVG.svg";
import {Editor} from "@monaco-editor/react";
import {useDispatch, useSelector} from "react-redux";
import {getModalContent} from "../../../utils/store/utils-store/utils-store-selectors";
import {useState} from "react";
const ExpandedCodeModal = () => {
    const modalContent = useSelector(getModalContent)
    const [code, setCode] = useState(modalContent.data ? modalContent.data.code : undefined)
    const dispatch = useDispatch()


    return (
        // <Transition mode='fullscreen'>
        <div className='editor-wrapper big-editor'>
            <div className="editor-wrapper-header">
                <img onClick={() => {dispatch(setModal(false))

                }} className='icon-svg code-editor-icon' src={MaximizeSVG} alt=""/>
            </div>
            <Editor defaultValue={code} onChange={(code) => setCode(code)} width='100%' height='100%' defaultLanguage={modalContent.data.lang} />
        </div>
        // </Transition>
    )
}
export default ExpandedCodeModal