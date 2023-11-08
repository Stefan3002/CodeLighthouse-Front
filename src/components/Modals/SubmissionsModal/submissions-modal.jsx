import './submissions-modal.css'
import LighthouseSVG from "../../../utils/imgs/SVGs/LighthouseSVG.svg";
import Input from "../../Input/input";
import DifficultyPicker from "../../DifficultyPicker/difficulty-picker";
import Button from "../../Button/button";
import ErrorSVG from "../../../utils/imgs/ErrorSVG.svg";
import EditorCard from "../../EditorCard/editor-card";
import {useSelector} from "react-redux";
import {getModalContent} from "../../../utils/store/utils-store/utils-store-selectors";
const SubmissionsModal = () => {
    const data = useSelector(getModalContent)

    return (
        <div className='error-wrapper submissions-modal'>
            <div className="error-header">
                <img src={LighthouseSVG} alt=""/>
                <h2>Submissions</h2>
            </div>
            <div className="error-content submissions-content">
                {data.data.submissions.map(submission => {
                    return <EditorCard color='light' submission={submission} author={submission.user} type='submission' />
                })}
            </div>
        </div>
    )
}
export default SubmissionsModal