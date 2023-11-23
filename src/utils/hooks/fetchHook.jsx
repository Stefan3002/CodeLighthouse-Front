import {useCallback} from "react";
import {json, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setError, setLoading, setModal, setSidePanel} from "../store/utils-store/utils-store-actions";
import {getToken} from "../store/auth-store/auth-store-selectors";

const useFetchHook = () => {
    const dispatch = useDispatch()
    const JWT = useSelector(getToken)
    console.log(JWT)
    const navigate = useNavigate()
    // const [response, setResponse] = useState(initial_state)
    return useCallback(async (url, body, method, silentLoad = false, successCallback) => {
        if(!silentLoad)
            dispatch(setLoading(true))

        let authorization = undefined
        if(JWT && JWT.token)
            authorization = `Bearer ${JWT.token}`
        else
            authorization = undefined

        try {
            const data = await fetch(url, {
                method,
                body,
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': authorization
                }
            })

            const jsonData = await data.json()
            if(!silentLoad)
                dispatch(setLoading(false))
            if(data.ok) {
                if(successCallback)
                    successCallback(jsonData)
                return jsonData
            }
            else if(data.status === 401) {
                dispatch(setError(jsonData.data))
                navigate('/auth')
                return;
            }
            else{
                dispatch(setError(jsonData.data))
                dispatch(setModal(false))
                dispatch(setSidePanel(false))
            }
        }catch(err){
            dispatch(setError(err.toString()))
            dispatch(setModal(false))
            dispatch(setSidePanel(false))
            if(!silentLoad)
                dispatch(setLoading(false))
        }
    }, [])

}
export default useFetchHook