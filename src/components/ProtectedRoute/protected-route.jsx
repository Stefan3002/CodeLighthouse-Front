import './protected-route.css'
import {Navigate, redirect} from "react-router-dom";
import {useSelector} from "react-redux";
import {getIsLoggedIn, getStatus} from "../../utils/store/auth-store/auth-store-selectors";
const ProtectedRoute = ({children}) => {
    const isLoggedIn = true
    const status = 'loaded'
    console.log('asdasd', status)
    if(status === 'loaded')
        if(!isLoggedIn)
            console.log(isLoggedIn)
        else
            if(isLoggedIn)
                return (
                    <>
                        {children}
                    </>
                )
}
export default ProtectedRoute