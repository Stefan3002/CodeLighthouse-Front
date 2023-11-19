import './pop-up-modal.css'
import LighthouseSVG from "../../../utils/imgs/SVGs/LighthouseSVG.svg";
import EditorCard from "../../EditorCard/editor-card";
import {useDispatch, useSelector} from "react-redux";
import {getModalContent} from "../../../utils/store/utils-store/utils-store-selectors";
import Transition from "../../../utils/js/transitions";
import {useEffect} from "react";
import {setModal} from "../../../utils/store/utils-store/utils-store-actions";
import {AnimatePresence} from "framer-motion";
const PopUpModal = () => {
    const data = useSelector(getModalContent)
    const dispatch = useDispatch()

    useEffect(() => {
        setTimeout(() => {
            dispatch(setModal(false))
        }, 2000)
    }, []);

    return (
        <Transition mode='pop-up'>
            <div key='pop-up' className='pop-up-modal'>
                <p>{data.data}</p>
            </div>
        </Transition>

    )
}
export default PopUpModal