import './profile-page.css'
import {useEffect, useState} from "react";
import useFetchHook from "../../utils/hooks/fetchHook";
import {redirect, useNavigate, useParams} from "react-router-dom";
import Transition from "../../utils/js/transitions";
import LighthouseCard from "../LighthouseCard/lighthouse-card";
import Heading from "../Heading/heading";
import ChallengeCard from "../ChallengeCard/challenge-card";
import {useDispatch, useSelector} from "react-redux";
import {getUser} from "../../utils/store/user-store/user-store-selectors";
import {setIsLoggedIn, setStatus} from "../../utils/store/auth-store/auth-store-actions";
import {setUser} from "../../utils/store/user-store/user-store-actions";
import Score from "../Score/score";
import Button from "../Button/button";
const ProfilePage = () => {
    const user = useSelector(getUser)
    const userID = useParams()['id']
    const sendRequest = useFetchHook()
    const [data, setData] = useState(undefined)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        (async () => {
            const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/users/${userID}`, undefined, 'GET', true)
            setData(res)
            dispatch(setUser(res))
        })()
    }, []);

    const logOut = () => {
        dispatch(setIsLoggedIn(false))
        dispatch(setStatus('idle'))
        // dispatch(setUser(null))
        navigate('/auth')
    }

    if(data)
    return (
        <Transition mode='fullscreen'>
        <div className='wrapper profile-page'>
            <div className="profile-header">
                <h1>{data.username}</h1>
                <Score data={data.score} />
                <p onClick={logOut}>Log out</p>
            </div>
            <Heading text='Enrolled Lighthouses' />
            <div className="profile-lighthouses">
                {data.enrolled_lighthouses.map(lighthouse => {
                    return <LighthouseCard data={lighthouse} />
                })}
            </div>
            {userID == user.id ? <><Heading text='Assignments' />
                <div className="profile-assignments-filters">
                    <Button type='normal' text='All' />
                    <Button type='normal' text='Finished' />
                    <Button type='normal' text='Unfinished' />
                </div>
                <div className="unfinished-assignments">
                    {data.enrolled_lighthouses.map(lighthouse => {
                        return lighthouse.assignments.map(assignment => {
                            return assignment.users.map(assignedUser => {
                                if (assignedUser.user_id === user.user_id)
                                    return <ChallengeCard completed={user.solved_challenges.includes(assignment.challenge.id)} type='assignment' detailedAssignment={true}
                                                          challenge={assignment}/>
                            })
                        })
                    })}
                </div></> : null}

            {userID == user.id ? <><Heading text='Authored Challenges' />
                <div className="unfinished-assignments">
                    {data.authored_challenges.map(challenge => {
                        return <ChallengeCard type='small-card' challenge={challenge}/>
                    })}
                </div></> : null}
        </div>
        </Transition>
    )
}
export default ProfilePage