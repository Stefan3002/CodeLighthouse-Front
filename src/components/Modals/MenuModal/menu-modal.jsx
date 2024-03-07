import './menu-modal.css'
import LighthouseSVG from "../../../utils/imgs/SVGs/LighthouseSVG.svg";
import Button from "../../Button/button";
import {setModalContent} from "../../../utils/store/utils-store/utils-store-actions";
import {useDispatch, useSelector} from "react-redux";
import {getModalContent} from "../../../utils/store/utils-store/utils-store-selectors";
const MenuModal = () => {
    const dispatch = useDispatch()
    const modalContent = useSelector(getModalContent).content

    const button1Action = () => {
        dispatch(setModalContent({
            type: modalContent.button1,
            data: undefined,
            oldContent: modalContent
        }))
    }
    const button2Action = () => {
        dispatch(setModalContent({
            type: modalContent.button2,
            data: undefined,
            oldContent: modalContent
        }))
    }


    return (
        // <Transition mode='fullscreen'>
        <div className='error-wrapper'>
            <div className="error-header">
                <img className='modal-header-img' src={LighthouseSVG} alt=""/>
                <h2>Menu</h2>
            </div>
            <div className="error-content">
                <p>What's it going to be? <b>{modalContent.button1Name}</b> or <b>{modalContent.button2Name}</b>?</p>
                <div className="modal-buttons">
                    <Button color='light' callback={button1Action} buttonType='' text={modalContent.button1Name} type='normal' />
                    <Button color='light' callback={button2Action} buttonType='' text={modalContent.button2Name} type='normal' />
                </div>
            </div>
        </div>
        // </Transition>
    )
}
export default MenuModal