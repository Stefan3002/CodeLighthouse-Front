import './chat-bot-modal.css'
import BackSVG from "../../../utils/imgs/SVGs/BackSVG.svg";
import LighthouseSVG from "../../../utils/imgs/SVGs/LighthouseSVG.svg";
import AuthorName from "../../AuthorName/author-name";
import Input from "../../Input/input";
import Button from "../../Button/button";
import CodeOfConduct from "../../CodeOfConduct/code-of-conduct";
import {setModal} from "../../../utils/store/utils-store/utils-store-actions";
import {useDispatch} from "react-redux";
import Replicate from "replicate";
import {useEffect, useRef, useState} from "react";
import useFetchHook from "../../../utils/hooks/fetchHook";

const ChatBotModal = () => {
    const dispatch = useDispatch()
    const sendRequest = useFetchHook()
    const [chatBotResponse, setChatBotResponse] = useState('')

    const waitAnimation = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve()
            }, 301)
        })
    }

    const botResponse = async (response) => {
        setChatBotResponse(response.data)
        const responseDOM = document.querySelector('#chat-bot-response')

        responseDOM.innerHTML = ''
        console.log(response.data.split(' '))
        for(const word of response.data.split(' ')) {
            // console.log(word)
            await waitAnimation()
            const wordDOM = document.createElement('span')
            wordDOM.textContent = (word + ' ')
            wordDOM.classList.add('chat-bot-word')
            responseDOM.appendChild(wordDOM)
        }
    }
    const talkToBot = async (event) => {
        event.preventDefault()
        const prompt = event.target[0].value
        const data = {
            prompt
        }
        const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/chat-bot`, JSON.stringify(data), 'POST', false, botResponse, ['Talking to Llama', 'Sending Llama your question!', 'We LOST the question?!', 'No, it\'s here!'])
    }
    const cancelChat = () => {
        dispatch(setModal(false))
    }

    return (
        <div className='error-wrapper report-description-modal'>
            <div className="error-header">
                {/*<img onClick={backOneStep} className='icon-svg' src={BackSVG} alt="Back"/>*/}
                <img src={LighthouseSVG} alt=""/>
                <h2>Ask Llama</h2>
            </div>
            <div className="error-content report-description-content">
                {/*<h2>Hey there!</h2>*/}
                <p>Ask <strong>Llama</strong> for some help down below.</p>

                <CodeOfConduct type='chat-bot' />
                {/*<p><strong>{challenge.title}</strong> by </p>*/}
                {/*<AuthorName author={challenge.author}/>*/}
                {/*<Input type='text' placeholder='Reason for sending back / denying.' />*/}
                <form className='report-description-form' onSubmit={talkToBot}>
                    <Input placeholder='Question for Llama' required={true}/>
                    <p id='chat-bot-response'></p>
                    {/*<h2>Coming soon!</h2>*/}
                    <Input type='checkbox' placeholder='I have read the Code of Conduct' required={true}/>
                    <div className="admin-verdict-buttons">
                        <Button buttonType='submit' text='Ask' color='light'/>
                        <Button buttonType='reset' callback={cancelChat} text='Cancel' color='light'/>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default ChatBotModal