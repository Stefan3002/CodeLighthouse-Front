import './challenge-picker.css'
import {useEffect, useState} from "react";
import useFetchHook from "../../utils/hooks/fetchHook";
import ChallengeCard from "../ChallengeCard/challenge-card";
import Input from "../Input/input";
import Button from "../Button/button";
import createAssignmentValidations from "../../utils/validation/createAssignmentValidations.json";
import useValidate from "../../utils/hooks/validateHook";
import {useSelector} from "react-redux";
import {getUser} from "../../utils/store/user-store/user-store-selectors";
import {objectIn} from "../../utils/js/functions";
const ChallengePicker = ({authorColor}) => {
    const [challenges, setChallenges] = useState([])
    const sendRequest = useFetchHook()
    const validateInput = useValidate()
    const user = useSelector(getUser)

    useEffect(() => {
        (async () => {
            const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/challenges/0/10`, undefined, 'GET')
            setChallenges(res.challenges)
        })()
    }, []);

    const searchChallenge = async (event) => {
        event.preventDefault()
        let valid
        const target = event.target[0].value

        valid = validateInput('Name of challenge', target, {inputNull: createAssignmentValidations.target.inputNull})
        if(!valid)
            return

        const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/challenges-search/${target}`, undefined, 'GET')
        console.log(res)
        setChallenges(res)

    }


    if(challenges)
    return (
        <div className='challenge-picker'>
            <form onSubmit={searchChallenge} className="challenge-picker-input">
                <Input type='text' placeholder='Name of challenge.'/>
                <Button color='light' buttonType='submit' text='Search'/>
            </form>
            <p>Your challenges</p>
            <div className="challenges-picker">
                {user.authored_challenges.map(challenge => {
                    return <ChallengeCard authoColor={authorColor} type='small' challenge={challenge}/>
                })}
            </div>
            <p>Community challenges</p>
            <div className="challenges-picker">
                {challenges.map(challenge => {
                    if(!objectIn(user.authored_challenges, challenge))
                    return <ChallengeCard authoColor={authorColor} type='small' challenge={challenge}/>
                })}
            </div>
        </div>
    )
}
export default ChallengePicker