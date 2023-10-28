import './comments-page.css'
import Transition from "../../utils/js/transitions";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import useFetchHook from "../../utils/hooks/fetchHook";
import ChallengeMeta from "../ChallengeMeta/challenge-meta";
const CommentsPage = () => {
    const challengeSlug = useParams()['slug']
    const [data, setData] = useState(undefined)
    const sendRequest = useFetchHook()

    useEffect(() => {
        (async () => {
            const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/challenges/${challengeSlug}`, undefined, 'GET', true)
            setData(res)
        })()
    }, []);
    console.log('===', data)
    if(data)
    return (
        <Transition mode='fullscreen'>
            <div className='wrapper comments-page'>

            </div>
            <ChallengeMeta data={data} />
        </Transition>
    )
}
export default CommentsPage