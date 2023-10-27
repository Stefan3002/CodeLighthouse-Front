import './profile-page.css'
import {useEffect, useState} from "react";
import useFetchHook from "../../utils/hooks/fetchHook";
import {useParams} from "react-router-dom";
import Transition from "../../utils/js/transitions";
import LighthouseCard from "../LighthouseCard/lighthouse-card";
import Heading from "../Heading/heading";
import ChallengeCard from "../ChallengeCard/challenge-card";
import {useSelector} from "react-redux";
import {getUser} from "../../utils/store/user-store/user-store-selectors";
const ProfilePage = () => {
    const user = useSelector(getUser)
    const userID = useParams()['id']
    const sendRequest = useFetchHook()
    const [data, setData] = useState(undefined)

    useEffect(() => {
        (async () => {
            const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/users/${userID}`, undefined, 'GET', true)
            setData(res)
        })()
    }, []);

    console.log(userID, user)

    if(data)
    return (
        <Transition mode='fullscreen'>
        <div className='wrapper profile-page'>
            <div className="profile-header">
                <h1>{data.username}</h1>
            </div>
            <Heading text='Enrolled Lighthouses' />
            <div className="profile-lighthouses">
                {data.enrolled_lighthouses.map(lighthouse => {
                    return <LighthouseCard data={lighthouse} />
                })}
            </div>
            {userID == user.id ? <><Heading text='Assignments' />
                <div className="unfinished-assignments">
                    {data.enrolled_lighthouses.map(lighthouse => {
                        return lighthouse.assignments.map(assignment => {
                            return assignment.users.map(assignedUser => {
                                if (assignedUser.user_id === user.user_id)
                                    return <ChallengeCard type='assignment' detailedAssignment={true}
                                                          challenge={assignment}/>
                            })
                        })
                    })}
                </div></> : null}
        </div>
        </Transition>
    )
}
export default ProfilePage