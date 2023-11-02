import './challenge-card.css'
import {Link} from "react-router-dom";
import {motion} from "framer-motion"
import AuthorName from "../AuthorName/author-name";
import Difficulty from "../Difficulty/difficulty";
import {useDispatch, useSelector} from "react-redux";
import {setSelectedChallenge} from "../../utils/store/utils-store/utils-store-actions";
import {getSelectedChallenge} from "../../utils/store/utils-store/utils-store-selectors";
import calendarSVG from '../../utils/imgs/SVGs/CalendarSVG.svg'
import clockSVG from '../../utils/imgs/SVGs/ClockSVG.svg'

const ChallengeCard = ({completed, challenge, idx, type = 'Big', detailedAssignment = false}) => {
    const dispatch = useDispatch()
    const selectedChallenge = useSelector(getSelectedChallenge)
    const selectChallenge = () => {
        dispatch(setSelectedChallenge(challenge.slug))
    }

    if(type === 'Big')
    return (
        <div style={{transform: idx === 2 || idx === 0 ? 'scale(.8)' : 'scale(1)'}} className="challenge-card challenge-card-home-page">
            <div className="challenge-meta-card" >
                <AuthorName author={challenge.author} />
                <Difficulty difficulty={challenge.difficulty} />
            </div>
            <div className="challenge-description-card" >
                <Link to={`/app/challenges/${challenge.slug}`}>
                    <h2>{challenge.title}</h2>
                    <p dangerouslySetInnerHTML={{__html: challenge.description}}></p>
                </Link>
            </div>
        </div>
    )
    else
    if(type === 'assignment')
        return (
            <div style={{opacity: completed ? '.4' : null}} className="challenge-card">
                <div className="challenge-meta-card" >
                    <AuthorName author={challenge.challenge.author} />
                    <Difficulty difficulty={challenge.challenge.difficulty} />
                </div>
                <div className="challenge-description-card" >
                    <Link to={`/app/challenges/${challenge.challenge.slug}`}>
                        <h2>{challenge.challenge.title}</h2>
                        <p dangerouslySetInnerHTML={{__html: challenge.challenge.description.slice(0, 200)}}></p>
                    </Link>
                </div>
                <div className="assignment-metas">
                    {detailedAssignment ? <><Link to={`/app/lighthouses/${challenge.lighthouse}/assignments`}><p>{challenge.lighthouse}</p></Link></> : null}
                    <div className="assignment-meta">
                        <img className='icon-svg' src={clockSVG} alt=""/>
                        <p>{challenge.due_time}</p>
                    </div>
                    <div className="assignment-meta">
                        <img className='icon-svg' src={calendarSVG} alt=""/>
                        <p>{challenge.due_date}</p>
                    </div>
                </div>

            </div>
        )
    else
        if(type === 'small')
            return (
                <div onClick={selectChallenge} className={selectedChallenge === challenge.slug ? 'challenge-card-small selected-challenge' : 'challenge-card-small'}>
                    <p>{challenge.slug}</p>
                    <AuthorName author={challenge.author} />
                </div>
            )
    else
        if(type === 'small-card')
            return (
                <Link to={`/app/challenges/${challenge.slug}`}>
                <div className='challenge-card-small challenge-card-small-profile'>
                    <h3>{challenge.title}</h3>
                    {/*<AuthorName author={challenge.author} />*/}
                </div>
                </Link>
            )
}
export default ChallengeCard