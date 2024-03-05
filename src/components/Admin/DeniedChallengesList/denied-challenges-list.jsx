import './denied-challenges-list.css'
import Heading from "../../Heading/heading";
import ChallengeCard from "../../ChallengeCard/challenge-card";
import {useEffect, useState} from "react";
import useFetchHook from "../../../utils/hooks/fetchHook";
import Missing from "../../Missing/missing";
const DeniedChallengesList = () => {
    const [data, setData] = useState([])
    const sendRequest = useFetchHook()

    useEffect(() => {
        (async () => {
            const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/admin-denied`, undefined, 'GET', false, undefined, ['Reminder: Denied challenge will be purged!', 'They do tend to get slippery', 'SAW one running!', 'In pursuit!!!'])
            setData(res)
        })()
    }, []);

    if(data)
    return (
        <div className="pending-challenges">
            {data.length ? data.map(challenge => {
                return <ChallengeCard challenge={challenge} type='small-card' />
            }) : <Missing text='No challenges here' />}
        </div>
    )
}
export default DeniedChallengesList