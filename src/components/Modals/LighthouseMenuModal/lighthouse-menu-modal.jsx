import './lighthouse-menu-modal.css'
import LighthouseSVG from "../../../utils/imgs/SVGs/LighthouseSVG.svg";
import Button from "../../Button/button";
import {setModalContent} from "../../../utils/store/utils-store/utils-store-actions";
import {useDispatch, useSelector} from "react-redux";
const LighthouseMenuModal = () => {
    const dispatch = useDispatch()

    const joinLighthouse = () => {
        dispatch(setModalContent({
            type: 'joinLighthouse',
            data: undefined
        }))
    }
    const createLighthouse = () => {
        dispatch(setModalContent({
            type: 'createLighthouse',
            data: undefined
        }))
    }


    return (
        // <Transition mode='fullscreen'>
        <div className='error-wrapper'>
            <div className="error-header">
                <img className='modal-header-img' src={LighthouseSVG} alt=""/>
                <h2>Join or create a Lighthouse?</h2>
            </div>
            <div className="error-content">
                <p>What's it going to be? <b>Creating</b> or <b>joining</b> a lighthouse?</p>
                <div className="modal-buttons">
                    <Button color='light' callback={createLighthouse} buttonType='' text='Create' type='normal' />
                    <Button color='light' callback={joinLighthouse} buttonType='' text='Join' type='normal' />
                </div>
            </div>
        </div>
        // </Transition>
    )
}
export default LighthouseMenuModal