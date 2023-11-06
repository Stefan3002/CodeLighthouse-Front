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
import LogOutSVG from '../../utils/imgs/SVGs/SignOutSVG.svg'
import AssignmentsList from "../AssignmentsList/assignments-list";
import TopSection from "../TopSection/top-section";
import AuthorName from "../AuthorName/author-name";
import Difficulty from "../Difficulty/difficulty";
const ProfilePage = () => {
    const user = useSelector(getUser)
    const userID = useParams()['id']
    const sendRequest = useFetchHook()
    const [data, setData] = useState(undefined)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [filter, setFilter] = useState('All')

    useEffect(() => {
        (async () => {
            const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/users/${userID}`, undefined, 'GET', true)
            setData(res)
            if(user.id === res.id)
                dispatch(setUser(res))
        })()
    }, []);

    const logOut = () => {
        dispatch(setIsLoggedIn(false))
        dispatch(setUser(null))
        dispatch(setStatus('idle'))
        // dispatch(setUser(null))
        navigate('/auth')
    }

    const filterAssignments = (category) => {
        setFilter(category)
    }
    if(data)
    return (
        <Transition mode='fullscreen'>
            <TopSection title={data.username} nameOfPage='Profile' children={
                <>
                    <AuthorName author={data} />
                    <div className='profile-top-bar'>
                        <Score data={data.score} />
                        {+userID === user.id ? <img onClick={logOut} className='icon-svg' src={LogOutSVG} alt=""/> : null}
                    </div>
                </>
            } />

            <div className='wrapper profile-page'>
            <div className="profile-header">


            </div>
            <Heading text='Enrolled Lighthouses' />
            <div className="profile-lighthouses">
                {data.enrolled_lighthouses.map(lighthouse => {
                    return <LighthouseCard data={lighthouse} />
                })}
            </div>
            {userID == user.id ? <><Heading text='Assignments' />
                <div className="profile-assignments-filters">
                    <Button callback={() => filterAssignments('All')} type='normal' text='All' />
                    <Button callback={() => filterAssignments('Finished')} type='normal' text='Finished' />
                    <Button callback={() => filterAssignments('Unfinished')} type='normal' text='Unfinished' />
                </div>
                <div className="unfinished-assignments">
                    <AssignmentsList user={user} data={data} filter={filter} />
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