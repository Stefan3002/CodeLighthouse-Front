import './modify-challenge-modal.css'
import LighthouseSVG from "../../../utils/imgs/SVGs/LighthouseSVG.svg";
import Input from "../../Input/input";
import DifficultyPicker from "../../DifficultyPicker/difficulty-picker";
import Button from "../../Button/button";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getLanguage, getModalContent} from "../../../utils/store/utils-store/utils-store-selectors";
import useFetchHook from "../../../utils/hooks/fetchHook";
import {getUser} from "../../../utils/store/user-store/user-store-selectors";
import {useNavigate} from "react-router-dom";
import {setModal} from "../../../utils/store/utils-store/utils-store-actions";
import {slugify} from "../../../utils/js/slugify";
const ModifyChallengeModal = () => {
    const modalContent = useSelector(getModalContent)
    const sendRequest = useFetchHook()
    const selectedLang = useSelector(getLanguage)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const updateChallenge = async (event) => {
        event.preventDefault()
        const title = event.target[0].value
        const description = event.target[1].value
        const trueFunction = event.target[2].value
        const randomFunction = event.target[3].value


        const data = {
            title, description, trueFunction, randomFunction, language: selectedLang
        }
        const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/challenges/${modalContent.data.slug}`,JSON.stringify(data) , 'PUT', false, () => updateChallengeSuccess(title))

    }

    const updateChallengeSuccess = (newSlug) => {
        dispatch(setModal(false))
        navigate(`/app/challenges/${slugify(newSlug)}`)
    }

    return (
        // <Transition mode='fullscreen'>
        <div className='error-wrapper create-challenge-wrapper'>
            <div className="error-header create-challenge-header">
                <img src={LighthouseSVG} alt=""/>
                <h2>Update your challenge!</h2>
            </div>

            <form onSubmit={updateChallenge} className="error-content create-challenge-content">
                <p>Give your challenge a <b>new, awesome name.</b></p>
                <Input type='text' placeholder='Name' value={modalContent.data.title}/>
                <DifficultyPicker type='languages' />
                <div className="create-challenge-content-top">
                    <div className="create-challenge-content-group">
                        <p>And the <b>statement.</b> Write plain <b>html</b> for this part.</p>
                        <Input value={modalContent.data.description} type='textarea' rows='30' cols='80'/>
                    </div>
                    <div className="create-challenge-content-group">
                        <p>Write the <b>true function</b> of the challenge. </p>
                        <Input value={modalContent.data.codes.filter(code => code.language === selectedLang)[0].solution} type='textarea' rows='30' cols='80'/>
                    </div>

                </div>
                <div className="create-challenge-content-bottom">
                    <div className="create-challenge-content-group">
                        <p>Finally, write the <b>random function</b> that will generate the random inputs.</p>
                        <Input value={modalContent.data.codes.filter(code => code.language === selectedLang)[0].random_tests} type='textarea' rows='30' cols='80'/>
                    </div>
                </div>

                <Button buttonType='submit' text='Update' type='normal'/>

            </form>
        </div>
    )
}
export default ModifyChallengeModal