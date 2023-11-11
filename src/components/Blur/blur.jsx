import './blur.css'
import {setError, setModal, setSidePanel} from "../../utils/store/utils-store/utils-store-actions";
import {useDispatch} from "react-redux";
const Blur = ({type = 'transparent'}) => {
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

    if(type == 'transparent')
        return (
            <div onClick={closeUpperElement} className='blur' />
        )
    else
        return (
            <div onClick={closeUpperElement} className='blur-dark' />
        )
}
export default Blur