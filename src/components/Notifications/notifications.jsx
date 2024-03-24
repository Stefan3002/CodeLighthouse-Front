import './notifications.css'
import Input from "../Input/input";
import {useEffect, useRef, useState} from "react";
import Button from "../Button/button";
import {notifyAnnouncement} from "../../utils/notifications/lighthouseNotifications";
import BellSVG from '../../utils/imgs/SVGs/BellSVG.svg'
import {
    setModal,
    setModalContent,
    setNotifications,
    setSocketConnection
} from "../../utils/store/utils-store/utils-store-actions";
import {useDispatch, useSelector} from "react-redux";
import {getNotifications, getSocketConnection} from "../../utils/store/utils-store/utils-store-selectors";
import {getToken} from "../../utils/store/auth-store/auth-store-selectors";
import {getUser} from "../../utils/store/user-store/user-store-selectors";
import {setUser} from "../../utils/store/user-store/user-store-actions";
const Notifications = () => {

    const socketConnection = useSelector(getSocketConnection)
    const dispatch = useDispatch()
    let notifications = useSelector(getNotifications)
    const userToken = useSelector(getToken).token
    const user = useSelector(getUser)

    useEffect(() => {

        dispatch(setNotifications(user.notifications))
        notifications = user.notifications

        const url = `${process.env.REACT_APP_WS_URL}?user=${userToken}`

        if(!socketConnection) {
            const connection = new WebSocket(url)

            connection.onmessage = (event) => {
                const message = JSON.parse(event.data)

                if(message.type === 'connected')
                    return

                notifications.push(message)
                //
                dispatch(setNotifications(notifications))
                //
                dispatch(setModal(true))
                dispatch(setModalContent({
                    type: 'pop-up',
                    data: 'New update!'
                }))
            }
            dispatch(setSocketConnection(connection))

        }
    }, [user]);


    const test = () => {
        notifyAnnouncement(socketConnection, 'New announcement made!')
    }

    const openNotificationsModal = () => {
        dispatch(setModal(true))
        dispatch(setModalContent({
            type: 'notifications'
        }))
    }

    return (
            <li role='button' onClick={openNotificationsModal} className='menu-item-notifications'>
                <img src={BellSVG} className='icon-svg' alt=""/>
                <p>Updates</p>
                <p>{notifications.length > 0 && `(${notifications.length})`}</p>
            </li>
)
}
export default Notifications