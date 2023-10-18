import './add-challenge-page.css'
import Input from "../Input/input";
import DifficultyPicker from "../DifficultyPicker/difficulty-picker";
import Button from "../Button/button";
import Transition from "../../utils/js/transitions";
import useFetchHook from "../../utils/hooks/fetchHook";
const AddChallengePage = () => {
    const sendRequest = useFetchHook()

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }


    const addChallenge = async (event) => {
        event.preventDefault()
        const title = event.target[0].value
        const description = event.target[1].value

        fetch(`${process.env.REACT_APP_SERVER_URL}/auth`, {
            method: 'GET',
            credentials: 'include'
        })
            .then((data) => {
                data.json().then((dataJson) => {
                    console.log(dataJson)
                })
            })

        const csrftoken = getCookie('csrftoken');
        console.log('toakene!', csrftoken, document.cookie)
        // const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/auth`, {
        //     title,
        //     description
        // }, 'GET')
        // console.log('AICICICIIC', res)
        //
        // sendRequest(`${process.env.REACT_APP_SERVER_URL}/challenges`, {
        //     title,
        //     description
        // }, 'POST')
    }

    return (
        <Transition mode='fullscreen'>
        <div className='add-challenge-page wrapper'>
            <div className="add-challenge-left">
                <form onSubmit={addChallenge}>
                    <Input type='text' placeholder='Title of the challenge' />
                    <Input type='textarea' placeholder='Description of the challenge' />
                    <Button text='Add Challenge'  />
                </form>
            </div>
            <div className="add-challenge-right">
                <h3>Choose the required enlightening level.</h3>
                <DifficultyPicker />
            </div>
        </div>
        </Transition>
    )
}
export default AddChallengePage