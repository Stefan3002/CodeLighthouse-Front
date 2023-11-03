import './create-challenge-modal.css'
import LighthouseSVG from "../../../utils/imgs/SVGs/LighthouseSVG.svg";
import Input from "../../Input/input";
import Button from "../../Button/button";
import useFetchHook from "../../../utils/hooks/fetchHook";
const CreateChallengeModal = () => {

    const sendRequest = useFetchHook()

    const createNewChallenge = async (event) => {
        event.preventDefault()
        const title = event.target[0].value
        const description = event.target[1].value
        const trueFunction = event.target[2].value
        const randomFunction = event.target[3].value

        const data = {
            title, description, trueFunction, randomFunction
        }
        const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/challenges`,JSON.stringify(data) , 'POST', false)

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
                <Input type='text' placeholder='Name' />
                <div className="create-challenge-content-top">
                    <div className="create-challenge-content-group">
                        <p>And the <b>statement.</b> Write plain <b>html</b> for this part.</p>
                        <Input type='textarea' rows='30' cols='80' placeholder='E.g: <p>This is my challenge</p>' />
                    </div>
                    <div className="create-challenge-content-group">
                        <p>Write the <b>true function</b> of the challenge. </p>
                        <Input type='textarea' rows='30' cols='80' placeholder='E.g: def true_function(inputs):
    a = inputs[0]
    b = inputs[1]
    return a * b' />
                    </div>

                </div>
                <div className="create-challenge-content-bottom">
                    <div className="create-challenge-content-group">
                        <p>Finally, write the <b>random function</b> that will generate the random inputs.</p>
                        <Input type='textarea' rows='30' cols='80' placeholder='E.g: def random_function():
    tests = []
    for i in range(1, 100):
        tests.append((i, i + 1))
    return tests' />
                    </div>
                </div>

                <Button buttonType='submit' text='Create' type='normal' />

            </form>
        </div>
        // </Transition>
    )
}
export default CreateChallengeModal