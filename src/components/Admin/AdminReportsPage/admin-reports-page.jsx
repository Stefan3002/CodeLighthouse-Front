import './admin-reports-page.css'
import {useEffect, useState} from "react";
import useFetchHook from "../../../utils/hooks/fetchHook";
import useUpdateData from "../../../utils/hooks/updateDataHook";
import ChallengeCard from "../../ChallengeCard/challenge-card";
import Heading from "../../Heading/heading";
import ClosedReportsList from "../../ClosedReportsList/closed-reports-list";
import Missing from "../../Missing/missing";
const AdminReportsPage = () => {
    const [data, setData] = useState([])
    const sendRequest = useFetchHook()
    const updateData = useUpdateData()


    const closeReport = async (id) => {
        const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/reports/${id}`, undefined, 'DELETE', false, successCallback, ['Closing the report!'])
        await successCallback()
    }
    const successCallback = async () => {
        await updateData()
    }


    useEffect(() => {
        (async () => {
            const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/reports?type=open`, undefined, 'GET', false, successCallback, ['Getting the reports', 'Please try and solve them Admin!', 'Why are there so many??'])
            setData(res)
        })()
    }, []);

    // console.log('aaa', data)
    if(data)
    return (
        <div className='wrapper admin-reports-page'>
            <Heading text='Open reports' />
            {data.length ? data.map(report => {
                if(!report.closed)
                    return <ChallengeCard callback={() => closeReport(report.id)} type='report' report={report} />
            }) : <Missing text='No open reports at this time' />}
            <Heading text='Closed reports' />
            <ClosedReportsList />
        </div>
    )
}
export default AdminReportsPage