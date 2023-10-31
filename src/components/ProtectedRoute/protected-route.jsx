import './protected-route.css'
import {Navigate, redirect, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {getIsLoggedIn, getStatus} from "../../utils/store/auth-store/auth-store-selectors";
const ProtectedRoute = ({children}) => {
    const isLoggedIn = useSelector(getIsLoggedIn)
    const status = useSelector(getStatus)
    const navigate = useNavigate()

    console.log('llll', status)
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