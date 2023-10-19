import './blur.css'
import {setError, setModal} from "../../utils/store/utils-store/utils-store-actions";
import {useDispatch} from "react-redux";
const Blur = ({error = false, modal = false}) => {
    const dispatch = useDispatch()
    const closeUpperElement = () => {
        if(error)
            dispatch(setError(null))
        else
            if(modal)
                dispatch(setModal(false))
    }

    return (
        <div onClick={closeUpperElement} className='blur' />
    )
}
export default Blur