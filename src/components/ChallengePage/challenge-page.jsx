import './challenge-page.css'
import Transition from "../../utils/js/transitions";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import useFetchHook from "../../utils/hooks/fetchHook";
const ChallengePage = () => {
    const slug = useParams().slug
    const [data, setData] = useState(undefined)
    const sendRequest = useFetchHook()

    useEffect(() => {
        (async () => {
            const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/challenges/${slug}`, undefined, 'GET')
            setData(res)
        })()
    }, []);

    if(data)
    return (
        <Transition mode='fullscreen'>
            <div className='wrapper challenge-page'>
                <h1>{data[0].fields.title}</h1>
                <p dangerouslySetInnerHTML={{__html: data[0].fields.description}}></p>
            </div>
        </Transition>
    )
}
export default ChallengePage