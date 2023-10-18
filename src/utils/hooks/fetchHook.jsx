import {useCallback} from "react";
import {json} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setError, setLoading} from "../store/utils-store/utils-store-actions";

const useFetchHook = () => {
    const dispatch = useDispatch()
    // const [response, setResponse] = useState(initial_state)
    return useCallback(async (url, body, method) => {
        dispatch(setLoading(true))
        try {
            const data = await fetch(url, {
                method,
                body,
                credentials: 'include'
            })

            const jsonData = await data.json()

            dispatch(setLoading(false))
            return jsonData
        }catch(err){
            console.log(err)
            dispatch(setError(err.toString()))
        }
    }, [])

}
export default useFetchHook