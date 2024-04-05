import './modify-challenge-modal.css'
import LighthouseSVG from "../../../utils/imgs/SVGs/LighthouseSVG.svg";
import Input from "../../Input/input";
import DifficultyPicker from "../../DifficultyPicker/difficulty-picker";
import Button from "../../Button/button";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getLanguage, getModalContent} from "../../../utils/store/utils-store/utils-store-selectors";
import useFetchHook from "../../../utils/hooks/fetchHook";
import {getUser} from "../../../utils/store/user-store/user-store-selectors";
import {useNavigate} from "react-router-dom";
import {setModal} from "../../../utils/store/utils-store/utils-store-actions";
import {slugify} from "../../../utils/js/slugify";
import EditorCard from "../../EditorCard/editor-card";
import WithInfo from "../../WithInfo/with-info";
import useUpdateData from "../../../utils/hooks/updateDataHook";
import createChallengeValidations from "../../../utils/validation/createChallengeValidations.json";
import useValidate from "../../../utils/hooks/validateHook";
import Form from "../../Form/form";
const ModifyChallengeModal = () => {
    const validateInput = useValidate()
    // const updateData = useUpdateData()
    const modalContent = useSelector(getModalContent)
    const sendRequest = useFetchHook()
    const selectedLang = useSelector(getLanguage)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [trueFunctionCode, setTrueFunctionCode] = useState(modalContent.data.codes.filter(code => code.language === selectedLang)[0]?.solution)
    const [description, setDescription] = useState(modalContent.data.description)
    const [randomFunctionCode, setRandomFunctionCode] = useState(modalContent.data.codes.filter(code => code.language === selectedLang)[0]?.random_tests)
    const [hardFunctionCode, setHardFunctionCode] = useState(modalContent.data.codes.filter(code => code.language === selectedLang)[0]?.hard_tests)


    useEffect(() => {
        // Update the state when changing languages!
        setTrueFunctionCode(modalContent.data.codes.filter(code => code.language === selectedLang)[0]?.solution)
        setRandomFunctionCode(modalContent.data.codes.filter(code => code.language === selectedLang)[0]?.random_tests)
        setHardFunctionCode(modalContent.data.codes.filter(code => code.language === selectedLang)[0]?.hard_tests)
        setDescription(modalContent.data.description)
    }, [selectedLang]);

    const updateChallenge = async (event) => {
        event.preventDefault()
        let valid = true
        const title = event.target[0].value
        const timeLimit = event.target[4].value


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

        valid = validateInput("Time Limit", +timeLimit, {inputNull: createChallengeValidations.timeLimit.inputNull, inputMax: createChallengeValidations.timeLimit.inputMax})
        if(!valid)
            return

        const privateChallenge = event.target[6].checked

        const dataReq = {
            title, timeLimit, description, hardFunction: hardFunctionCode, trueFunction: trueFunctionCode || 'No code!', randomFunction: randomFunctionCode || 'No code!', language: selectedLang,
            private: privateChallenge
        }
        const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/challenges/${modalContent.data.slug}`,JSON.stringify(dataReq) , 'PUT', false, () => updateChallengeSuccess(title))

    }

    const updateChallengeSuccess = (newSlug) => {
        dispatch(setModal(false))
        // updateData(true)
        navigate(`/app/challenges/${slugify(newSlug)}`)
    }
    // console.log('modalContent', modalContent.data)
    return (
        // <Transition mode='fullscreen'>
        <div className='error-wrapper create-challenge-wrapper'>
            <div className="error-header create-challenge-header">
                <img src={LighthouseSVG} alt=""/>
                <h2>Update your challenge!</h2>
            </div>

            <Form onSubmit={updateChallenge} className="error-content create-challenge-content">
                <p>Give your challenge a <b>new, awesome name.</b></p>
                <Input type='text' placeholder='Name' value={modalContent.data.title}/>
                <DifficultyPicker type='languages'/>
                <div className="create-challenge-content-top">
                    <div className="create-challenge-content-group">
                        <p>And the <b>statement.</b> Write plain <b>html</b> for this part.</p>
                        <EditorCard height='300px' value={modalContent.data.description}
                                    onChangeHandler={description => setDescription(description)} showAuthor={false}
                                    color='light' type='challenge-code'/>
                        {/*<Input value={modalContent.data.description} type='textarea' rows='30' cols='80'/>*/}
                    </div>
                    <div className="create-challenge-content-group">
                        <p>Write the <b>true function</b> of the challenge. </p>
                        {modalContent.data.codes.filter(code => code.language === selectedLang).length ?
                            <EditorCard height='300px'
                                        value={modalContent.data.codes.filter(code => code.language === selectedLang)[0].solution}
                                        onChangeHandler={code => setTrueFunctionCode(code)} showAuthor={false}
                                        color='light' type='challenge-code'/>
                            : <EditorCard height='300px' onChangeHandler={code => setTrueFunctionCode(code)}
                                          showAuthor={false} color='light' type='challenge-code'/>
                        }
                    </div>

                </div>

                <div className="create-challenge-content-group">
                    <p>Write the <b>hard function</b> of the challenge. </p>
                    {modalContent.data.codes.filter(code => code.language === selectedLang).length ?
                        <EditorCard height='300px'
                                    value={modalContent.data.codes.filter(code => code.language === selectedLang)[0].hard_tests}
                                    onChangeHandler={code => setHardFunctionCode(code)} showAuthor={false} color='light'
                                    type='challenge-code'/>
                        : <EditorCard height='300px' onChangeHandler={code => setHardFunctionCode(code)}
                                      showAuthor={false} color='light' type='challenge-code'/>
                    }
                </div>

                <div className="create-challenge-content-group">
                    <p>Add a <b>time limit</b> for the challenge? </p>
                    <WithInfo clickHandler={() => null} data='The soft time limit for the whole suite of test cases (hard + random)'><Input type='number' placeholder='Time limit (s)' value={modalContent.data.time_limit}/></WithInfo>
                </div>


                <div className="create-challenge-content-bottom">
                    <div className="create-challenge-content-group">
                        <p>Finally, write the <b>random function</b> that will generate the random inputs.</p>
                        {modalContent.data.codes.filter(code => code.language === selectedLang).length ?
                            <EditorCard height='300px'
                                        value={modalContent.data.codes.filter(code => code.language === selectedLang)[0].random_tests}
                                        onChangeHandler={code => setRandomFunctionCode(code)} showAuthor={false}
                                        color='light' type='challenge-code'/>
                            : <EditorCard height='300px' onChangeHandler={code => setRandomFunctionCode(code)}
                                          showAuthor={false} color='light' type='challenge-code'/>
                        }
                    </div>
                </div>
                <Input type="checkbox" defaultValue={modalContent.data.private ? 'checked' : ''}
                       placeholder='Private'/>


                <Button color='light' marginated={true} buttonType='submit' text='Update' type='normal'/>

            </Form>
        </div>
    )
}
export default ModifyChallengeModal