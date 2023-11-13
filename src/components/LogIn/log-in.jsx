import './log-in.css'
import LogoImgNoBg from "../../utils/imgs/logo/LogoSVG.svg";
import Button from "../Button/button";
import {Link, Navigate, redirect, useNavigate} from "react-router-dom";
import Input from "../Input/input";
import TickSVG from '../../utils/imgs/features/TickSVG.svg'
import SpeedSVG from '../../utils/imgs/features/SpeedSVG.svg'
import PowerfulSVG from '../../utils/imgs/features/PowerfulSVG.svg'
import LogInFeatures from '../../utils/text/log-in-features'
import GoogleSVG from '../../utils/imgs/log-in/GoogleSVG.svg'
import GithubSVG from '../../utils/imgs/log-in/GithubSVG.svg'
import useFetchHook from "../../utils/hooks/fetchHook";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setIsLoggedIn, setStatus, setToken} from "../../utils/store/auth-store/auth-store-actions";
import {getStatus} from "../../utils/store/auth-store/auth-store-selectors";
import LandingPageAsideMenu from "../LandingPageAsideMenu/landing-page-aside-menu";
import {setUser} from "../../utils/store/user-store/user-store-actions";
import {getTokenFirebase, logInGoogleProviderFirebase} from "../../utils/firebase/oauth-login";
const LogIn = () => {
    const status = useSelector(getStatus)
    const sendRequest = useFetchHook()
    const dispatch = useDispatch()
    const navigate = useNavigate()

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

        console.log('log in, ', status)

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

    const logInGoogleProvider = async () => {
        const result = await logInGoogleProviderFirebase()
        const email = result.user.email
        // console.log(result)
        const idToken = await getTokenFirebase()
        const data = {
            idToken,
            email
        }
        await sendRequest(`${process.env.REACT_APP_SERVER_URL}/auth/google`, JSON.stringify(data), 'POST', false, successLogIn)
    }


    return (
        <div className='slide'>
            <div className="slide-hero slide-hero-login">
                <img className='logo-header' src={LogoImgNoBg} alt=""/>
                <div className="inputs">
                    <div className="log-in-features">
                        {LogInFeatures.features.map((feature) => {
                            return <div className="log-in-feature">
                                <img className='log-in-feature-icon' src={getFeatureIcon(feature.title)} alt=""/>
                                <h2 className='log-in-feature-title'>{feature.title}</h2>
                                <p className='log-in-feature-description' dangerouslySetInnerHTML={{__html: feature.description}}></p>
                            </div>
                        })}

                    </div>
                    <div>
                        <form onSubmit={logUserInEmail} className='inputs-form'>
                            <Input placeholder='E-mail' />
                            <Input placeholder='Password' />
                            <Button text='Log In' />
                        </form>
                        <div className="providers">
                            <img onClick={logInGoogleProvider} className='log-in-icon' src={GoogleSVG} alt=""/>
                            <img className='log-in-icon' src={GithubSVG} alt=""/>
                        </div>
                    </div>

                </div>
            </div>
            <LandingPageAsideMenu />
        </div>
    )
}
export default LogIn