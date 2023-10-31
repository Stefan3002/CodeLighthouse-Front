import './stats-page.css'
import Transition from "../../utils/js/transitions";
import ChallengeMeta from "../ChallengeMeta/challenge-meta";
import {useEffect, useState} from "react";
import useFetchHook from "../../utils/hooks/fetchHook";
import {useParams} from "react-router-dom";
const StatsPage = () => {
    const slug = useParams().slug
    const sendRequest = useFetchHook()
    const [data, setData] = useState(undefined)

    useEffect(() => {
        (async () => {
            const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/challenges/${slug}`, undefined, 'GET', true)
            setData(res)
        })()
    }, []);

    if(data)
    return (
        <Transition mode='fullscreen'>
        <div className='wrapper stats-page'>
            <p>{data.likes_received}</p>
        </div>
            <ChallengeMeta type='stats' data={data} />
        </Transition>
    )
}
export default StatsPage