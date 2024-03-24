import {useDispatch} from "react-redux";
import {useEffect, useRef, useState} from "react";
import {setLoading, setModal, setModalContent} from "../store/utils-store/utils-store-actions";
import useFetchHook from "./fetchHook";
import {useParams} from "react-router-dom";
import useUpdateData from "./updateDataHook";

const useLazyLoadHook = (loadSize, setData, url, START_INDEX = 0) => {
    const LOAD_SIZE = loadSize
    const sendRequest = useFetchHook()
    const [indexes, setIndexes] = useState({
        lowIndex: START_INDEX,
        highIndex : START_INDEX + LOAD_SIZE
    })
    const stop = useRef(false)
    const updateDataHook = useUpdateData(url + `&start=${START_INDEX}&end=${START_INDEX + LOAD_SIZE}`)


    useEffect(() => {
        if(indexes)
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

    const updateData = async () => {
        const updatedData = await updateDataHook(true)
        setData(updatedData)
    }

    return {
        nextEntities,
        previousEntitites,
        updateData
    }
}
export default useLazyLoadHook