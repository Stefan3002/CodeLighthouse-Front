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

const ChallengesPage = () => {
    const LOAD_SIZE = 10
    const sendRequest = useFetchHook()
    const [data, setData] = useState(undefined)
    const dispatch = useDispatch()
    const user = useSelector(getUser)
    const [expandedChallenge, setExpandedChallenge] = useState(undefined)
    const stop = useRef(false)

    const [indexes, setIndexes] = useState({
        lowIndex: 0,
        highIndex : LOAD_SIZE
    })

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
        (async () => {
            const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/challenges/${indexes.lowIndex}/${indexes.highIndex}`, undefined, 'GET', true, undefined, ['Fetching the challenges', 'Wait, our office cat stole some of them', 'Getting them back!'])
            if(res.challenges.length) {
                stop.current = false
                setData(res.challenges)
            }
            else {
                stop.current = true
                // dispatch(setModal(true))
                dispatch(setError('No more challenges at this time.'))
            }
        })()
    }, [indexes]);


    const createChallenge = () => {
        dispatch(setModal(true))
        dispatch(setModalContent({
            type: 'createChallenge',
            data: {
                savedData
            }
        }))
    }

    const expandChallenge = (challenge) => {
        setExpandedChallenge(challenge.id)
    }
    const collapseChallenge = () => {
        setExpandedChallenge(undefined)
    }

    const loadMoreChallenges = () => {
        if(!stop.current)
            setIndexes(oldIndexes => {
                return {
                    lowIndex: oldIndexes.lowIndex + LOAD_SIZE,
                    highIndex: oldIndexes.highIndex + LOAD_SIZE
                }
            })
        else
            dispatch(setError('No more challenges at this time.'))
    }

    const backChallenges = () => {
        setIndexes(oldIndexes => {
            if(oldIndexes.lowIndex - LOAD_SIZE >= 0)
                return {
                    lowIndex: oldIndexes.lowIndex - LOAD_SIZE,
                    highIndex: oldIndexes.highIndex - LOAD_SIZE
                }
            else
                return oldIndexes
        })
    }

    return (
        <Transition mode='fullscreen'>
            <Parallax parallaxData={parallaxData} img={ParallaxIMG}/>


            <div className="challenges-high">
                {data && data.map((challenge, idx) => {
                    if (idx < 3) {
                        let solved = false
                        for (const solved_challenge of user.solved_challenges)
                            if (solved_challenge.id === challenge.id) {
                                solved = true
                                break
                            }
                        if (challenge.public)
                            return <Link to={`${challenge.slug}`}>
                                <div className='challenge-high'>
                                    <h2>{challenge.title}</h2>
                                    <AuthorName author={challenge.author} color='light'/>
                                </div>
                            </Link>
                    }

                })
                }
            </div>


            <div className='wrapper challenges-page'>
                {/*<div className="challenges-filters">*/}
                {/*    <DifficultyPicker />*/}
                {/*</div>*/}


                <div className="challenges">
                    {data && data.map((challenge, idx) => {
                        let solved = false
                        for (const solved_challenge of user.solved_challenges)
                            if (solved_challenge.id === challenge.id) {
                                solved = true
                                break
                            }
                        if (challenge.public)
                            return <Link to={`${challenge.slug}`}>
                                <div style={{background: idx % 2 !== 0 ? '#FEE1C7' : null}}
                                     onMouseLeave={collapseChallenge} onMouseEnter={() => expandChallenge(challenge)}
                                     className='challenge' key={challenge.slug}>
                                    <div className="challenge-meta">
                                        <div className='challenge-meta-inner'>
                                            <h2 className='challenge-title'>{challenge.title}</h2>
                                            {/*<div className='challenge-meta-author-div'>*/}
                                            {/*    <AuthorName color='dark' author={challenge.author}/>*/}
                                            {/*</div>*/}

                                        </div>

                                        <div className='challenge-meta-inner'>
                                            {solved &&
                                                <div className='bar-item-dark-small'>
                                                    <img src={TickLightSVG} className='icon-svg' alt="Solved!"/>
                                                    <p>Solved!</p>
                                                </div>
                                            }
                                            <Difficulty size='65px' difficulty={challenge.difficulty}/>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                    })}
                </div>
                <Button marginatedHorizontal={true} marginated={true} text='Back' callback={backChallenges} />
                <Button marginated={true} text='More' callback={loadMoreChallenges} />
            </div>
            <Button callback={createChallenge} type='plus'/>
        </Transition>
    )
}
export default ChallengesPage