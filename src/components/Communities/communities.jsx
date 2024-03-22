import './communities.css'
import LighthouseCard from "../Lighthouse/LighthouseCard/lighthouse-card";
import Missing from "../Missing/missing";
import {useEffect, useState} from "react";
import useFetchHook from "../../utils/hooks/fetchHook";
import useLazyLoadHook from "../../utils/hooks/lazyLoadHook";
import Button from "../Button/button";
import leftCaretSVG from "../../utils/imgs/SVGs/LeftCaretSVG.svg";
import rightCaretSVG from "../../utils/imgs/SVGs/RightCaretSVG.svg";
const Communities = () => {
    const sendRequest = useFetchHook()
    const [data, setData] = useState([])
    const LOAD_SIZE = 5
    const lazyLoad = useLazyLoadHook(LOAD_SIZE, setData, `${process.env.REACT_APP_SERVER_URL}/public-entities?type=lighthouse`)

    return (
        <div className='lighthouses-wrapper'>
            <Button size='50' imgSRC={leftCaretSVG} type='image' ariaLabel='See more communities' marginatedHorizontal={true} marginated={true} text='Back' callback={lazyLoad.previousEntitites} />
            <Button size='50' imgSRC={rightCaretSVG} type='image' ariaLabel='Previous communities' marginated={true} text='More' callback={lazyLoad.nextEntities} />
            <div className="lighthouses-inner-wrapper">
                {data && data.length ? data.map((community, idx) => {
                    if(!community.archived)
                        return <LighthouseCard animationDelay={idx + 1} type='community' data={community} />
                }) : <Missing text='There are no communities at the time!'/>}
            </div>
        </div>
    )
}
export default Communities