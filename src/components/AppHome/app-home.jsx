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
import LighthouseCard from "../Lighthouse/LighthouseCard/lighthouse-card";
import Heading from "../Heading/heading";
import Missing from "../Missing/missing";
import EnrolledLighthouses from "../EnrolledLighthouses/enrolled-lighthouses";
const AppHome = () => {
    const [indeces, setIndeces] = useState({
        min_index: 0,
        max_index: 4,
        direction: ''
    })
    const user = useSelector(getUser)
    const sendRequest = useFetchHook()
    const [randChallenge, setRandChallenge] = useState([])

    const getChallenge = async () => {
        const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/challenges?start=${indeces.min_index}&end=${indeces.max_index}`, undefined, 'GET', false)
        setRandChallenge(res)
    }
    const nextChallenge = async () => {
        let res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/challenges?start=${indeces.min_index}&end=${indeces.max_index}`, undefined, 'GET', true)
        if(indeces.max_index > res.length)
            return false
        const newChallenges = [...randChallenge]
        newChallenges.push(res[res.length - 1])
        setRandChallenge(newChallenges)
        return true
    }

    useEffect(() => {
        (async () => {
            await getChallenge()
        })()
    }, []);

    useEffect(() => {
        const challengesAfterRerender = document.querySelectorAll('.challenge-card')
        gsap.set(challengesAfterRerender, {clearProps: 'all'})
        if(indeces.direction === 'right') {
            gsap.set(challengesAfterRerender[0], {scale: '.7'})
            gsap.set(challengesAfterRerender[2], {opacity: '0', y: '-20%'})
            gsap.to(challengesAfterRerender[2], {duration: .3, opacity: '1', scale: '.7'})
            gsap.to(challengesAfterRerender[2], {duration: .3, delay: .05, y: 0})
        }
        else{
            gsap.set(challengesAfterRerender[2], {scale: '.7'})
            gsap.set(challengesAfterRerender[0], {opacity: '0', y: '-20%'})
            gsap.to(challengesAfterRerender[0], {duration: .3, opacity: '1', scale: '.7'})
            gsap.to(challengesAfterRerender[0], {duration: .3, delay: .05, y: 0})
        }
    }, [indeces]);

    const nextChallengeAnimation = async (previous = false) => {
        if(previous && indeces.min_index === 0)
            return
        if(!previous){
            const stop = !await nextChallenge()
            if(stop)
                return
        }
        // This is only to be able to compute 100% + 1rem in JS
        // This is one rem
        let fontSizePx = window.getComputedStyle(document.body).fontSize
        fontSizePx = parseFloat(fontSizePx) * 0

        const elementWidth = document.querySelector('.challenge-card').offsetWidth
        const transitionAmount = fontSizePx + elementWidth
        const challenges = document.querySelectorAll('.challenge-card')

        if(!previous) {
            gsap.to(challenges[1], {duration: .3, x: `-${transitionAmount}px`, scale: '.7'})
            gsap.to(challenges[2], {duration: .3, x: `-${transitionAmount}px`, scale: '1'})
            gsap.to(challenges[0], {duration: .9, x: `-${transitionAmount * 5}`, scale: '.7'})
        }
        else{
            gsap.to(challenges[1], {duration: .3, x: `${transitionAmount}px`, scale: '.7'})
            gsap.to(challenges[0], {duration: .3, x: `${transitionAmount}px`, scale: '1'})
            gsap.to(challenges[2], {duration: .9, x: `${transitionAmount * 5}`, scale: '.7'})
        }
        // gsap.to(challenges[3], {duration: .3, x: `-${transitionAmount * 2}`, scale: '.7'})
        setTimeout(async () => {
            // setRandChallenge([randChallenge[1], randChallenge[2], randChallenge[0]])
            gsap.set(challenges, {clearProps: 'all'})
            gsap.set(challenges[0], {scale: '.7'})
            gsap.set(challenges[2], {scale: '.7'})

            if(!previous) {
                setIndeces({
                    min_index: indeces.min_index + 1,
                    max_index: indeces.max_index + 1,
                    direction: 'right'
                })
            }
            else
                setIndeces({
                    min_index: indeces.min_index - 1,
                    max_index: indeces.max_index - 1,
                    direction: 'left'
                })

            const challengesAfterRerender = document.querySelectorAll('.challenge-card')


        }, 350)

    }
    if(user)
    return (
        <Transition mode='fullscreen'>
        <Parallax parallaxData={parallaxData} img={ParallaxIMG} />
            {randChallenge && randChallenge.length &&
                <div className='app-home wrapper'>
                    <Heading text='Latest Challenges'/>
                    {window.innerWidth > 1100 ?
                        <div className="challenges-cards">
                            {randChallenge.map((challenge, idx) => {
                                if (idx >= indeces.min_index && idx < indeces.max_index - 1)
                                    return <ChallengeCard authoColor='dark' challenge={challenge} idx={idx}/>
                            })}
                        </div>
                        :
                        <div className="challenges-cards">
                            <ChallengeCard authoColor='dark' challenge={randChallenge[1]} idx={1}/>
                        </div>
                    }
                    {window.innerWidth > 1100 &&
                    <div className="challenge-navigation">
                        {/*{randChallenge[indeces.min_index - 1] &&*/}
                        <img className='prev-icon' onClick={() => nextChallengeAnimation(true)} src={NextSVG}
                             alt=""/>
                        {/*}*/}
                        <Link to={`/app/challenges/${randChallenge[indeces.min_index + 1] ? randChallenge[indeces.min_index + 1].slug : ''}`}><img src={PlaySVG}
                                                                                                        alt=""/></Link>
                        {/*{randChallenge[indeces.max_index - 1] &&*/}
                            <img onClick={() => nextChallengeAnimation(false)} src={NextSVG} alt=""/>
                        {/*}*/}
                    </div>
                    }
                    <Heading text='Recently joined Lighthouses'/>
                    {/*<div className='recent-lighthouses'>*/}
                    {/*    {user.enrolled_lighthouses.length ? user.enrolled_lighthouses.map((lighthouse, idx) => {*/}
                    {/*        if (idx <= 4)*/}
                    {/*            return <LighthouseCard data={lighthouse}/>*/}
                    {/*    }) : <Missing text='You did not join any lighthouse yet!'/>}*/}
                    {/*</div>*/}
                    <EnrolledLighthouses />

                </div>
            }
        </Transition>
    )
}
export default AppHome