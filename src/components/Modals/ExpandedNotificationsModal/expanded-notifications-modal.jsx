import './expanded-notifications-modal.css'
import LighthouseSVG from "../../../utils/imgs/SVGs/LighthouseSVG.svg";
import {useSelector} from "react-redux";
import {getModalContent, getNotifications} from "../../../utils/store/utils-store/utils-store-selectors";
import NotificationCard from "../../NotificationCard/notification-card";
import Missing from "../../Missing/missing";
import Button from "../../Button/button";
import useUpdateData from "../../../utils/hooks/updateDataHook";
import useFetchHook from "../../../utils/hooks/fetchHook";
const ExpandedNotificationsModal = () => {
    const data = useSelector(getNotifications)
    const updateData = useUpdateData()
    const sendRequest = useFetchHook()
    const successCallback = async () => {
        await updateData(true)
    }
    const refreshNotifications = async () => {
        await updateData()
    }
    const deleteAllNotifications = async () => {
        const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/notifications-all`, undefined , 'DELETE', true, successCallback)

    }

    if(data)
    return (
        <div className='error-wrapper expanded-notifications'>
            <div className="error-header">
                <img src={LighthouseSVG} alt=""/>
                <h2>Updates</h2>
            </div>
            <div className="error-content notifications">
                <Button callback={refreshNotifications} text='Refresh' color='light' />
                <h3>Here are your <strong>updates</strong></h3>
                <Button callback={deleteAllNotifications} text='Delete all' color='light'  />
                {!data.length ? <Missing text='No new updates!' /> : data.map(notification => {
                    return <NotificationCard data={notification}/>
                })}
            </div>
        </div>
    )
}
export default ExpandedNotificationsModal