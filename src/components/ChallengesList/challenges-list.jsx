import './challenges-list.css'
import {Link} from "react-router-dom";
import TickLightSVG from "../../utils/imgs/SVGs/TickLightSVG.svg";
import Difficulty from "../Difficulty/difficulty";
import Button from "../Button/button";
import leftCaretSVG from "../../utils/imgs/SVGs/LeftCaretSVG.svg";
import rightCaretSVG from "../../utils/imgs/SVGs/RightCaretSVG.svg";
import {useEffect, useState} from "react";
import useLazyLoadHook from "../../utils/hooks/lazyLoadHook";
import useFetchHook from "../../utils/hooks/fetchHook";
import Missing from "../Missing/missing";
const ChallengesList = ({startIndex = 0}) => {
    const LOAD_SIZE = 5
    const sendRequest = useFetchHook()
    const [solvedChallenges, setSolvedChallenges] = useState([])
    const [data, setData] = useState([])
    const lazyLoad = useLazyLoadHook(LOAD_SIZE, setData, `${process.env.REACT_APP_SERVER_URL}/challenges?`, startIndex)


    useEffect(() => {
        (async () => {
            const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/user-entity?type=challenges&start=0&end=-1`, undefined, 'GET', true)
            setSolvedChallenges(res)
        })()
    }, []);


    return (
        <>
            <div className="challenges">
                {(data && data.length) ? data.map((challenge, idx) => {
                    let solved = false
                    for (const solved_challenge of solvedChallenges)
                        if (solved_challenge.id === challenge.id) {
                            solved = true
                            break
                        }
                    if (challenge.public)
                        return <Link to={`${challenge.slug}`}>
                            <div style={{background: idx % 2 !== 0 ? '#FEE1C7' : null}}
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
                }): <Missing text='No challenges here' />}
            </div>
            {
                (data && data.length) ?
                    <>
                        <Button size='50' imgSRC={leftCaretSVG} type='image' ariaLabel='Change to the previous challenges page'
                                marginatedHorizontal={true} marginated={true} text='Back' callback={lazyLoad.previousEntitites}/>
                        <Button size='50' imgSRC={rightCaretSVG} type='image' ariaLabel='Next challenges page' marginated={true}
                                text='More' callback={lazyLoad.nextEntities}/>
                    </>
                    : null
            }


        </>
    )
}
export default ChallengesList