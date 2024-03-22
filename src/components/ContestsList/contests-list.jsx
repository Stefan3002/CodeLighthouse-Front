import './contests-list.css'
import ContestCard from "../ContestCard/contest-card";
import Missing from "../Missing/missing";
import useLazyLoadHook from "../../utils/hooks/lazyLoadHook";
import {useState} from "react";
import Button from "../Button/button";
import leftCaretSVG from "../../utils/imgs/SVGs/LeftCaretSVG.svg";
import rightCaretSVG from "../../utils/imgs/SVGs/RightCaretSVG.svg";
import LighthouseCard from "../Lighthouse/LighthouseCard/lighthouse-card";
const ContestsList = () => {
    const LOAD_SIZE = 5
    const [data, setData] = useState([])
    const lazyLoad = useLazyLoadHook(LOAD_SIZE, setData, `${process.env.REACT_APP_SERVER_URL}/user-entity?type=contests`)


    return (
        <div className="lighthouses-wrapper">
            <Button size='50' imgSRC={leftCaretSVG} type='image' ariaLabel='Change to the previous challenges page'
                    marginatedHorizontal={true} marginated={true} text='Back'
                    callback={lazyLoad.previousEntitites}/>
            <Button size='50' imgSRC={rightCaretSVG} type='image' ariaLabel='Next challenges page' marginated={true}
                    text='More' callback={lazyLoad.nextEntities}/>
            <div className="lighthouses-inner-wrapper">
                {data.length ? data.map((contest, idx) => {
                    return <ContestCard animationDelay={idx + 1} data={contest}/>
                }) : <Missing text='Nothing here'/>}
            </div>
        </div>
    )
}
export default ContestsList