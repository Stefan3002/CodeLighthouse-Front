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
import PadlockSVG from '../../../utils/imgs/log-in/PadlockSVG.svg'
import Padlock2SVG from '../../../utils/imgs/SVGs/PadlockSVG.svg'
import GithubSVG from '../../../utils/imgs/log-in/GithubSVG.svg'
import useFetchHook from "../../../utils/hooks/fetchHook";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setExpireDate, setIsLoggedIn, setStatus, setToken} from "../../../utils/store/auth-store/auth-store-actions";
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
import Form from "../../Form/form";
import {authExpireDate} from "../../../utils/store/auth-store/auth-store-reducer";
const LogIn = () => {
    const error = useSelector(getError)
    const sendRequest = useFetchHook()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isLoggedIn = useSelector(getIsLoggedIn)

    const [windowSize, setWindowSize] = useState(window.innerWidth)


    useEffect(() => {
        if(isLoggedIn)
            navigate('/app')
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setWindowSize(window.innerWidth)
        }
        window.addEventListener('resize', () => handleResize)
        return () => window.removeEventListener('resize', () => handleResize)
    }, []);



    const successLogIn = (user, type = 'provider') => {

        dispatch(setError(null))
        dispatch(setIsLoggedIn(true))
        dispatch(setStatus('loaded'))
        dispatch(setExpireDate(authExpireDate))
        dispatch(setUser(user.user))
        dispatch(setToken({
            token: user.access,
            refresh: user.refresh
        }))
        if(type === 'provider')
            navigate('/app')
        else
            navigate('/app/contests')
        // window.location.href = '/app/home'
    }
    // const logUserInEmail = async (form) => {
    //     dispatch(setStatus('loading'))
    //     form.preventDefault()
    //     const formData = form.target
    //     const email = formData[0].value
    //     const password = formData[1].value
    //
    //
    //     const data = {
    //         email,
    //         password
    //     }
    //     const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/auth`, JSON.stringify(data), 'POST', false, successLogIn)
    //
    //     // console.log('log in, ', status)
    //
    // }

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
            // console.log('AUTH:', e)
            const errorCode = e.code
            switch (errorCode){
                case 'auth/popup-closed-by-user':
                    dispatch(setError('The authentication did not complete!'))
                    dispatch(setStatus('idle'))
                    break
                case 'auth/cancelled-popup-request':
                    dispatch(setError('You cancelled the authentication!'))
                    dispatch(setStatus('idle'))
                    break
                case 'auth/account-exists-with-different-credential':
                    dispatch(setError('We found your account! But, it appears to be made via a different provider?! Can you please try to change the available providers?'))
                    dispatch(setStatus('idle'))
                    break
                default:
                    dispatch(setError('Something went wrong. Please try again!'))
                    dispatch(setStatus('idle'))
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
       await generalLogInWithProviderHandler(logInGoogleProviderFirebase);

    }

    const logInGithubProvider = async () => {
        await generalLogInWithProviderHandler(logInGithubProviderFirebase)
    }

    const generalLogInWithProviderHandler = async (providerCallback) => {
        dispatch(setStatus('loading'))
        const result = await handleLogIn(providerCallback)

        if(!result)
            return;

        const email = result.user.email

        const idToken = await handleGetToken()

        const data = {
            idToken,
            email,
            username: result.user.displayName,
            photoURL: result.user.photoURL
        }
        await sendRequest(`${process.env.REACT_APP_SERVER_URL}/auth/provider`, JSON.stringify(data), 'POST', false, successLogIn, ['Talking to Google', 'Talking to Github', 'Talking to our own servers'])
    }

    const logInClassic = async (event) => {
        event.preventDefault()
        const username = event.target[0].value
        const password = event.target[1].value
        const data = {
            email: username, password
        }

        await sendRequest(`${process.env.REACT_APP_SERVER_URL}/auth`, JSON.stringify(data), 'POST', false, (user) => successLogIn(user, 'classic'), ['Talking to the server', "IT'S ON FIRE?!", "Nope, the fire was extinguished!"])

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
                        <div className='log-in-group'>
                            {LogInFeatures.features.map((feature, idx) => {
                                return <div key={`Feature-${feature.title}`}
                                            style={{animationDelay: `${exponentialDelay(idx)}ms`}}
                                            className="log-in-feature">
                                    <img className='log-in-feature-icon' src={getFeatureIcon(feature.title)} alt=""/>
                                    <h2 className='log-in-feature-title'>{feature.title}</h2>
                                    <p className='log-in-feature-description'
                                       dangerouslySetInnerHTML={{__html: feature.description}}></p>
                                </div>
                            })}
                        </div>
                        <div className='log-in-group'>
                            <div className="log-in-feature" key={`Feature-log-in-options`}
                                 style={{animationDelay: `${exponentialDelay(3)}ms`}}>
                                <img aria-hidden={true} className='log-in-feature-icon' src={PadlockSVG} alt=""/>
                                <h2 className='log-in-feature-title'>Log in via:</h2>
                                <div className="providers">
                                    <img role='button' aria-label='Log in via Google' onClick={logInGoogleProvider}
                                         className='log-in-icon' src={GoogleSVG}
                                         alt="Via Google"/>
                                    <img role='button' aria-label='Log in via Github' onClick={logInGithubProvider}
                                         className='log-in-icon' src={GithubSVG}
                                         alt="Via GitHub"/>
                                </div>
                            </div>
                            <div className='log-in-options log-in-feature'
                                 style={{animationDelay: `${exponentialDelay(4)}ms`}}>
                                <img className='log-in-feature-icon' src={Padlock2SVG} alt=""/>
                                <Form type='no-auth' className='inputs-form' onSubmit={logInClassic}>
                                    <Input id="log-in-username" placeholder='E-mail'/>
                                    <Input id='log-in-password' type='password' placeholder='Password'/>
                                    <Button ariaLabel='Log in' id='log-in-button' text='Log in for contest'/>
                                </Form>
                                {/*<h2>Log in</h2>*/}
                                {/*<div className="providers">*/}
                                {/*    <img onClick={logInGoogleProvider} className='log-in-icon' src={GoogleSVG} alt=""/>*/}
                                {/*    <img onClick={logInGithubProvider} className='log-in-icon' src={GithubSVG} alt=""/>*/}
                                {/*</div>*/}
                            </div>
                        </div>
                    </div>


                </div>
            </div>
                <LandingPageAsideMenu/>
            </div>
        </Transition>
    )
}
export default LogIn