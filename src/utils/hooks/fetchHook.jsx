import {useCallback} from "react";
import {json} from "react-router-dom";

const useFetchHook = () => {
    // const [response, setResponse] = useState(initial_state)
    return useCallback(async (url, body, method) => {
        let response
        const data = await fetch(url, {
            method,
            body,
            credentials: 'include'
        })

        const jsonData = await data.json()
        return jsonData
    }, [])

}
export default useFetchHook