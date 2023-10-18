import './blur.css'
import {setError} from "../../utils/store/utils-store/utils-store-actions";
import {useDispatch} from "react-redux";
const Blur = ({error}) => {
    const dispatch = useDispatch()
    const closeUpperElement = () => {
        if(error)
            dispatch(setError(null))
    }

    return (
        <div onClick={closeUpperElement} className='blur' />
    )
}
export default Blur