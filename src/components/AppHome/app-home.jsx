import './app-home.css'
import Transition from "../../utils/js/transitions";
import {useEffect, useState} from "react";
import useFetchHook from "../../utils/hooks/fetchHook";
const AppHome = () => {
    const sendRequest = useFetchHook()
    const [randChallenge, setRandChallenge] = useState(undefined)
    const runUserCode = (form) => {
        form.preventDefault()
        fetch(`${process.env.REACT_APP_SERVER_URL}/run`, {
            method: 'GET',
            credentials: 'include'
        })
            .then((data) => {
                data.json().then((dataJson) => {
                    console.log(dataJson)
                })
            })


        fetch(`${process.env.REACT_APP_SERVER_URL}/run`, {
            method: 'POST',
            credentials: 'include'
        })
            .then((data) => {
                data.json().then((dataJson) => {
                    console.log(dataJson)
                })
            })
    }

    useEffect(() => {
        (async () => {
            const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/random-challenge`, undefined, 'GET')
            setRandChallenge(res)
        })()
    }, []);

    if(randChallenge)
    return (
        <Transition mode='fullscreen'>
        <div className='app-home wrapper'>
            <div className="random-challenge">
                <div className="challenge-meta">
                    <p>JavaScript</p>
                    <p>JavaScript</p>
                    <p>JavaScript</p>

                </div>
                <div className="challenge-description">
                    <h2>{randChallenge[0].fields.title}</h2>
                    <p dangerouslySetInnerHTML={{__html: randChallenge[0].fields.description}}></p>
                </div>
            </div>
            {/*<form onSubmit={runUserCode} >*/}
            {/*    <input type="textarea"/>*/}
            {/*    <button type='submit'>Send</button>*/}
            {/*</form>*/}
        </div>
        </Transition>
    )
}
export default AppHome