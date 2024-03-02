import './code-step-three.css'
import {useDispatch, useSelector} from "react-redux";
import {getUser} from "../../../utils/store/user-store/user-store-selectors";
import {useParams} from "react-router-dom";
import useFetchHook from "../../../utils/hooks/fetchHook";
import {getCode, getLanguage} from "../../../utils/store/utils-store/utils-store-selectors";
import {setModal, setModalContent} from "../../../utils/store/utils-store/utils-store-actions";
import EditorCard from "../../EditorCard/editor-card";
import Button from "../../Button/button";
import Heading from "../../Heading/heading";
const CodeStepThree = ({setCodeStep, data}) => {
    const user = useSelector(getUser)
    const slug = useParams()['slug']
    const sendRequest = useFetchHook()
    const lang = useSelector(getLanguage)
    const code = useSelector(getCode)
    const dispatch = useDispatch()

    const successCallback = (data) => {
        dispatch(setModal(true))
        dispatch(setModalContent({
            type: 'success',
            code: true,
            data: data.data
        }))
    }

    const sendCodeForCompilation = async () => {

        const reqData = {
            code,
            userId: user.user_id,
            language: lang,
            timeLimit: data.time_limit
        }
        const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/run/${slug}`,JSON.stringify(reqData) , 'POST', false, successCallback, ['The real test!', 'Get ready!', 'Aaaaaaannnnddddd...'])

    }


    if(data)
        return (
            <div key='code-step-two' className='wrapper code-page-wrapper code-page code-step code-step-one'>
                {/*<div className="code-page-text">*/}
                {/*    <p dangerouslySetInnerHTML={{__html: data.description}}></p>*/}
                {/*</div>*/}
                {/*<EditorCard value={data.codes[0].hard_tests} height='300px' type='code' headerText='Hard test cases' />*/}
                <div className='code-step-three-choice'>
                    <Heading text='Ready to submit?' />
                    <Button color='success' callback={sendCodeForCompilation} text='Submit.' />
                </div>
                <div className='code-step-three-choice'>
                    <Heading text='Nevermind' />
                    <Button callback={() => setCodeStep(1)} text='Back' />
                </div>

            </div>
        )
}

export default CodeStepThree