import './profile-page.css'
import {useEffect, useRef, useState} from "react";
import useFetchHook from "../../utils/hooks/fetchHook";
import {Link, redirect, useNavigate, useParams} from "react-router-dom";
import Transition from "../../utils/js/transitions";
import LighthouseCard from "../Lighthouse/LighthouseCard/lighthouse-card";
import Heading from "../Heading/heading";
import ChallengeCard from "../ChallengeCard/challenge-card";
import {useDispatch, useSelector} from "react-redux";
import {getUser} from "../../utils/store/user-store/user-store-selectors";
import {setIsLoggedIn, setStatus, setToken} from "../../utils/store/auth-store/auth-store-actions";
import {setUser} from "../../utils/store/user-store/user-store-actions";
import Score from "../Score/score";
import Button from "../Button/button";
import LogOutSVG from '../../utils/imgs/SVGs/SignOutSVG.svg'
import SettingsSVG from '../../utils/imgs/SVGs/SettingsSVG.svg'
import AssignmentsList from "../AssignmentsList/assignments-list";
import TopSection from "../TopSection/top-section";
import AuthorName from "../AuthorName/author-name";
import Difficulty from "../Difficulty/difficulty";
import {AnimatePresence} from "framer-motion";
import EnrolledLighthouses from "../EnrolledLighthouses/enrolled-lighthouses";
import Missing from "../Missing/missing";
import WithInfo from "../WithInfo/with-info";
import {setError, setModal, setModalContent} from "../../utils/store/utils-store/utils-store-actions";
import ClockSVG from "../../utils/imgs/SVGs/ClockSVG.svg";
const ProfilePage = () => {
    const user = useSelector(getUser)
    const userID = useParams()['id']
    const sendRequest = useFetchHook()
    const [data, setData] = useState(undefined)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [filter, setFilter] = useState('All')
    const mostTimeLoggedIn = useRef(0)
    const timeOnChallenges = useRef({})

    useEffect(() => {
        (async () => {
            dispatch(setError(false))
            const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/users/${userID}`, undefined, 'GET', false, undefined, ['Getting your profile', 'Found it!', 'Nope, sorry, it was someone else', 'Still searching!'])

            if(res.logs && res.logs.length)
                for(const log of res.logs)
                    if(log.type === 'auth')
                        mostTimeLoggedIn.current = Math.max(mostTimeLoggedIn.current, (new Date(log.time_out) - new Date(log.time_in)))

            if(res.logs && res.logs.length)
                for(const log of res.logs)
                    if(log.type === 'challenge') {
                        if(!timeOnChallenges.current[log.challenge])
                            timeOnChallenges.current[log.challenge] = 0
                        timeOnChallenges.current[log.challenge] += ((new Date(log.time_out) - new Date(log.time_in)) / 60000)
                    }

            setData(res)
            if(user.id === res?.id)
                dispatch(setUser(res))
        })()
    }, []);

    const logOut = () => {
        dispatch(setIsLoggedIn(false))
        dispatch(setUser(null))
        dispatch(setToken(null))
        dispatch(setStatus('idle'))
        // dispatch(setUser(null))
        navigate('/auth')
    }
    const openSettings = () => {
        dispatch(setModal(true))
        dispatch(setModalContent({
            type: 'account-settings',
            content: user.user_id
        }))
    }

    const filterAssignments = (category) => {
        setFilter(category)
    }
    // console.log('ccccc', data, Object.values(timeOnChallenges.current))
    if(data)
    return (
        <AnimatePresence>
        <Transition mode='fullscreen'>
            <TopSection title={data.username} nameOfPage='Profile' children={
                <>
                    <AuthorName author={data} />
                    <div className='profile-top-bar'>
                        <WithInfo data='Rank and points'><Score data={data.score} /></WithInfo>
                        {+userID === user.id &&
                            <WithInfo clickHandler={logOut} data='Log out'>
                                <div className='bar-item'>
                                    <img className='icon-svg' src={LogOutSVG} alt=""/>
                                    <p>Log out</p>
                                </div>
                            </WithInfo>}
                        {+userID === user.id &&
                            <WithInfo clickHandler={() => null} data='The largest amount of time that you spent logged in in a single session'>
                                <div className='bar-item'>
                                    <img src={ClockSVG} className='icon-svg' alt=""/>
                                    <p>{Math.round(mostTimeLoggedIn.current / 60000)} minutes</p>
                                </div>
                            </WithInfo>
                        }
                        {+userID === user.id &&
                            <WithInfo clickHandler={() => null} data='The largest amount of time that you spent trying to solve a single challenge'>
                                <div className='bar-item'>
                                    <img src={ClockSVG} className='icon-svg' alt=""/>
                                    <p>{Math.round(Object.values(timeOnChallenges.current).reduce((acc, el) => Math.max(acc, el), 0))} minutes</p>
                                </div>
                            </WithInfo>
                        }
                        {+userID === user.id &&
                            <WithInfo clickHandler={openSettings} data='Account settings'>
                                <div className='bar-item'>
                                    <img src={SettingsSVG} className='icon-svg' alt=""/>
                                    <p>Settings</p>
                                </div>
                            </WithInfo>
                        }
                    </div>

                </>
            }/>

            <div className='wrapper profile-page'>
                <div className="profile-header">


                </div>

                {data.enrolled_lighthouses?.length &&
                    <>
                        <Heading text='Enrolled Lighthouses' />
                        <div className="profile-lighthouses">
                            <EnrolledLighthouses data={data} />
                        </div>
                    </>
                }


                {userID == user.id ? <><Heading text='Assignments' />
                    <div className="profile-assignments-filters">
                        <Button callback={() => filterAssignments('All')} type='normal' text='All' />
                        <Button callback={() => filterAssignments('Finished')} type='normal' text='Finished' />
                        <Button callback={() => filterAssignments('Unfinished')} type='normal' text='Unfinished' />
                    </div>
                    <div className="unfinished-assignments">
                        <AssignmentsList filters={true} user={user} data={data} filter={filter} />
                    </div></> : null}

                {userID == user.id ? <><Heading text='Authored Challenges' />
                    <div className="unfinished-assignments">
                        {data.authored_challenges.length ? data.authored_challenges.map(challenge => {
                            return <ChallengeCard authoColor='dark' type='small-card' challenge={challenge}/>
                        }) : <Missing text='You did not author any challenge yet!' />}
                    </div></> : null}

        {/*        Public solved challenges*/}

                {data.solved_challenges?.length &&
                    <>
                        <Heading text='Solved Challenges' />
                        <div className='solved_challenges'>
                            {data.solved_challenges.map(solved_challenge => {
                                return <Link to={`/app/challenges/${solved_challenge.slug}`}><div className="solved_challenge">
                                    <p>{solved_challenge.title}</p>
                                </div></Link>
                            })}
                        </div>
                    </>

                }


            </div>
        </Transition>
        </AnimatePresence>
    )
}
export default ProfilePage