import './blur.css'
import {setError, setModal, setSidePanel} from "../../utils/store/utils-store/utils-store-actions";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
const Blur = ({type = 'transparent', redirect = undefined}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const closeUpperElement = () => {
        dispatch(setError(null))
        dispatch(setModal(false))
        dispatch(setSidePanel({
            opened: false,
            type: 'undefined',
            data: undefined
        }))
        // if(redirect)
        //     navigate(redirect)
    }

    if(type == 'transparent')
        return (
            <div onClick={closeUpperElement} className='blur' />
        )
    else
        return (
            <div key={`blur-${type}`} onClick={closeUpperElement} className='blur-dark' />
        )
}
export default Blur