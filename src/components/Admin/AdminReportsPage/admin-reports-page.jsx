import './admin-reports-page.css'
import {useEffect, useState} from "react";
import useFetchHook from "../../../utils/hooks/fetchHook";
import useUpdateData from "../../../utils/hooks/updateDataHook";
import ChallengeCard from "../../ChallengeCard/challenge-card";
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
            const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/reports`, undefined, 'GET', false, successCallback, ['Getting the reports', 'Please try and solve them Admin!', 'Why are there so many??'])
            setData(res)
        })()
    }, []);

    if(data)
    return (
        <div className='wrapper admin-reports-page'>
            {data.map(report => {
                if(!report.closed)
                    return <ChallengeCard callback={() => closeReport(report.id)} type='report' report={report} />
            })}
        </div>
    )
}
export default AdminReportsPage