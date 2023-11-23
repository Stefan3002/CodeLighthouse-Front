import './admin-page.css'
import {useEffect, useState} from "react";
import useFetchHook from "../../utils/hooks/fetchHook";
import ChallengeCard from "../ChallengeCard/challenge-card";
import Heading from "../Heading/heading";
const AdminPage = () => {
    const [data, setData] = useState([])
    const sendRequest = useFetchHook()

    useEffect(() => {
        (async () => {
            const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/admin`, undefined, 'GET', false)
            setData(res)
        })()
    }, []);

    if(data)
    return (
        <div className='wrapper admin-page'>
            <Heading text='Pending challenges, admin.' />
            <div className="pending-challenges">
                {data.map(challenge => {
                    return <ChallengeCard challenge={challenge} type='small-card' />
                })}
            </div>
        </div>
    )
}
export default AdminPage