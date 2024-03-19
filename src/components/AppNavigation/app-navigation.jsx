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
import ContestSVG from '../../utils/imgs/SVGs/ContestSVG.svg'
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
                    <li className='menu-item'><Link to='/app'><img className='icon-svg' src={HomeSVG} alt=""/>Home</Link></li>
                    <li className='menu-item'><Link to='/app/lighthouses'><img className='icon-svg' src={LighthouseSVG} alt=""/>Lighthouses</Link></li>
                    <li className='menu-item'><Link to='/app/contests'><img className='icon-svg' src={ContestSVG} alt=""/>Contests</Link></li>
                    <li className='menu-item'><Link to='/app/challenges'><img className='icon-svg' src={CodeSVG} alt=""/>Solve</Link></li>
                    <li className='menu-item'> <Link to='https://stefan3002.github.io/CodeLighthouse-Docs/creating-challenges.html'><img className='icon-svg' src={AttachmentSVG} alt=""/>Docs</Link></li>
                    <li className='menu-item'><Link to={`/app/users/${user?.id}`}><img className='icon-svg' src={UserSVG} alt=""/>{user ? user.username : 'Profile'}</Link></li>
                    {user.admin_user ?<li className='menu-item'> <Link to={`/app/admin/pending`}><img className='icon-svg' src={AdminSVG} alt=""/>Admin</Link></li> : null}
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