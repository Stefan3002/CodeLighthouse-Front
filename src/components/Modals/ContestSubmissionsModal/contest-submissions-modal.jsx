import './contest-submissions-modal.css'
import LighthouseSVG from "../../../utils/imgs/SVGs/LighthouseSVG.svg";
import EditorCard from "../../EditorCard/editor-card";
import {useSelector} from "react-redux";
import {getModalContent} from "../../../utils/store/utils-store/utils-store-selectors";
import {useState} from "react";

const ContestSubmissionsModal = () => {
    const modalContent = useSelector(getModalContent).data
    const [data, setData] = useState([])
    return (
        <div className='error-wrapper submissions-modal'>
            <div className="error-header">
                <img src={LighthouseSVG} alt=""/>
                <h2>Submissions</h2>
            </div>

            <div className="error-content submissions-content">
                {
                    modalContent.submissions.map((submission, idx) => {
                        if(idx % 2 === 0)
                            return <div>
                                <p>{submission.challenge}</p>
                                <EditorCard color='light' submission={submission} author={submission.user} type='submission' />
                            </div>
                    })
                }

            </div>
        </div>
    )
}
export default ContestSubmissionsModal