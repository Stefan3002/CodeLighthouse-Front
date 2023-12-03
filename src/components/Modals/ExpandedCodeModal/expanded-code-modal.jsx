import './expanded-code-modal.css'
import {setModal} from "../../../utils/store/utils-store/utils-store-actions";
import MaximizeSVG from "../../../utils/imgs/SVGs/MaximizeSVG.svg";
import {Editor} from "@monaco-editor/react";
import {useDispatch, useSelector} from "react-redux";
import {getModalContent} from "../../../utils/store/utils-store/utils-store-selectors";
import {useState} from "react";
import EditorCard from "../../EditorCard/editor-card";
const ExpandedCodeModal = () => {
    const modalContent = useSelector(getModalContent)
    const [code, setCode] = useState(modalContent.data ? modalContent.data.code : undefined)
    const dispatch = useDispatch()


    return (
        // <Transition mode='fullscreen'>
        <div className='error-wrapper big-editor'>
            <EditorCard height='300px' value={code} type='code' />
        </div>
        // </Transition>
    )
}
export default ExpandedCodeModal