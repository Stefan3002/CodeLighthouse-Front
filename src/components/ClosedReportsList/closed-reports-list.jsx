import './closed-report-list.css'
import ChallengeCard from "../ChallengeCard/challenge-card";
import {useEffect, useState} from "react";
import useFetchHook from "../../utils/hooks/fetchHook";
import useUpdateData from "../../utils/hooks/updateDataHook";
import Missing from "../Missing/missing";
import useLazyLoadHook from "../../utils/hooks/lazyLoadHook";
import Button from "../Button/button";
import leftCaretSVG from "../../utils/imgs/SVGs/LeftCaretSVG.svg";
import rightCaretSVG from "../../utils/imgs/SVGs/RightCaretSVG.svg";
import {setModal, setModalContent} from "../../utils/store/utils-store/utils-store-actions";
import {useDispatch} from "react-redux";
const ClosedReportsList = ({type}) => {
    const LOAD_SIZE = 5
    const [data, setData] = useState([])
    const lazyLoad = useLazyLoadHook(LOAD_SIZE, setData, `${process.env.REACT_APP_SERVER_URL}/reports?type=${type}`)
    const sendRequest = useFetchHook()
    const dispatch = useDispatch()
    const closeReport = async (id) => {
        const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/reports/${id}`, undefined, 'DELETE', false, successCallback, ['Closing the report!'])
    }
    const successCallback = async () => {
        await lazyLoad.updateData()
    }
    const deleteCommentConfirm = (report) => {
        dispatch(setModal(true))
        dispatch(setModalContent({
            type: 'confirm',
            content: () => deleteComment(report),
            extraData: '<p>Are you sure you want to <strong>delete</strong> the user\'s comment?</p>'
        }))
    }
    const successDeleteCommentCallback = () => {
        dispatch(setModal(true))
        dispatch(setModalContent({
            type: 'success',
            content: 'Comment deleted!'
        }))
        // updateDataCallback()
    }
    const deleteComment = async (report) => {
        const dataFetch = {
            commentID: report.challenge.id
        }
        const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/challenges/${report.challenge.slug}/comments`, JSON.stringify(dataFetch), 'DELETE', false, successDeleteCommentCallback)
        await closeReport(report.id)
    }

    if(type === 'closed')
        return (
            <>
                <div>
                    <Button size='50' imgSRC={leftCaretSVG} type='image' ariaLabel='Change to the previous challenges page'
                            marginatedHorizontal={true} marginated={true} text='Back' callback={lazyLoad.previousEntitites}/>
                    <Button size='50' imgSRC={rightCaretSVG} type='image' ariaLabel='Next challenges page' marginated={true}
                            text='More' callback={lazyLoad.nextEntities}/>
                </div>

                <div className='closed-reports'>
                    {data && data.length ? data.map(report => {
                        return <ChallengeCard callback={undefined} type='report-closed' report={report}/>
                    }) : <Missing text='No reports here'/>}
                </div>
            </>

        )
    else if (type === 'open')
        return (
            <>
                <div>
                    <Button size='50' imgSRC={leftCaretSVG} type='image'
                            ariaLabel='Change to the previous challenges page'
                            marginatedHorizontal={true} marginated={true} text='Back'
                            callback={lazyLoad.previousEntitites}/>
                    <Button size='50' imgSRC={rightCaretSVG} type='image' ariaLabel='Next challenges page'
                            marginated={true}
                            text='More' callback={lazyLoad.nextEntities}/>
                </div>
                <div className='closed-reports'>
                    {data.length ? data.map(report => {
                        return <ChallengeCard deleteCommentConfirm={() => deleteCommentConfirm(report)} callback={() => closeReport(report.id)} type='report' report={report}/>
                    }) : <Missing text='No open reports at this time'/>}
                </div>

            </>
        )
}
export default ClosedReportsList