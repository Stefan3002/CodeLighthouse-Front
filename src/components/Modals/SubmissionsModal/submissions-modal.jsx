import './submissions-modal.css'
import LighthouseSVG from "../../../utils/imgs/SVGs/LighthouseSVG.svg";
import Input from "../../Input/input";
import DifficultyPicker from "../../DifficultyPicker/difficulty-picker";
import Button from "../../Button/button";
import ErrorSVG from "../../../utils/imgs/ErrorSVG.svg";
import EditorCard from "../../EditorCard/editor-card";
import {useSelector} from "react-redux";
import {getModalContent} from "../../../utils/store/utils-store/utils-store-selectors";
import {useEffect, useRef, useState} from "react";
import useFetchHook from "../../../utils/hooks/fetchHook";
import {setError} from "../../../utils/store/utils-store/utils-store-actions";
import useLazyLoadHook from "../../../utils/hooks/lazyLoadHook";
const SubmissionsModal = () => {
    const LOAD_SIZE = 3
    const modalContent = useSelector(getModalContent).data
    const [data, setData] = useState([])
    const lazyLoad = useLazyLoadHook(LOAD_SIZE, setData,`${process.env.REACT_APP_SERVER_URL}/submissions/${modalContent.assignmentId}?user=${modalContent.userId}`)

    //
    // useEffect(() => {
    //     (async () => {
    //         const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/submissions/${modalContent.assignmentId}?user=${modalContent.userId}&start=0&end=${LOAD_SIZE}`, undefined, 'GET', true)
    //         setData(res)
    //     })()
    // }, []);


    // console.log('aaa', data)
    return (
        <div className='error-wrapper submissions-modal'>
            <div className="error-header">
                <img src={LighthouseSVG} alt=""/>
                <h2>Submissions</h2>
            </div>
            <Button color='light' ariaLabel='See more submissions' marginatedHorizontal={true} marginated={true} text='Back' callback={lazyLoad.previousEntitites} />
            <Button color='light' ariaLabel='Previous submissions' marginated={true} text='More' callback={lazyLoad.nextEntities} />
            <div className="error-content submissions-content">
                {data.map((submission, idx) => {
                    if(idx % 2 === 0)
                        return <div>
                            <p>{submission.challenge}</p>
                            <EditorCard color='light' submission={submission} author={submission.user} type='submission' />
                        </div>
                })}
            </div>
        </div>
    )
}
export default SubmissionsModal