import {useDispatch} from "react-redux";
import {useEffect, useRef, useState} from "react";
import {setLoading, setModal, setModalContent} from "../store/utils-store/utils-store-actions";
import useFetchHook from "./fetchHook";
import {useParams} from "react-router-dom";

const useLazyLoadHook = (loadSize, setData, url) => {
    const LOAD_SIZE = loadSize
    const sendRequest = useFetchHook()
    const [indexes, setIndexes] = useState({
        lowIndex: 0,
        highIndex : LOAD_SIZE
    })
    const stop = useRef(false)


    useEffect(() => {
        (async () => {
            // console.log('ss', dataAssignment)
            // if(dataAssignment && user.id === dataAssignment.lighthouse.author) {
            const res = await sendRequest(url + `&start=${indexes.lowIndex}&end=${indexes.highIndex}`, undefined, 'GET', true)
            if(res.length) {
                stop.current = false
                setData(res)
            }
            else {
                stop.current = true
                // dispatch(setModal(true))
                // dispatch(setError('No more challenges at this time.'))
            }


            // setSubmissions(res)
            // }
        })()
    }, [indexes]);



    const nextEntities = () => {
        if(!stop.current)
            setIndexes(oldIndexes => {
                return {
                    lowIndex: oldIndexes.lowIndex + LOAD_SIZE,
                    highIndex: oldIndexes.highIndex + LOAD_SIZE
                }
            })
        // else
        // dispatch(setError('No more challenges at this time.'))
    }
    const previousEntitites = () => {
        setIndexes(oldIndexes => {
            if(oldIndexes.lowIndex - LOAD_SIZE >= 0)
                return {
                    lowIndex: oldIndexes.lowIndex - LOAD_SIZE,
                    highIndex: oldIndexes.highIndex - LOAD_SIZE
                }
            else
                return oldIndexes
        })
    }
    return {
        nextEntities,
        previousEntitites
    }
}
export default useLazyLoadHook