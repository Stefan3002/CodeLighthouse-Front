import './code-page.css'
import {useParams} from "react-router-dom";
import Transition from "../../../utils/js/transitions";
import {useEffect, useState} from "react";
import useFetchHook from "../../../utils/hooks/fetchHook";
import {useDispatch, useSelector} from "react-redux";
import {getCode, getLanguage, getLogsQueue} from "../../../utils/store/utils-store/utils-store-selectors";
import Button from "../../Button/button";
import {setLogsQueue, setModal, setModalContent} from "../../../utils/store/utils-store/utils-store-actions";
import ChallengeMeta from "../../ChallengeMeta/challenge-meta";
import {getUser} from "../../../utils/store/user-store/user-store-selectors";
import EditorCard from "../../EditorCard/editor-card";
import CodeStepOne from "../CodeStepOne/code-step-one";
import CodeStepTwo from "../CodeStepTwo/code-step-two";
import {AnimatePresence} from "framer-motion";
import CodeStepThree from "../CodeStepThree/code-step-three";
const CodePage = () => {
    const [codeStep, setCodeStep] = useState(1)
    const slug = useParams()['slug']
    const sendRequest = useFetchHook()
    const [data, setData] = useState(undefined)
    const dispatch = useDispatch()
    const logsQueue = useSelector(getLogsQueue)

    useEffect(() => {
        (async () => {
            const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/challenges/${slug}`, undefined, 'GET', true)
            setData(res)
        })()

        const dataReq = {
            time: new Date().getTime(),
            type: 'challenge-in',
            challenge: slug
        }
        const res = sendRequest(`${process.env.REACT_APP_SERVER_URL}/logs`, JSON.stringify(dataReq), 'POST', true, undefined)

        dispatch(setLogsQueue(
            [...logsQueue,
                {
                    type: 'challenge-out',
                    challenge: slug
                }
                ]
        ))

        const checkedOutChallenge = () => {
            const newLogs = logsQueue.filter(log => log.slug === slug)
            console.log('filtered: ', newLogs)
            dispatch(setLogsQueue(newLogs))
        }

        return () => {
            const dataReq = {
                type: 'challenge-out',
                challenge: slug
            }
            const res = sendRequest(`${process.env.REACT_APP_SERVER_URL}/logs`, JSON.stringify(dataReq), 'POST', true, checkedOutChallenge)
        }

    }, []);


    if(data)
    return (
        <Transition mode='fullscreen'>
            <div className="code-page-wrapper">
                <AnimatePresence mode='wait'>
                    {codeStep === 1 ?
                        <Transition modalContent='one' mode='codeStep'>
                            <CodeStepOne setCodeStep={setCodeStep} data={data} />
                        </Transition> : codeStep === 2 ?
                            <Transition modalContent='two' mode='codeStep'>
                                <CodeStepTwo setCodeStep={setCodeStep} data={data} />
                            </Transition> : codeStep === 3 ?
                                <Transition modalContent='three' mode='codeStep'>
                                    <CodeStepThree setCodeStep={setCodeStep} data={data} />
                                </Transition> : null}
                </AnimatePresence>
            </div>
            <ChallengeMeta data={data} />
        </Transition>
    )
}
export default CodePage