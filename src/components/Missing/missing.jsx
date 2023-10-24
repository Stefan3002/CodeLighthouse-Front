import './missing.css'
import MissingSVG from "../../utils/imgs/SVGs/LighthouseIllustrationSVG.svg";
const Missing = ({text}) => {
    return (
        <div className='missing-wrapper'>
            <img className='missing-svg' src={MissingSVG} alt=""/>
            <h2>{text}</h2>
        </div>
    )
}
export default Missing