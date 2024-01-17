import {useCallback} from "react";
import {json, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setError, setLoading} from "../store/utils-store/utils-store-actions";
import {getToken} from "../store/auth-store/auth-store-selectors";
import {getUser} from "../store/user-store/user-store-selectors";
import {setUser} from "../store/user-store/user-store-actions";
import useFetchHook from "./fetchHook";

const useUpdateData = (explicitUrl = undefined) => {
    const user = useSelector(getUser)
    const sendRequest = useFetchHook()
    const dispatch = useDispatch()
    let url = explicitUrl
    if(!explicitUrl)
        url = `${process.env.REACT_APP_SERVER_URL}/users/${user.id}`
    return useCallback(async (silentLoad = true) => {
        const updatedData = await sendRequest(url, null, 'GET', silentLoad, undefined, ['Getting the data', 'It is hard to find', 'Did someone hide it?', 'Bring it back NOW!'])
        dispatch(setUser(updatedData))
    }, [])

}
export default useUpdateData