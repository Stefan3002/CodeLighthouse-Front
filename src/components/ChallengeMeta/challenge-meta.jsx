import './challenge-meta.css'
import Difficulty from "../Difficulty/difficulty";
import QuestionSVG from '../../utils/imgs/SVGs/QuestionSVG.svg'
import ChatBotSVG from '../../utils/imgs/SVGs/ChatBotSVG.svg'
import CodeSVG from '../../utils/imgs/SVGs/CodeSVG2.svg'
import ClockSVG from '../../utils/imgs/SVGs/ClockSVG.svg'
import {Link, useNavigate} from "react-router-dom";
import LanguageSelector from "../LanguageSelector/language-selector";
import AuthorName from "../AuthorName/author-name";
import EmptyLikeSVG from '../../utils/imgs/SVGs/EmptyHeartSVG.svg'
import FullLikeSVG from '../../utils/imgs/SVGs/FullHeartSVG.svg'
import {useEffect, useState} from "react";
import useFetchHook from "../../utils/hooks/fetchHook";
import {useDispatch, useSelector} from "react-redux";
import {getUser} from "../../utils/store/user-store/user-store-selectors";
import Button from "../Button/button";
import {setUser} from "../../utils/store/user-store/user-store-actions";
import WithInfo from "../WithInfo/with-info";
import {setModal, setModalContent} from "../../utils/store/utils-store/utils-store-actions";

const ChallengeMeta = ({data, type = 'expanded', solved = false}) => {
    const [likeIMG, setLikeIMG] = useState(undefined)
    const sendRequest = useFetchHook()
    const user = useSelector(getUser)

    const navigate = useNavigate()
    const dispatch = useDispatch()


    const openBot = () => {
        dispatch(setModal(true))
        dispatch(setModalContent({
            type: 'bot',
            content: undefined
        }))
    }

    useEffect(() => {
        setLikeIMG(EmptyLikeSVG)
        for(let liked_challenge of user.liked_challenges)
            if(liked_challenge === data.id) {
                setLikeIMG(FullLikeSVG)
                break
            }
    }, []);
    const likeChallenge = async () => {
        const reqData = {
            userId: user.user_id
        }
        const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/like/${data.slug}`, JSON.stringify(reqData), 'POST', true)

        if(likeIMG === EmptyLikeSVG) {
            dispatch(setUser({
                ...user,
                liked_challenges: [...user.liked_challenges, data.id]
            }))

            setLikeIMG(FullLikeSVG)
        }
        else {
            const newLikedChallenges = user.liked_challenges.filter(liked_challenge => liked_challenge !== data.id)
            dispatch(setUser({
                ...user,
                liked_challenges: newLikedChallenges
            }))
            setLikeIMG(EmptyLikeSVG)
        }
    }

    if(type === 'expanded')
        return (
            <div className='challenge-meta-bottom'>
                <div className="challenge-meta-left">
                    <AuthorName color='light' author={user} />
                </div>
                <WithInfo clickHandler={() => window.location.href = 'https://stefan3002.github.io/CodeLighthouse-Docs/'} data='Get help in case you are stuck with the concepts of solving a CodeLighthouse challenge'>
                    <div className="bar-item">
                        <img
                            className='icon-svg' src={QuestionSVG} alt=""/>
                        <p>Docs</p>
                    </div>
                </WithInfo>
                <WithInfo data='Ask Llama for some help' clickHandler={openBot}>
                    <div className='bar-item'>
                        <img className='icon-svg' src={ChatBotSVG}></img>
                        <p>Llama Helper</p>
                    </div>
                </WithInfo>

                <WithInfo clickHandler={() => null} data='The total amount of time that you spent trying to solve this challenge'>
                    <div className='bar-item'>
                        <img src={ClockSVG} className='icon-svg' alt=""/>
                        <p>{Math.round(data.user_logs.challenges[data.id] / 60) || 0} minutes</p>
                    </div>
                </WithInfo>

            </div>
        )
    else if (type === 'restricted')
        return (
            <div className={`challenge-meta-bottom ${solved ? 'solved' : null}`}>
                <div className="challenge-meta-left">
                    <AuthorName color={solved ? 'dark' : 'light'} author={user}/>
                </div>
                <LanguageSelector data={data.codes} lightColored={solved} down={false} modifiable={true}/>
                <WithInfo data='Show your appreciation for this challenge!'
                          clickHandler={likeChallenge}
                >
                    <img src={likeIMG} className='icon-svg' alt="Like"/>
                </WithInfo>

                <WithInfo clickHandler={() => navigate('code')} data="Let's solve the challenge!">
                    <div className="bar-item">
                        <img
                            className='icon-svg' src={CodeSVG} alt=""/>
                        <p>Code</p>
                    </div>
                </WithInfo>

                <WithInfo
                    clickHandler={() => window.location.href = 'https://stefan3002.github.io/CodeLighthouse-Docs/'}
                    data='Get help in case you are stuck with the concepts of solving a CodeLighthouse challenge'>
                    <div className="bar-item">
                        <img
                            className='icon-svg' src={QuestionSVG} alt=""/>
                        <p>Docs</p>
                    </div>
                </WithInfo>

                {/*<Link to='https://stefan3002.github.io/CodeLighthouse-Docs/'><WithInfo data='Help' clickHandler={() => null}><img className='icon-svg' src={QuestionSVG} alt=""/></WithInfo></Link>*/}
                {/*<p>{data.likes_received}</p>*/}
            </div>
        )
    else if (type === 'stats')
        return (
            <div className='challenge-meta-bottom'>
                    <div className="challenge-meta-left">
                        <p><b>{data.title}</b></p>
                        <AuthorName author={data.author} />
                    </div>
                    <img onClick={likeChallenge} src={likeIMG} className='icon-svg' alt=""/>
                    <Link to='https://stefan3002.github.io/CodeLighthouse-Docs/'><WithInfo data='Help'><img className='icon-svg' src={QuestionSVG} alt=""/></WithInfo></Link>
                    <p>{data.likes_received}</p>
                </div>
            )
}
export default ChallengeMeta