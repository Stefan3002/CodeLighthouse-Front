import './enrolled-lighthouses.css'
import LighthouseCard from "../Lighthouse/LighthouseCard/lighthouse-card";
import Missing from "../Missing/missing";
import {useEffect, useState} from "react";
import useFetchHook from "../../utils/hooks/fetchHook";
import useLazyLoadHook from "../../utils/hooks/lazyLoadHook";
import Button from "../Button/button";
import leftCaretSVG from "../../utils/imgs/SVGs/LeftCaretSVG.svg";
import rightCaretSVG from "../../utils/imgs/SVGs/RightCaretSVG.svg";
const EnrolledLighthouses = () => {
    const sendRequest = useFetchHook()
    const [data, setData] = useState([])
    const LOAD_SIZE = 5
    const lazyLoad = useLazyLoadHook(LOAD_SIZE, setData, `${process.env.REACT_APP_SERVER_URL}/user-entity?type=lighthouses`)

    return (
        <div className="lighthouses-wrapper">
            <Button size='50' imgSRC={leftCaretSVG} type='image' ariaLabel='Change to the previous challenges page' marginatedHorizontal={true} marginated={true} text='Back' callback={lazyLoad.previousEntitites} />
            <Button size='50' imgSRC={rightCaretSVG} type='image' ariaLabel='Next challenges page' marginated={true} text='More' callback={lazyLoad.nextEntities} />
            <div className="lighthouses-inner-wrapper">
                {data.length ? data.map((lighthouse, idx) => {
                    return <LighthouseCard animationDelay={idx} data={lighthouse}/>
                }) : <Missing text='You did not join any lighthouse yet!'/>}
            </div>
        </div>
    )
}
export default EnrolledLighthouses