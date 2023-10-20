import './profile-page.css'
import {useEffect, useState} from "react";
import useFetchHook from "../../utils/hooks/fetchHook";
import {useParams} from "react-router-dom";
import Transition from "../../utils/js/transitions";
import LighthouseCard from "../LighthouseCard/lighthouse-card";
const ProfilePage = () => {
    const userID = useParams()['id']
    const sendRequest = useFetchHook()
    const [data, setData] = useState(undefined)

    useEffect(() => {
        (async () => {
            const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/users/${userID}`, undefined, 'GET', true)
            setData(res)
        })()
    }, []);
    if(data)
    return (
        <Transition mode='fullscreen'>
        <div className='wrapper profile-page'>
            <div className="profile-header">
                <h1>{data.username}</h1>
            </div>
            <div className="profile-lighthouses">
                {data.enrolled_lighthouses.map(lighthouse => {
                    return <LighthouseCard data={lighthouse} />
                })}
            </div>
        </div>
        </Transition>
    )
}
export default ProfilePage