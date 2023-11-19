import './lighthouse-page.css'
import {Outlet, useParams} from "react-router-dom";
import Transition from "../../utils/js/transitions";
import useFetchHook from "../../utils/hooks/fetchHook";
import {useEffect, useState} from "react";
import LighthouseNavigation from "../LighthouseNavigation/lighthouse-navigation";
import Button from "../Button/button";
import TopSection from "../TopSection/top-section";
import AuthorName from "../AuthorName/author-name";
const LighthousePage = () => {
    const lighthouseID = useParams()['id']
    const sendRequest = useFetchHook()
    const [data, setData] = useState(undefined)

    useEffect(() => {
        (async () => {
            const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/lighthouses/${lighthouseID}`, undefined, 'GET', false)
            setData(res)
        })()
    }, []);


    if(data)
    return (
        <Transition mode='fullscreen'>
            <LighthouseNavigation />
            <TopSection nameOfPage='Lighthouse' children={<AuthorName author={data.author} />} title={data.name} />
            <div className='wrapper lighthouse-page'>

            </div>
            <Outlet />
        </Transition>
    )
}
export default LighthousePage