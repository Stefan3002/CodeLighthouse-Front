import './side-panel.css'
import Input from "../Input/input";
import Button from "../Button/button";
import CapSVG from '../../utils/imgs/SVGs/CapSVG.svg'
const SidePanel = ({type}) => {
    if(type === 'students')
    return (
        <div className='side-panel'>
            <div className="side-panel-header">
                <img className='header-icon' src={CapSVG} alt=""/>
                <h2>Select students.</h2>
            </div>
            <div className="side-panel-content">
                <Input placeholder='Search student' />
                <Button text='Search' />
            </div>
        </div>
    )
}
export default SidePanel