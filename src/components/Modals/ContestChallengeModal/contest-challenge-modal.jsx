import './contest-challenge-modal.css'
import LighthouseSVG from "../../../utils/imgs/SVGs/LighthouseSVG.svg";
import Input from "../../Input/input";
import SelectedFiles from "../../SelectedFiles/selected-files";
import Button from "../../Button/button";
import ChallengePicker from "../../ChallengePicker/challenge-picker";
import {useDispatch, useSelector} from "react-redux";
import {getModalContent, getSelectedChallenge} from "../../../utils/store/utils-store/utils-store-selectors";
import useFetchHook from "../../../utils/hooks/fetchHook";
import {setModal, setModalContent} from "../../../utils/store/utils-store/utils-store-actions";
import Form from "../../Form/form";
const ContestChallengeModal = () => {
    const selectedChallenge = useSelector(getSelectedChallenge)
    const data = useSelector(getModalContent).content
    const sendRequest = useFetchHook()
    const dispatch = useDispatch()
    const successCallback = () => {
        dispatch(setModal(true))
        dispatch(setModalContent({
            type: 'success',
            content: undefined
        }))
    }

    const addChallenges = async (event) => {
        event.preventDefault()
        const dataFetch = {
            selectedChallenge
        }
        const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/challenge-contest/${data}`,JSON.stringify(dataFetch) , 'POST', false, successCallback)

    }
    return (
        <div className='error-wrapper'>
            <div className="error-header">
                {/*<img onClick={backOneStep} className='icon-svg' src={BackSVG} alt="Back"/>*/}
                <img src={LighthouseSVG} alt=""/>
                <h2>Create Contest!</h2>
            </div>
            <div className="error-content create-lighthouse-content">
                <p>Let's configure the <b>Contest</b> to verify the enlightment of the people!</p>
                <ChallengePicker authorColor='dark' />

                <Form className='enroll-inputs' onSubmit={addChallenges}>
                    <Button color='light' marginated={true} buttonType='submit' text='Add challenges' type='normal'/>
                </Form>
            </div>
        </div>
    )
}
export default ContestChallengeModal