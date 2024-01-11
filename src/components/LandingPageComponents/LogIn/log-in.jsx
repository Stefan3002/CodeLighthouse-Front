import './log-in.css'
import {AnimatePresence, motion} from "framer-motion"
import LogoImgNoBg from "../../../utils/imgs/logo/LogoSVG.svg";
import Button from "../../Button/button";
import {Link, Navigate, redirect, useNavigate} from "react-router-dom";
import Input from "../../Input/input";
import TickSVG from '../../../utils/imgs/features/TickSVG.svg'
import SpeedSVG from '../../../utils/imgs/features/SpeedSVG.svg'
import PowerfulSVG from '../../../utils/imgs/features/PowerfulSVG.svg'
import LogInFeatures from '../../../utils/text/log-in-features.json'
import GoogleSVG from '../../../utils/imgs/log-in/GoogleSVG.svg'
import GithubSVG from '../../../utils/imgs/log-in/GithubSVG.svg'
import useFetchHook from "../../../utils/hooks/fetchHook";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setIsLoggedIn, setStatus, setToken} from "../../../utils/store/auth-store/auth-store-actions";
import {getIsLoggedIn, getStatus} from "../../../utils/store/auth-store/auth-store-selectors";
import LandingPageAsideMenu from "../LandingPageAsideMenu/landing-page-aside-menu";
import {setUser} from "../../../utils/store/user-store/user-store-actions";
import {
    getTokenFirebase,
    logInGithubProviderFirebase,
    logInGoogleProviderFirebase
} from "../../../utils/firebase/oauth-login";
import Transition from "../../../utils/js/transitions";
import {exponentialDelay} from "../../../utils/js/exponentialDelay";
import {setError} from "../../../utils/store/utils-store/utils-store-actions";
import Blur from "../../Blur/blur";
import Modal from "../../Error/modal";
import {getError} from "../../../utils/store/utils-store/utils-store-selectors";
const LogIn = () => {
    const error = useSelector(getError)

    const status = useSelector(getStatus)
    const sendRequest = useFetchHook()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isLoggedIn = useSelector(getIsLoggedIn)


    const [windowSize, setWindowSize] = useState(window.innerWidth)


    // useEffect(() => {
    //     if(isLoggedIn)
    //         navigate('/app')
    // }, []);

    useEffect(() => {
        const handleResize = () => {
            setWindowSize(window.innerWidth)
        }
        window.addEventListener('resize', () => handleResize)
        return () => window.removeEventListener('resize', () => handleResize)
    }, []);



    const successLogIn = (user) => {
        // console.log('useru', user)
        dispatch(setIsLoggedIn(true))
        dispatch(setStatus('loaded'))
        dispatch(setUser(user.user))
        dispatch(setToken({
            token: user.access,
            refresh: user.refresh
        }))
        navigate('/app')
        // window.location.href = '/app/home'
    }
    const logUserInEmail = async (form) => {
        dispatch(setStatus('loading'))
        form.preventDefault()
        const formData = form.target
        const email = formData[0].value
        const password = formData[1].value


        const data = {
            email,
            password
        }
        const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/auth`, JSON.stringify(data), 'POST', false, successLogIn)

        // console.log('log in, ', status)

    }

    const getFeatureIcon = (icon) => {
        switch (icon){
            case 'Reliable':
                return TickSVG
            case 'Fast':
                return SpeedSVG
            case 'Powerful':
                return PowerfulSVG
        }
    }

    const handleLogIn = async (logInCallback) => {
        try {
            return await logInCallback()
        }
        catch (e){
            console.log('AUTH:', e)
            const errorCode = e.code
            switch (errorCode){
                case 'auth/popup-closed-by-user':
                    dispatch(setError('You did not complete the authentication!'))
                    break
                case 'auth/cancelled-popup-request':
                    dispatch(setError('You cancelled the authentication!'))
                    break
                default:
                    dispatch(setError('Something went wrong. Please try again!'))
            }
            return;
        }
    }
    const handleGetToken = async () => {
        try{
            return await getTokenFirebase()
        }
        catch (e){
            dispatch(setError('Something went wrong. Please try again!'))
            return;
        }
    }

    const logInGoogleProvider = async () => {
        dispatch(setStatus('loading'))
        const result = await handleLogIn(logInGoogleProviderFirebase);

        if(!result)
            return;

        const email = result.user.email
        // console.log(result)
        const idToken = await handleGetToken()
        const data = {
            idToken,
            email,
            username: result.user.displayName,
            photoURL: result.user.photoURL
        }
        await sendRequest(`${process.env.REACT_APP_SERVER_URL}/auth/provider`, JSON.stringify(data), 'POST', false, successLogIn)
    }

    const logInGithubProvider = async () => {
        dispatch(setStatus('loading'))
        const result = await handleLogIn(logInGithubProviderFirebase)

        if(!result)
            return;

        const email = result.user.email

        const idToken = await handleGetToken()

        const data = {
            idToken: idToken,
            email,
            username: result.user.displayName,
            photoURL: result.user.photoURL
        }
        await sendRequest(`${process.env.REACT_APP_SERVER_URL}/auth/provider`, JSON.stringify(data), 'POST', false, successLogIn)
    }


    return (
        <Transition mode={windowSize <= 1100 ? 'fullscreen' : 'partial'}>
            <AnimatePresence>
                {error ? <><Blur /><Transition mode='modal'><Modal error={error} /></Transition></> : null}
            </AnimatePresence>
            <div className='slide'>
            <div className="slide-hero slide-hero-login">
                <img className='logo-header' src={LogoImgNoBg} alt=""/>
                <div className="inputs">
                    <div className="log-in-features">
                        {LogInFeatures.features.map((feature, idx) => {
                            return <div key={`Feature-${feature.title}`} style={{animationDelay: `${exponentialDelay(idx)}ms`}} className="log-in-feature">
                                <img className='log-in-feature-icon' src={getFeatureIcon(feature.title)} alt=""/>
                                <h2 className='log-in-feature-title'>{feature.title}</h2>
                                <p className='log-in-feature-description' dangerouslySetInnerHTML={{__html: feature.description}}></p>
                            </div>
                        })}

                    </div>
                    <div>
                        <form onSubmit={logUserInEmail} className='inputs-form'>
                            <Input placeholder='E-mail' />
                            <Input type='password' placeholder='Password' />
                            <Button text='Log In' />
                        </form>
                        <div className="providers">
                            <img onClick={logInGoogleProvider} className='log-in-icon' src={GoogleSVG} alt=""/>
                            <img onClick={logInGithubProvider} className='log-in-icon' src={GithubSVG} alt=""/>
                        </div>
                    </div>

                </div>
            </div>
            <LandingPageAsideMenu />
        </div>
        </Transition>
    )
}
export default LogIn