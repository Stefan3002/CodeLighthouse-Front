import './app-home.css'
import Transition from "../../utils/js/transitions";
import {useEffect, useState} from "react";
import useFetchHook from "../../utils/hooks/fetchHook";
import {Link} from "react-router-dom";
import parallaxData from "./parallax-data.json";
import Parallax from "../Parallax/parallax";
import ParallaxIMG from '../../utils/imgs/headers/HeaderHome.jpg'
import ChallengeCard from "../ChallengeCard/challenge-card";
import PlaySVG from '../../utils/imgs/SVGs/Play.svg'
import NextSVG from '../../utils/imgs/SVGs/Next.svg'
import gsap from 'gsap'
import {useSelector} from "react-redux";
import {getUser} from "../../utils/store/user-store/user-store-selectors";
import LighthouseCard from "../LighthouseCard/lighthouse-card";
import Heading from "../Heading/heading";
const AppHome = () => {
    const user = useSelector(getUser)
    const sendRequest = useFetchHook()
    const [randChallenge, setRandChallenge] = useState(undefined)

    const getChallenge = async () => {
        const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/challenges/0/3`, undefined, 'GET', true)
        setRandChallenge(res)
    }

    useEffect(() => {
        (async () => {
            await getChallenge()
        })()
    }, []);

    const nextChallengeAnimation = () => {
        // This is only to be able to compute 100% + 1rem in JS
        // This is one rem
        let fontSizePx = window.getComputedStyle(document.body).fontSize
        fontSizePx = parseFloat(fontSizePx) * 0
        const elementWidth = document.querySelector('.challenge-card').offsetWidth
        const transitionAmount = fontSizePx + elementWidth
        const challenges = document.querySelectorAll('.challenge-card')
        gsap.to(challenges[1], {duration: .3, x: `-${transitionAmount}px`, scale: '.7'})
        gsap.to(challenges[2], {duration: .3, x: `-${transitionAmount}px`, scale: '1'})
        gsap.to(challenges[0], {duration: .3, x: `${transitionAmount * 2}`, scale: '.7'})
        setTimeout(() => {
            setRandChallenge([randChallenge[1], randChallenge[2], randChallenge[0]])
            gsap.set(challenges, {clearProps: 'all'})
            gsap.set(challenges[0], {scale: '.7'})
            gsap.set(challenges[2], {scale: '.7'})
        }, 350)
    }
    console.log('user = ', user, randChallenge)
    if(randChallenge && user)
    return (
        <Transition mode='fullscreen'>
        <Parallax parallaxData={parallaxData} img={ParallaxIMG} />
        <div className='app-home wrapper'>
            <Heading text='Latest Challenges' />
            <div className="challenges-cards">
                {randChallenge.map((challenge, idx) => {
                    return <ChallengeCard challenge={challenge} idx={idx} />
                })}
            </div>
            <div className="challenge-navigation">
                <Link to={`/app/challenges/${randChallenge[1].slug}`}><img src={PlaySVG} alt=""/></Link>
                <img onClick={nextChallengeAnimation} src={NextSVG} alt=""/>
            </div>
            <Heading text='Recently joined Lighthouses' />
            <div className='recent-lighthouses'>
                {user.enrolled_lighthouses.map(lighthouse => {
                    return <LighthouseCard data={lighthouse} />
                })}
            </div>
            {/*<form onSubmit={runUserCode} >*/}
            {/*    <input type="textarea"/>*/}
            {/*    <button type='submit'>Send</button>*/}
            {/*</form>*/}
        </div>
        </Transition>
    )
}
export default AppHome