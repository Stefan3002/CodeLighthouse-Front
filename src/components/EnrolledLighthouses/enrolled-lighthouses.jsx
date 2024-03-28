import './enrolled-lighthouses.css'
import LighthouseCard from "../Lighthouse/LighthouseCard/lighthouse-card";
import Missing from "../Missing/missing";
import {useEffect, useState} from "react";
import useFetchHook from "../../utils/hooks/fetchHook";
import useLazyLoadHook from "../../utils/hooks/lazyLoadHook";
import Button from "../Button/button";
import leftCaretSVG from "../../utils/imgs/SVGs/LeftCaretSVG.svg";
import rightCaretSVG from "../../utils/imgs/SVGs/RightCaretSVG.svg";
import {getUserPreferences} from "../../utils/store/utils-store/utils-store-selectors";
import {useDispatch, useSelector} from "react-redux";
import {setUserPreferences} from "../../utils/store/utils-store/utils-store-actions";
const EnrolledLighthouses = () => {
    const sendRequest = useFetchHook()
    const [data, setData] = useState([])
    const LOAD_SIZE = 5
    const lazyLoad = useLazyLoadHook(LOAD_SIZE, setData, `${process.env.REACT_APP_SERVER_URL}/user-entity?type=lighthouses`)
    const userPreferences = useSelector(getUserPreferences)
    const dispatch = useDispatch()
    const hideShowArchived = () => {
        const newUserPreferences = {...userPreferences}

        if(userPreferences.showArchived)
            newUserPreferences.showArchived = false
        else
            newUserPreferences.showArchived = true

        dispatch(setUserPreferences(newUserPreferences))
    }


    return (
        <div className="lighthouses-wrapper">
            <Button callback={hideShowArchived} ariaLabel='Hide archived lighthouses' text={`${userPreferences.showArchived ? 'Hide' : 'Show'} archived`} />
            <div>
                <Button size='50' imgSRC={leftCaretSVG} type='image' ariaLabel='Change to the previous challenges page' marginatedHorizontal={true} marginated={true} text='Back' callback={lazyLoad.previousEntitites} />
                <Button size='50' imgSRC={rightCaretSVG} type='image' ariaLabel='Next challenges page' marginated={true} text='More' callback={lazyLoad.nextEntities} />
            </div>
            <div className="lighthouses-inner-wrapper">
                {data && data.length ? data.map((lighthouse, idx) => {
                    if(!userPreferences.showArchived && !lighthouse.archived)
                        return <LighthouseCard animationDelay={idx} data={lighthouse}/>
                    else
                    if(userPreferences.showArchived)
                        return <LighthouseCard animationDelay={idx} data={lighthouse}/>
                }) : <Missing text='You did not join any lighthouse yet!'/>}
            </div>
        </div>
    )
}
export default EnrolledLighthouses