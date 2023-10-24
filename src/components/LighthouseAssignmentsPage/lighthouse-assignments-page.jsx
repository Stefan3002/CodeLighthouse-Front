import './lighthouse-assignments-page.css'
import Missing from "../Missing/missing";
import Button from "../Button/button";
import {useDispatch} from "react-redux";
import {setModal, setModalContent} from "../../utils/store/utils-store/utils-store-actions";
import {useEffect, useState} from "react";
import useFetchHook from "../../utils/hooks/fetchHook";
import {useParams} from "react-router-dom";
const LighthouseAssignmentsPage = () => {
    const dispatch = useDispatch()
    const [data, setData] = useState(undefined)
    const sendRequest = useFetchHook()
    const lighthouseId = useParams().id
   const assignChallenge = () => {
       dispatch(setModal(true))
       dispatch(setModalContent('assignChallenge'))
   }
    useEffect(() => {
        (async () => {
            const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/lighthouses/${lighthouseId}`, undefined , 'GET', false)
            setData(res)
        })()
    }, []);
    console.log(data)
   if (data)
    return (
        <div className='wrapper assignemnts-page'>
            {!data.assignments.length ? <Missing text='No assignments yet!' /> :
                <>
                    {data.assignments.map(assignment => {
                        return <p>{assignment.title}</p>
                    })}
                </>
            }

            <Button type='plus' callback={assignChallenge} />
        </div>
    )
}
export default LighthouseAssignmentsPage