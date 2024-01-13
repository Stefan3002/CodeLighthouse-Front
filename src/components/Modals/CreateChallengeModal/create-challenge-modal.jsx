import './create-challenge-modal.css'
import LighthouseSVG from "../../../utils/imgs/SVGs/LighthouseSVG.svg";
import Input from "../../Input/input";
import Button from "../../Button/button";
import useFetchHook from "../../../utils/hooks/fetchHook";
import {useDispatch, useSelector} from "react-redux";
import {getLanguage} from "../../../utils/store/utils-store/utils-store-selectors";
import LanguageSelector from "../../LanguageSelector/language-selector";
import {getUser} from "../../../utils/store/user-store/user-store-selectors";
import EditorCard from "../../EditorCard/editor-card";
import {useState} from "react";
import DifficultyPicker from "../../DifficultyPicker/difficulty-picker";
import useUpdateData from "../../../utils/hooks/updateDataHook";
import {setModalContent} from "../../../utils/store/utils-store/utils-store-actions";
import useValidate from "../../../utils/hooks/validateHook";
import createChallengeValidations from '../../../utils/validation/createChallengeValidations.json'
const CreateChallengeModal = () => {
    const validateInput = useValidate()
    const language = useSelector(getLanguage)
    const sendRequest = useFetchHook()
    const user = useSelector(getUser)
    const updateData = useUpdateData()
    const dispatch = useDispatch()

    const [trueFunctionCode, setTrueFunctionCode] = useState('')
    const [description, setDescription] = useState('')
    const [randomFunctionCode, setRandomFunctionCode] = useState('')
    const [hardFunctionCode, setHardFunctionCode] = useState('')

    const successCallback = async () => {
        dispatch(setModalContent({
            type: 'success',
            data: 'Challenge created!'
        }))
        await updateData(true)
    }

    const createNewChallenge = async (event) => {
        event.preventDefault()

        let valid = true
        const title = event.target[0].value

        valid = validateInput('Title', title, {inputNull: createChallengeValidations.title.inputNull, inputMin: createChallengeValidations.title.inputMin})
        if(!valid)
            return

        valid = validateInput('Description', description, {inputNull: createChallengeValidations.description.inputNull, inputMin: createChallengeValidations.description.inputMin})
        if(!valid)
            return

        valid = validateInput('True Function', trueFunctionCode, {inputNull: createChallengeValidations.trueFunction.inputNull})
        if(!valid)
            return

        valid = validateInput('True Function', trueFunctionCode, {inputNull: createChallengeValidations.trueFunction.inputNull})
        if(!valid)
            return

        valid = validateInput("Random Function", randomFunctionCode, {inputNull: createChallengeValidations.randomFunction.inputNull})
        if(!valid)
            return

        valid = validateInput("Hard Function", hardFunctionCode, {inputNull: createChallengeValidations.hardFunction.inputNull})
        if(!valid)
            return

        const privateChallenge = event.target[5].checked
        // const description = event.target[1].value
        // const trueFunction = event.target[2].value
        // const randomFunction = event.target[3].value



        const data = {
            privateChallenge, title, description, trueFunction: trueFunctionCode, randomFunction: randomFunctionCode, hardFunction: hardFunctionCode, language, userId: user.user_id
        }
        const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/challenges`,JSON.stringify(data) , 'POST', false, successCallback)

    }


    return (
        // <Transition mode='fullscreen'>
        <div className='error-wrapper create-challenge-wrapper'>
            <div className="error-header create-challenge-header">
                <img src={LighthouseSVG} alt=""/>
                <h2>Create a new challenge!</h2>
            </div>
            <form onSubmit={createNewChallenge} className="error-content create-challenge-content">
                <p>Give your challenge a <b>name.</b></p>
                <Input type='text' placeholder='Name'/>
                <DifficultyPicker type='languages'/>
                <div className="create-challenge-content-top">
                    <div className="create-challenge-content-group">
                        <p>And the <b>statement.</b> Write plain <b>html</b> for this part.</p>
                        <EditorCard value='E.g: <p>This is my challenge</p>'
                                    onChangeHandler={description => setDescription(description)} showAuthor={false}
                                    color='light' type='challenge-code'/>
                    </div>
                    <div className="create-challenge-content-group">
                        <p>Write the <b>true function</b> of the challenge. </p>
                        <EditorCard value='E.g: def true_function(inputs):
    a = inputs[0]
    b = inputs[1]
    return a * b' onChangeHandler={code => setTrueFunctionCode(code)} showAuthor={false} color='light'
                                    type='challenge-code'/>

                    </div>

                </div>
                <div className="create-challenge-content-group">
                    <p>Write the <b>hard function</b> of the challenge. </p>
                    <EditorCard value='E.g: def hard_function():
    tests = []
    for i in range(60):
        hard_num = i
        tests.append((hard_num,))
    return tests' onChangeHandler={code => setHardFunctionCode(code)} showAuthor={false} color='light'
                                type='challenge-code'/>

                </div>
                <div className="create-challenge-content-bottom">
                    <div className="create-challenge-content-group">
                        <p>Finally, write the <b>random function</b> that will generate the random inputs.</p>
                        <EditorCard value='E.g: import random

def random_function():
    tests = []
    for i in range(60):
        random_num = random.randint(0, 100)
        tests.append((random_num,))
    return tests' onChangeHandler={code => setRandomFunctionCode(code)} showAuthor={false} color='light'
                                    type='challenge-code'/>

                    </div>
                </div>
                <Input type="checkbox" defaultValue='checked'
                       placeholder='Private? this means only you and your students can see it. No need to be verified by the community.'/>

                <Button buttonType='submit' text='Create' type='normal'/>

            </form>
        </div>
        // </Transition>
    )
}
export default CreateChallengeModal