import './notifications.css'
import Input from "../Input/input";
import {useEffect, useRef, useState} from "react";
import Button from "../Button/button";
import {notifyAnnouncement} from "../../utils/notifications/lighthouseNotifications";
import BellSVG from '../../utils/imgs/SVGs/BellSVG.svg'
import {setModal, setModalContent, setSocketConnection} from "../../utils/store/utils-store/utils-store-actions";
import {useDispatch, useSelector} from "react-redux";
import {getSocketConnection} from "../../utils/store/utils-store/utils-store-selectors";
import {getToken} from "../../utils/store/auth-store/auth-store-selectors";
import {getUser} from "../../utils/store/user-store/user-store-selectors";
const Notifications = () => {

    const socketConnection = useSelector(getSocketConnection)
    const dispatch = useDispatch()
    const notifications = useRef(useSelector(getUser).notifications.map(notification => notification.content))
    const userToken = useSelector(getToken).token
    console.log('ppp', notifications)
    useEffect(() => {
        const url = `${process.env.REACT_APP_WS_URL}?user=${userToken}`

        if(!socketConnection) {
            const connection = new WebSocket(url)
            connection.onmessage = (event) => {
                const message = JSON.parse(event.data)
                notifications.current.push(message.message)
                dispatch(setModal(true))
                dispatch(setModalContent({
                    type: 'pop-up',
                    data: message.message
                }))
            }
            dispatch(setSocketConnection(connection))

        }
    }, []);


    const test = () => {
        notifyAnnouncement(socketConnection.current, 'New announcement made!')
    }

    const openNotificationsModal = () => {
        dispatch(setModal(true))
        dispatch(setModalContent({
            type: 'notifications',
            content: notifications.current
        }))
    }

    console.log(notifications)
    return (
            <li onClick={openNotificationsModal} className='menu-item'>
                <img src={BellSVG} className='icon-svg' alt=""/>
                Updates
                <p>{notifications.current.length > 0 && notifications.current.length}</p>
            </li>
)
}
export default Notifications