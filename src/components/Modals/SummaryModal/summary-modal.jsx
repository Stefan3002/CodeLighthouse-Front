import './summary-modal.css'
import LighthouseSVG from "../../../utils/imgs/SVGs/LighthouseSVG.svg";
import Input from "../../Input/input";
import SelectedFiles from "../../SelectedFiles/selected-files";
import Button from "../../Button/button";
import {setModal, setModalContent} from "../../../utils/store/utils-store/utils-store-actions";
import {useDispatch, useSelector} from "react-redux";
import {getModalContent} from "../../../utils/store/utils-store/utils-store-selectors";
import changeUserEmailValidations from "../../../utils/validation/changeUserEmailValidations.json";
import useValidate from "../../../utils/hooks/validateHook";
import useFetchHook from "../../../utils/hooks/fetchHook";
const SummaryModal = () => {
    const data = useSelector(getModalContent)
    const dispatch = useDispatch()

    return (
        <div className='error-wrapper'>
            <div className="error-header">
                {/*<img onClick={backOneStep} className='icon-svg' src={BackSVG} alt="Back"/>*/}
                <img src={LighthouseSVG} alt=""/>
                <h2>How did the participant perform?</h2>
            </div>
            <div className="error-content create-lighthouse-content">
                <p><b>{data.content}</b> <br /> has solved {Object.keys(data.summary).length} challenges</p>
                <div className="summary-cards">
                    {data.summary && Object.keys(data.summary).map(challengeSlug => {
                        return <div className='summary-card'>
                            <p>{challengeSlug}</p>
                            <p>{data.summary[challengeSlug] * 1000} ms</p>
                        </div>
                    })}
                </div>
            </div>
        </div>
    )
}
export default SummaryModal