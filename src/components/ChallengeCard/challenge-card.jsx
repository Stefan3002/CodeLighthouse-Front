import './challenge-card.css'
import {Link} from "react-router-dom";
import {AnimatePresence, motion} from "framer-motion"
import AuthorName from "../AuthorName/author-name";
import Difficulty from "../Difficulty/difficulty";
import {useDispatch, useSelector} from "react-redux";
import {setSelectedChallenge} from "../../utils/store/utils-store/utils-store-actions";
import {getSelectedChallenge} from "../../utils/store/utils-store/utils-store-selectors";
import calendarSVG from '../../utils/imgs/SVGs/CalendarSVG.svg'
import clockSVG from '../../utils/imgs/SVGs/ClockSVG.svg'
import DateTime from "../DateTime/date-time";
import Button from "../Button/button";

const ChallengeCard = ({assignment = undefined, noLink = false, callback = undefined, report = undefined, authoColor = 'light', completed, challenge, idx, type = 'Big', detailedAssignment = false}) => {
    const dispatch = useDispatch()
    const selectedChallenge = useSelector(getSelectedChallenge)
    const selectChallenge = () => {
        dispatch(setSelectedChallenge(challenge.slug))
    }

    const assignmentCardAnimationParams = {
        initial: {
            scale: 0,
            opacity: 0
        },
        animate: {
            scale: 1,
            opacity: 1
        },
        exit: {
            opacity: 0,
            scale: 0
        },
        transition: {
            ease: 'easeInOut',
            duration: .3
        }
    }

    if(type === 'Big')
    return (
        <div style={{transform: idx === 2 || idx === 0 ? 'scale(.8)' : 'scale(1)'}} className="challenge-card challenge-card-home-page">
            <div className="challenge-meta-card" >
                <AuthorName color={authoColor} author={challenge.author} />
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
            <motion.div key={`challenge-${challenge.id}`} {...assignmentCardAnimationParams} style={{opacity: completed ? '.4' : null}} className="assignment-challenge-card">
                {/*<div className="challenge-meta-card" >*/}
                {/*    <AuthorName color={authoColor} author={challenge.challenge.author} />*/}
                {/*    <Difficulty difficulty={challenge.challenge.difficulty} />*/}
                {/*</div>*/}
                <div className="challenge-description-card-assignment" >
                    <h2>{assignment.title}</h2>
                    <p dangerouslySetInnerHTML={{__html: assignment.description.slice(0, 200)}}></p>

                    <Link to={`/app/challenges/${challenge.challenge.slug}`}>
                        <div className="assignment-challenge">
                            <p>Challenge:</p>
                            <h2>{challenge.challenge.title}</h2>
                            {/*<p dangerouslySetInnerHTML={{__html: challenge.challenge.description.slice(0, 30)}}></p>*/}
                        </div>
                    </Link>
                </div>
                <div className="assignment-metas">
                    {detailedAssignment ? <><Link to={`/app/lighthouses/${challenge.lighthouse.id}/assignments`}><p>{challenge.lighthouse.name}</p></Link></> : null}
                    <DateTime icon={clockSVG} data={challenge.due_time} />
                    <DateTime icon={calendarSVG} data={challenge.due_date} />
                </div>

            </motion.div>
        )
    else
        if(type === 'small')
            return (
                <div onClick={selectChallenge} className={selectedChallenge === challenge.slug ? 'challenge-card-small selected-challenge' : 'challenge-card-small'}>
                    <p>{challenge.slug}</p>
                    <AuthorName color={authoColor} author={challenge.author} />
                </div>
            )
    else
        if(type === 'small-card') {
             if(!noLink)
                return (
                    <Link to={`/app/challenges/${challenge.slug}`}>
                        <div className='challenge-card-small challenge-card-small-profile'>
                            <h3>{challenge.title}</h3>
                            {!challenge.private && challenge.public ? <p>Public.</p> :
                                !challenge.private ? <>
                                    <p>Not yet public!</p>
                                    <p>{challenge.status}</p>
                                </> : <p>Private.</p>}

                            {/*<AuthorName author={challenge.author} />*/}
                        </div>
                    </Link>
                )
            else
                 return (
                     <div className='challenge-card-small challenge-card-small-profile'>
                         <h3>{challenge.title}</h3>
                         {!challenge.private && challenge.public ? <p>Public.</p> :
                             !challenge.private ? <>
                                 <p>Not yet public!</p>
                                 <p>{challenge.status}</p>
                             </> : <p>Private.</p>}

                         {/*<AuthorName author={challenge.author} />*/}
                     </div>
                 )
        }
        else
        if(type === 'report')
            return (
                    <div className='challenge-card-small challenge-card-report'>
                        <Link to={`/app/challenges/${report.challenge.slug}`}>
                            <h3>{report.challenge.title}</h3>
                            <p>{report.reason}</p>
                        </Link>
                        <AuthorName color='dark' author={report.challenge.author} />
                        <p>{report.comment}</p>
                        <h3>Assigned admin</h3>
                        <AuthorName color='dark' author={report.assigned_admin} />
                        <Button ariaLabel='Close the report' marginated={true} callback={callback} text='Close report' color='dark' type='normal' />
                    </div>

            )
        else
        if(type === 'report-closed')
            return (
                <div className='challenge-card-small challenge-card-report'>
                    <Link to={`/app/challenges/${report.challenge.slug}`}>
                        <h3>{report.challenge.title}</h3>
                        <p>{report.reason}</p>
                    </Link>
                    {/*<AuthorName color='dark' author={report.challenge.author} />*/}
                    <p>{report.comment}</p>
                    {/*<h3>Assigned admin</h3>*/}
                    {/*<AuthorName color='dark' author={report.assigned_admin} />*/}
                    {/*<Button marginated={true} callback={callback} text='Close report' color='dark' type='normal' />*/}
                </div>

            )
}
export default ChallengeCard