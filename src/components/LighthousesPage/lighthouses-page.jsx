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
import Communities from "../Communities/communities";


const LighthousesPage = () => {
    const dispatch = useDispatch()

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
                    <EnrolledLighthouses />

                    <Heading text='Public Communities' />
                    <Communities />

                </div>
            </div>
        </Transition>
    )
}
export default LighthousesPage