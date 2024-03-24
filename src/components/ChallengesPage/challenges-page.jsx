import './challenges-page.css'
import Transition from "../../utils/js/transitions";
import {useEffect, useRef, useState} from "react";
import useFetchHook from "../../utils/hooks/fetchHook";
import Parallax from "../Parallax/parallax";
import parallaxData from './parallax-data.json'
import ParallaxIMG from '../../utils/imgs/headers/HeaderChallenges.jpg'
import {Link} from "react-router-dom";
import AuthorName from "../AuthorName/author-name";
import Button from "../Button/button";
import {useDispatch, useSelector} from "react-redux";
import {setDifficulty, setError, setModal, setModalContent} from "../../utils/store/utils-store/utils-store-actions";
import Difficulty from "../Difficulty/difficulty";
import DifficultyPicker from "../DifficultyPicker/difficulty-picker";
import {getUser} from "../../utils/store/user-store/user-store-selectors";
import TickLightSVG from "../../utils/imgs/SVGs/TickLightSVG.svg";
import {AnimatePresence, motion} from "framer-motion"
import useLazyLoadHook from "../../utils/hooks/lazyLoadHook";
import leftCaretSVG from "../../utils/imgs/SVGs/LeftCaretSVG.svg";
import rightCaretSVG from "../../utils/imgs/SVGs/RightCaretSVG.svg";
import ChallengesList from "../ChallengesList/challenges-list";
import ChallengesHighlighted from "../ChallengesHighlighted/challenges-highlighted";

const ChallengesPage = () => {
    const [START_INDEX, set_START_INDEX] = useState(-2)
    const [data, setData] = useState(undefined)
    const dispatch = useDispatch()
    const user = useSelector(getUser)

    const savedData = useRef({
        savedTrueFunction: undefined,
        savedDescription: undefined,
        savedRandomFunction: undefined,
        savedHardFunction: undefined,
        savedName: undefined,
        savedLanguage: undefined,
        savedTimeLimit: undefined,
        savedPrivate: undefined
    })

    useEffect(() => {
        if(window.innerWidth < 1100)
            set_START_INDEX(1)
        else
            set_START_INDEX(3)
    }, []);


    const createChallenge = () => {
        dispatch(setModal(true))
        dispatch(setModalContent({
            type: 'createChallenge',
            data: {
                savedData
            }
        }))
    }


    return (
        <Transition mode='fullscreen'>
            <Parallax parallaxData={parallaxData} img={ParallaxIMG}/>
            <ChallengesHighlighted />
            <div className='wrapper challenges-page'>
                {/*I have not decided yet how many to load, wait a bit more!*/}
                {START_INDEX !== -2 &&
                    <ChallengesList startIndex={START_INDEX} />
                }
            </div>
            <Button ariaLabel='Create a new challenge' callback={createChallenge} type='plus'/>
        </Transition>
    )
}
export default ChallengesPage