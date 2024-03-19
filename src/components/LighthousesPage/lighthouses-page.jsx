import './lighthouses-page.css'
import Parallax from "../Parallax/parallax";
import parallaxData from './parallax-data.json'
import Transition from "../../utils/js/transitions";
import LighthouseIMG from '../../utils/imgs/headers/Lighthouse.jpg'
import LighthouseCard from "../Lighthouse/LighthouseCard/lighthouse-card";
import useFetchHook from "../../utils/hooks/fetchHook";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Button from "../Button/button";
import {useDispatch, useSelector} from "react-redux";
import {setModal, setModalContent} from "../../utils/store/utils-store/utils-store-actions";
import {getUser} from "../../utils/store/user-store/user-store-selectors";
import useUpdateData from "../../utils/hooks/updateDataHook";
import Heading from "../Heading/heading";
import Missing from "../Missing/missing";
import EnrolledLighthouses from "../EnrolledLighthouses/enrolled-lighthouses";
import useLazyLoadHook from "../../utils/hooks/lazyLoadHook";
import rightCaretSVG from '../../utils/imgs/SVGs/RightCaretSVG.svg'
import leftCaretSVG from '../../utils/imgs/SVGs/LeftCaretSVG.svg'
const LighthousesPage = () => {
    const LOAD_SIZE = 3
    const sendRequest = useFetchHook()
    const user = useSelector(getUser)
    const dispatch = useDispatch()
    const updateUserData = useUpdateData()
    const [communities, setCommunities] = useState([])
    const lazyLoad = useLazyLoadHook(LOAD_SIZE, setCommunities, `${process.env.REACT_APP_SERVER_URL}/public-entities?type=lighthouse`)




    useEffect(() => {
        (async () => {
            await updateUserData(false)
        })()
    }, []);
    // useEffect(() => {
    //     ( async () => {
    //         const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/public-entities?type=lighthouse`, null , 'GET', true, (communities) => setCommunities(communities))
    //     })()
    // }, [user]);

    const menuLighthouse = () => {
        dispatch(setModal(true))
        dispatch(setModalContent({
            type: 'menuLighthouse',
            content: {
                button1: 'joinLighthouse',
                button1Name: 'Join',
                button2: 'createLighthouse',
                button2Name: 'Create'
            }
        }))
    }
    return (
        <Transition mode='fullscreen'>
            <Parallax parallaxData={parallaxData} img={LighthouseIMG}/>
            <Button ariaLabel='Create or join a lighthouse' callback={menuLighthouse} type='plus' />
            <div className="wrapper">
                <div className='lighthouses-page'>
                    <Heading text='Enrolled Lighthouses' />
                    <EnrolledLighthouses data={user} />

                    <Heading text='Public Communities' />
                    <div className="lighthouses-wrapper">
                        <Button size='50' imgSRC={leftCaretSVG} type='image' ariaLabel='See more communities' marginatedHorizontal={true} marginated={true} text='Back' callback={lazyLoad.previousEntitites} />

                        {communities && communities.map((community, idx) => {
                            if(!community.archived)
                                return <LighthouseCard animationDelay={idx + 1} type='community' data={community} />
                        })}
                        <Button size='50' imgSRC={rightCaretSVG} type='image' ariaLabel='Previous communities' marginated={true} text='More' callback={lazyLoad.nextEntities} />
                    </div>

                </div>
            </div>
        </Transition>
    )
}
export default LighthousesPage