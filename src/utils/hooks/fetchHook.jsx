import {useCallback} from "react";

const useFetchHook = () => {
    // const [response, setResponse] = useState(initial_state)
    return useCallback((url, body, method) => {
        let response
        fetch(url, {
            method,
            body,
            credentials: 'include'
        })
            .then(data => {
                data.json().then(jsonData => {
                    response = jsonData
                })
            })
        return response
    }, [])

}
export default useFetchHook