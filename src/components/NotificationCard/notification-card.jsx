import './notification-card.css'
import DeleteSVG from '../../utils/imgs/SVGs/DeleteSVG.svg'
import WithInfo from "../WithInfo/with-info";
import useFetchHook from "../../utils/hooks/fetchHook";
import useUpdateData from "../../utils/hooks/updateDataHook";
import {Link} from "react-router-dom";
import {setModal} from "../../utils/store/utils-store/utils-store-actions";
import {useDispatch} from "react-redux";
const NotificationCard = ({data}) => {
    const sendRequest = useFetchHook()
    const updateData = useUpdateData()
    const dispatch = useDispatch()

    const successCallback = async () => {
        await updateData(true)
    }

    const deleteNotification = async () => {
        // await updateData()
        const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/notifications/${data.id}`, undefined , 'DELETE', true, successCallback)

    }
    const closeModals = () => {
        dispatch(setModal(false))
    }

    return (
        <div className='notification'>
            <WithInfo data='Delete update' clickHandler={deleteNotification}><img src={DeleteSVG} className='icon-svg' alt=""/></WithInfo>
            <Link to={data.url}><p onClick={closeModals} dangerouslySetInnerHTML={{__html: data.content}} /></Link>
        </div>
    )
}
export default NotificationCard