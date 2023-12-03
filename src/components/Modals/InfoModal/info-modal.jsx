import './info-modal.css'
import InfoSVG from "../../../utils/imgs/SVGs/InfoDarkSVG.svg";
import Button from "../../Button/button";
import {useSelector} from "react-redux";
import {getModalContent} from "../../../utils/store/utils-store/utils-store-selectors";
const InfoModal = () => {

    const info = useSelector(getModalContent).content

    return (
        <div className='error-wrapper'>
            <div className="error-header">
                <img className='modal-header-img' src={InfoSVG} alt=""/>
                <h2>What is this?</h2>
            </div>
            <div className="error-content">
                <p>{info}</p>
            </div>
        </div>
    )
}
export default InfoModal