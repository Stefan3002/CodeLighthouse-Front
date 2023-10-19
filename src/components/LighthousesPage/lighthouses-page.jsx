import './lighthouses-page.css'
import Parallax from "../Parallax/parallax";
import parallaxData from './parallax-data.json'
import Transition from "../../utils/js/transitions";
import LighthouseIMG from '../../utils/imgs/headers/Lighthouse.jpg'
import LighthouseCard from "../LighthouseCard/lighthouse-card";
import useFetchHook from "../../utils/hooks/fetchHook";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Button from "../Button/button";
import {useDispatch} from "react-redux";
import {setModal, setModalContent} from "../../utils/store/utils-store/utils-store-actions";
const LighthousesPage = () => {
    const sendRequest = useFetchHook()
    const [data, setData] = useState(undefined)
    const dispatch = useDispatch()

    useEffect(() => {
        (async () => {
            const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/lighthouses/0/10`, undefined, 'GET', true)
            setData(res)
        })()
    }, []);

    const joinLighthouse = () => {
        dispatch(setModal(true))
        dispatch(setModalContent('joinLighthouse'))
    }

    if(data)
    return (
        <Transition mode='fullscreen'>
            <Parallax parallaxData={parallaxData} img={LighthouseIMG}/>
            <Button callback={joinLighthouse} type='plus' />
            <div className='wrapper lighthouses-page'>
                {data.map(lighthouse => {
                    return <Link to={`${lighthouse.pk}`}><LighthouseCard data={lighthouse} /></Link>
                })}
            </div>
        </Transition>
    )
}
export default LighthousesPage