import './log-in.css'
import LogoImgNoBg from "../../utils/imgs/logo/LogoSVG.svg";
import Button from "../Button/button";
import {Link} from "react-router-dom";
import Input from "../Input/input";
import TickSVG from '../../utils/imgs/features/TickSVG.svg'
import SpeedSVG from '../../utils/imgs/features/SpeedSVG.svg'
import PowerfulSVG from '../../utils/imgs/features/PowerfulSVG.svg'
import LogInFeatures from '../../utils/text/log-in-features'
import GoogleSVG from '../../utils/imgs/log-in/GoogleSVG.svg'
import GithubSVG from '../../utils/imgs/log-in/GithubSVG.svg'
import useFetchHook from "../../utils/hooks/fetchHook";
import {useEffect} from "react";
const LogIn = () => {
    const sendRequest = useFetchHook()

    const logUserInEmail = (form) => {
        form.preventDefault()
        const formData = form.target
        const email = formData[0].value
        const password = formData[1].value

        sendRequest(`${process.env.REACT_APP_SERVER_URL}/auth`, {
            email,
            password
        }, 'POST')

        // fetch(`${process.env.REACT_APP_SERVER_URL}/auth`, {
        //     method: 'POST',
        //     body: {
        //         email,
        //         password
        //     }
        // })
        //     .then(data => {
        //         data.json().then(jsonData => {
        //             console.log(jsonData)
        //         })
        //     })
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

    return (
        <div className='slide'>
            <div className="slide-hero">
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
                            <img className='log-in-icon' src={GoogleSVG} alt=""/>
                            <img className='log-in-icon' src={GithubSVG} alt=""/>
                        </div>
                    </div>

                </div>
            </div>
            <div className="slide-aside">
                <div className='landing-page-navigation'>
                    <ul className='navigation-wrapper'>
                        <Link to='/' ><li>Home</li></Link>
                        <Link to='/about' ><li>About</li></Link>
                        <Link to='/features'><li>Features</li></Link>
                        <Link to='auth'><li>Log in</li></Link>
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default LogIn