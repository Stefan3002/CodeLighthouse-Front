import './info-modal.css'
import LighthouseSVG from "../../../utils/imgs/SVGs/LighthouseSVG.svg";
import Button from "../../Button/button";
const InfoModal = () => {
    return (
        <div className='error-wrapper create-challenge-wrapper'>
            <div className="error-header create-challenge-header">
                <img src={LighthouseSVG} alt=""/>
                <h2>Are you sure?</h2>
            </div>
            {/*<form onSubmit={} className="error-content">*/}
            <p>Please <b>confirm</b> your action! </p>
            {/*</form>*/}
        </div>
    )
}
export default InfoModal