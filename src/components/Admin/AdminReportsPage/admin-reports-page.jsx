import './admin-reports-page.css'
import {useEffect, useState} from "react";
import useFetchHook from "../../../utils/hooks/fetchHook";
import useUpdateData from "../../../utils/hooks/updateDataHook";
import ChallengeCard from "../../ChallengeCard/challenge-card";
import Heading from "../../Heading/heading";
import ClosedReportsList from "../../ClosedReportsList/closed-reports-list";
import Missing from "../../Missing/missing";
const AdminReportsPage = () => {
    return (
        <div className='wrapper admin-reports-page'>
            <Heading text='Open reports' />
            <ClosedReportsList type='open' />

            <Heading text='Closed reports' />
            <ClosedReportsList type='closed' />
        </div>
    )
}
export default AdminReportsPage