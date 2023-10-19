import './profile-page.css'
import {useEffect, useState} from "react";
import useFetchHook from "../../utils/hooks/fetchHook";
import {useParams} from "react-router-dom";
import Transition from "../../utils/js/transitions";
const ProfilePage = () => {
    const userID = useParams()['id']
    const sendRequest = useFetchHook()
    const [data, setData] = useState(undefined)

    useEffect(() => {
        (async () => {
            const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/users/${userID}`, undefined, 'GET', true)
            setData(res[0])
        })()
    }, []);

    if(data)
    return (
        <Transition mode='fullscreen'>
        <div className='wrapper profile-page'>
            <h1>{data.fields.username}</h1>
        </div>
        </Transition>
    )
}
export default ProfilePage