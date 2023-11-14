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
import {useDispatch, useSelector} from "react-redux";
import {setModal, setModalContent} from "../../utils/store/utils-store/utils-store-actions";
import {getUser} from "../../utils/store/user-store/user-store-selectors";
import useUpdateData from "../../utils/hooks/updateDataHook";
const LighthousesPage = () => {
    const sendRequest = useFetchHook()
    const user = useSelector(getUser)
    const dispatch = useDispatch()
    const updateUserData = useUpdateData()

    useEffect(() => {
        (async () => {
            await updateUserData()
        })()
    }, []);

    const menuLighthouse = () => {
        dispatch(setModal(true))
        dispatch(setModalContent({
            type: 'menuLighthouse',
            data: undefined
        }))
    }

    if(user)
    return (
        <Transition mode='fullscreen'>
            <Parallax parallaxData={parallaxData} img={LighthouseIMG}/>
            <Button callback={menuLighthouse} type='plus' />
            <div className='wrapper lighthouses-page'>
                {user.enrolled_lighthouses.map(lighthouse => {
                    return <LighthouseCard data={lighthouse} />
                })}
            </div>
        </Transition>
    )
}
export default LighthousesPage