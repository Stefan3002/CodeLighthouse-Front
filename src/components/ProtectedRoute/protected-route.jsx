import './protected-route.css'
import {Navigate, redirect, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getExpireDate, getIsLoggedIn, getStatus} from "../../utils/store/auth-store/auth-store-selectors";
import {setIsLoggedIn, setStatus} from "../../utils/store/auth-store/auth-store-actions";
import {setUser} from "../../utils/store/user-store/user-store-actions";
const ProtectedRoute = ({children}) => {
    const isLoggedIn = useSelector(getIsLoggedIn)
    const status = useSelector(getStatus)
    const expireDate = useSelector(getExpireDate)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    if(new Date().getTime() >= expireDate){
        dispatch(setIsLoggedIn(false))
        dispatch(setUser(null))
        dispatch(setStatus('idle'))
        // navigate('/auth')
    }

    if(status === 'loaded') {
        if (!isLoggedIn)
            return <Navigate to='/auth'/>
        else if (isLoggedIn)
            return (
                <>
                    {children}
                </>
            )
    }
    else
        if(status === 'idle')
            return <Navigate to='/auth'/>

}
export default ProtectedRoute