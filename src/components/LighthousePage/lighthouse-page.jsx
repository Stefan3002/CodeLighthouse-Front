import './lighthouse-page.css'
import {Outlet, useParams} from "react-router-dom";
import Transition from "../../utils/js/transitions";
import useFetchHook from "../../utils/hooks/fetchHook";
import {useEffect, useState} from "react";
import LighthouseNavigation from "../LighthouseNavigation/lighthouse-navigation";
import Button from "../Button/button";
const LighthousePage = () => {
    const lighthouseID = useParams()['id']
    const sendRequest = useFetchHook()
    const [data, setData] = useState(undefined)

    useEffect(() => {
        (async () => {
            const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/lighthouses/${lighthouseID}`, undefined, 'GET', true)
            setData(res)
        })()
    }, []);


    if(data)
    return (
        <Transition mode='fullscreen'>
            <LighthouseNavigation />
            <div className='wrapper lighthouse-page'>
                <h1>{data.name}</h1>
                <p>{data.author.username}</p>
            </div>
            <Outlet />
            {/*<Button type='plus' />*/}
        </Transition>
    )
}
export default LighthousePage