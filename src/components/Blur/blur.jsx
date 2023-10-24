import './blur.css'
import {setError, setModal, setSidePanel} from "../../utils/store/utils-store/utils-store-actions";
import {useDispatch} from "react-redux";
const Blur = () => {
    const dispatch = useDispatch()
    const closeUpperElement = () => {
        dispatch(setError(null))
        dispatch(setModal(false))
        dispatch(setSidePanel({
            opened: false,
            type: 'undefined',
            data: undefined
        }))
    }

    return (
        <div onClick={closeUpperElement} className='blur' />
    )
}
export default Blur