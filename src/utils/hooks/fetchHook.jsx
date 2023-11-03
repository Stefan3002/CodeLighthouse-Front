import {useCallback} from "react";
import {json} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setError, setLoading} from "../store/utils-store/utils-store-actions";

const useFetchHook = () => {
    const dispatch = useDispatch()
    // const [response, setResponse] = useState(initial_state)
    return useCallback(async (url, body, method, silentLoad = false, successCallback) => {
        if(!silentLoad)
            dispatch(setLoading(true))
        try {
            const data = await fetch(url, {
                method,
                body,
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
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
            else{
                dispatch(setError(jsonData.data))
            }
        }catch(err){
            dispatch(setError(err.toString()))
            if(!silentLoad)
                dispatch(setLoading(false))
        }
    }, [])

}
export default useFetchHook