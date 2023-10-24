import './challenge-picker.css'
import {useEffect, useState} from "react";
import useFetchHook from "../../utils/hooks/fetchHook";
import ChallengeCard from "../ChallengeCard/challenge-card";
import Input from "../Input/input";
import Button from "../Button/button";
const ChallengePicker = () => {
    const [challenges, setChallenges] = useState([])
    const sendRequest = useFetchHook()

    useEffect(() => {
        (async () => {
            const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/challenges/0/10`, undefined, 'GET')
            setChallenges(res)
        })()
    }, []);

    const searchChallenge = (event) => {
        event.preventDefault()

    }


    if(challenges)
    return (
        <div className='challenge-picker'>
            <form onSubmit={searchChallenge} className="challenge-picker-input">
                <Input type='text' placeholder='Slug of challenge.' />
                <Button buttonType='submit' text='Search' />
            </form>
            <div className="challenges-picker">
                {challenges.map(challenge => {
                    return <ChallengeCard type='small' challenge={challenge} />
                })}
            </div>
        </div>
    )
}
export default ChallengePicker