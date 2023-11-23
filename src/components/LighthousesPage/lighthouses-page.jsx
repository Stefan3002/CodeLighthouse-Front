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
import Heading from "../Heading/heading";
const LighthousesPage = () => {
    const sendRequest = useFetchHook()
    const user = useSelector(getUser)
    const dispatch = useDispatch()
    const updateUserData = useUpdateData()
    const [communities, setCommunities] = useState([])

    useEffect(() => {
        (async () => {
            await updateUserData(false)
        })()
    }, []);
    useEffect(() => {
        ( async () => {
            const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/communities`, null , 'GET', true, (communities) => setCommunities(communities))
        })()
    }, [user]);

    const menuLighthouse = () => {
        dispatch(setModal(true))
        dispatch(setModalContent({
            type: 'menuLighthouse',
            data: undefined
        }))
    }
    if(user && communities)
    return (
        <Transition mode='fullscreen'>
            <Parallax parallaxData={parallaxData} img={LighthouseIMG}/>
            <Button callback={menuLighthouse} type='plus' />
            <div className="wrapper">
                <div className='lighthouses-page'>
                    <Heading text='Enrolled Lighthouses' />
                    <div className="lighthouses-wrapper">
                        {user.enrolled_lighthouses.map((lighthouse, idx) => {
                            {
                                console.log(idx)}
                            return <LighthouseCard animationDelay={idx} data={lighthouse} />
                        })}
                    </div>


                    <Heading text='Public Communities' />
                    <div className="lighthouses-wrapper">
                        {communities.map((community, idx) => {
                            if(!community.archived)
                                return <LighthouseCard animationDelay={idx + 1} type='community' data={community} />
                        })}
                    </div>

                    </div>
            </div>
        </Transition>
    )
}
export default LighthousesPage