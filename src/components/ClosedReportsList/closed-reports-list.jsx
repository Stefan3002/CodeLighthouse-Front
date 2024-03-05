import './closed-report-list.css'
import ChallengeCard from "../ChallengeCard/challenge-card";
import {useEffect, useState} from "react";
import useFetchHook from "../../utils/hooks/fetchHook";
import useUpdateData from "../../utils/hooks/updateDataHook";
import Missing from "../Missing/missing";
const ClosedReportsList = () => {

    const [data, setData] = useState([])
    const sendRequest = useFetchHook()

    useEffect(() => {
        (async () => {
            const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/reports?type=closed`, undefined, 'GET', true)
            setData(res)
        })()
    }, []);

    return (
        <div className='closed-reports'>
            {data.length ? data.map(report => {
                if(report.closed)
                    return <ChallengeCard callback={undefined} type='report-closed' report={report} />
            }) : <Missing text='No reports here' />}
        </div>
    )
}
export default ClosedReportsList