import './spinner.css'
import SpinnerSVG from '../../utils/imgs/SpinnerSVG.svg'
const Spinner = () => {
    return (
        <div className='spinner-container'>
            <img src={SpinnerSVG} alt=""/>
        </div>
    )
}
export default Spinner