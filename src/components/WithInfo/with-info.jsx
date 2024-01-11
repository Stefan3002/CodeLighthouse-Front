import './with-info.css'
import {useDispatch} from "react-redux";
import {useState} from "react";
import Tooltip from "../Modals/Tooltip/tooltip";
import {AnimatePresence} from "framer-motion";
import Transition from "../../utils/js/transitions";
const WithInfo = ({children, data, clickHandler}) => {
    const [opened, setOpened] = useState(false)
    const showTooltip = () => {
        setOpened(true)
    }
    const hideTooltip = () => {
        setOpened(false)
    }

    return (
        <>
            <AnimatePresence>
                {opened && <Transition mode='modal'><Tooltip data={data} /></Transition>}
            </AnimatePresence>
            <div onClick={() => clickHandler()} className='with-info' onMouseEnter={showTooltip} onMouseOut={hideTooltip}>
                {children}
            </div>
        </>

    )
}
export default WithInfo