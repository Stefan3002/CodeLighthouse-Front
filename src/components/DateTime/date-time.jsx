import './date-time.css'
import clockSVG from "../../utils/imgs/SVGs/ClockSVG.svg";
const DateTime = ({icon, data, color = 'dark'}) => {
    return (
        <div className="assignment-meta">
            <img className='icon-svg' src={icon} alt=""/>
            <p style={{color: `${color === 'light' ? '#FEE1C7' : null}`}}>{data}</p>
        </div>
    )
}
export default DateTime