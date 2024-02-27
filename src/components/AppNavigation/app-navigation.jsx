import './app-navigation.css'
import {Link, Outlet, useNavigate} from "react-router-dom";
import LogoImgNoBg from "../../utils/imgs/logo/LogoSVG.svg";
import {useDispatch, useSelector} from "react-redux";
import {getUser} from "../../utils/store/user-store/user-store-selectors";
import UserSVG from '../../utils/imgs/SVGs/User SVG.svg'
import AttachmentSVG from '../../utils/imgs/SVGs/AttachmentSVG.svg'
import HomeSVG from '../../utils/imgs/SVGs/HomeSVG.svg'
import CodeSVG from '../../utils/imgs/SVGs/CodeSVG.svg'
import AdminSVG from '../../utils/imgs/SVGs/AdminSVG.svg'
import LighthouseSVG from '../../utils/imgs/SVGs/LighthouseSVG.svg'
import Blur from "../Blur/blur";
import Transition from "../../utils/js/transitions";
import Modal from "../Error/modal";
import {
    getError, getLogsQueue,
    getModalContent,
    getModalOpened,
    getSidePanel
} from "../../utils/store/utils-store/utils-store-selectors";
import {AnimatePresence} from "framer-motion";
import SidePanel from "../Modals/SidePanel/side-panel";
import Notifications from "../Notifications/notifications";
import {useEffect, useRef} from "react";
import {setNotifications} from "../../utils/store/utils-store/utils-store-actions";
import useFetchHook from "../../utils/hooks/fetchHook";
const AppNavigation = () => {
    const modalType = useSelector(getModalContent).type
    const modalOpened = useSelector(getModalOpened)
    const error = useSelector(getError)
    const sidePanel = useSelector(getSidePanel)
    // const dispatch = useDispatch()
    const user = useSelector(getUser)
    const sendRequest = useFetchHook()
    const logsQueue = useSelector(getLogsQueue)
    const currentLogsQueue = useRef(logsQueue)
    const sendLogsListener = useRef(undefined)
    const navigate = useNavigate()

    useEffect(() => {
        const data = {
            time: new Date().getTime(),
            type: 'log-in'
        }
        const res = sendRequest(`${process.env.REACT_APP_SERVER_URL}/logs`, JSON.stringify(data), 'POST', true, undefined)

        window.addEventListener('beforeunload', () => {

            const data = {
                time: new Date().getTime(),
                type: 'log-out'
            }
            const res = sendRequest(`${process.env.REACT_APP_SERVER_URL}/logs`, JSON.stringify(data), 'POST', true, undefined)
        })
    //     Check for user but remember that it is async so wait a bit
        setTimeout(() => {
            if(!user)
                navigate('/auth')
        }, 800)
    }, []);

    const sendLogs = () => {
        return () => {
            for (const log of logsQueue) {
                const res = sendRequest(`${process.env.REACT_APP_SERVER_URL}/logs`, JSON.stringify(log), 'POST', true, undefined)
            }
        }

    }
    useEffect(() => {
        currentLogsQueue.current = logsQueue
    }, [logsQueue]);

    useEffect(() => {
        if(sendLogsListener.current)
            window.removeEventListener('beforeunload', sendLogsListener.current)
        sendLogsListener.current = window.addEventListener('beforeunload', () => {
            for (const log of currentLogsQueue.current) {
                const res = sendRequest(`${process.env.REACT_APP_SERVER_URL}/logs`, JSON.stringify(log), 'POST', true, undefined)
            }
        })
    }, [currentLogsQueue.current]);

    if(user)
    return (
        <>
            <nav className='app-navigation-wrapper'>
                <img className='logo-header-app-nav' src={LogoImgNoBg} alt=""/>
                <ul className='app-navigation'>
                    <Link to='/app'><li className='menu-item'><img className='icon-svg' src={HomeSVG} alt=""/>Home</li></Link>
                    <Link to='/app/lighthouses'><li className='menu-item'><img className='icon-svg' src={LighthouseSVG} alt=""/>Lighthouses</li></Link>
                    <Link to='/app/challenges'><li className='menu-item'><img className='icon-svg' src={CodeSVG} alt=""/>Solve</li></Link>
                    <Link to='https://stefan3002.github.io/CodeLighthouse-Docs/creating-challenges.html'><li className='menu-item'><img className='icon-svg' src={AttachmentSVG} alt=""/>Docs</li></Link>
                    <Link to={`/app/users/${user?.id}`}><li className='menu-item'><img className='icon-svg' src={UserSVG} alt=""/>{user ? user.username : 'Profile'}</li></Link>
                    <Link to={`/app/admin/pending`}>{user.admin_user ?<li className='menu-item'><img className='icon-svg' src={AdminSVG} alt=""/>Admin</li> : null}</Link>
                    <Notifications />
                </ul>
            </nav>
            <AnimatePresence>
                {error ? <><Blur redirect='/app' /><Transition mode='modal'><Modal error={error} /></Transition></> : null}
                {sidePanel.opened ? <><Blur /><SidePanel type={sidePanel.type} /> < />: null}
                {modalOpened && modalType !== 'pop-up' ?
                    <>
                        <Blur />
                        <Transition modalContent={modalType} mode='modal'>
                            <Modal type={modalType} />
                        </Transition>
                    </> :
                    modalOpened && modalType === 'pop-up' ?
                        <Transition mode='pop-up'>
                            <Modal type={modalType} />
                        </Transition> :
                        null
                }
            </AnimatePresence>

            <Outlet />
        </>
    )
}
export default AppNavigation