import './tooltip.css'
import InfoSVG from '../../../utils/imgs/SVGs/InfoSVG.svg'
const Tooltip = ({data}) => {
    return (
        <>
            <div className='tooltip'>
                <img src={InfoSVG} className='icon-svg' alt=""/>
                <p>{data}</p>
            </div>
        </>

    )
}
export default Tooltip