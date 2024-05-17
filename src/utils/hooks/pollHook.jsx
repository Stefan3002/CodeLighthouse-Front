import {useDispatch} from "react-redux";
import {useRef} from "react";
import {setLoading, setModal, setModalContent} from "../store/utils-store/utils-store-actions";
import useFetchHook from "./fetchHook";
import {useParams} from "react-router-dom";

const usePollHook = () => {
    const MAXIMUM_POLLS = 15
    const dispatch = useDispatch()
    const taskId = useRef()
    const intervalPolling = useRef()
    const numberOfPolls = useRef(0)
    const donePolling = useRef(true)
    const sendRequest = useFetchHook()

    const successCallback2 = (data) => {
        donePolling.current = true
        dispatch(setModal(true))
        dispatch(setModalContent({
            type: 'success',
            code: true,
            data: data.data
        }))
    }

    const successCallback = (data) => {
        donePolling.current = false
        dispatch(setLoading(true))
        clearInterval(intervalPolling.current)
        intervalPolling.current = setInterval(async () => {
            if(numberOfPolls.current > MAXIMUM_POLLS) {
                clearInterval(intervalPolling.current)
                numberOfPolls.current = 0
                donePolling.current = true
                dispatch(setLoading(false))
            }
            else {
                const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/poll/${taskId.current}`, null, 'GET', true, undefined, ['Is it done?', 'Now?', 'NOW?'])
                // If there was an error with the user code
                // sendRequest hook already caught it, but did not return here anything
                if(!res) {
                    numberOfPolls.current = MAXIMUM_POLLS
                    donePolling.current = true
                    dispatch(setLoading(false))
                }
                numberOfPolls.current += 1
                console.log('res', res, taskId, numberOfPolls.current)
                if(res && res.status){
                    successCallback2(res.data)
                    clearInterval(intervalPolling.current)
                    numberOfPolls.current = 0
                    dispatch(setLoading(false))
                }


            }
        }, 1000)

    }

    return async (reqData, reqUrl) => {

        // const reqData = {
        //     code,
        //     userId: user.user_id,
        //     language: lang,
        //     timeLimit: data.time_limit
        // }
        const res = await sendRequest(reqUrl,JSON.stringify(reqData) , 'POST', false, successCallback, ['The real test!', 'Get ready!', 'Aaaaaaannnnddddd...'])
        taskId.current = res.data
    }
}
export default usePollHook