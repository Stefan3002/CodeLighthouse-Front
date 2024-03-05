import './admin-page.css'
import {useEffect, useState} from "react";
import useFetchHook from "../../../utils/hooks/fetchHook";
import ChallengeCard from "../../ChallengeCard/challenge-card";
import Heading from "../../Heading/heading";
import Missing from "../../Missing/missing";
import DeniedChallengesList from "../DeniedChallengesList/denied-challenges-list";
const AdminPage = () => {
    const [data, setData] = useState([])
    const sendRequest = useFetchHook()

    useEffect(() => {
        (async () => {
            const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/admin`, undefined, 'GET', false, undefined, ['Hey Admin!', 'Looking for something for you to do', 'Is there nothing at all?', 'Still looking!'])
            setData(res)
        })()
    }, []);

    if(data)
    return (
        <div className='wrapper admin-page'>
            <Heading text='Pending challenges, admin.' />
            <div className="pending-challenges">
                {data.length ? data.map(challenge => {
                    return <ChallengeCard challenge={challenge} type='small-card' />
                }) : <Missing text='No challenges here' />}
            </div>
            <Heading text='Denied challenges' />
            <DeniedChallengesList />
        </div>
    )
}
export default AdminPage