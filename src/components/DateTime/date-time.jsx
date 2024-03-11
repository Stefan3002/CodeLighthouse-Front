import './date-time.css'
import clockSVG from "../../utils/imgs/SVGs/ClockSVG.svg";
const DateTime = ({icon, data, color = 'dark'}) => {
    return (
        <div className="date-time">
            <img className='icon-svg' src={icon} alt=""/>
            <p className='date-time-container' style={{color: `${color === 'light' ? '#FEE1C7' : '#32292F'}`}}>{data}</p>
        </div>
    )
}
export default DateTime