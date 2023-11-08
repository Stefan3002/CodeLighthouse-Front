import './challenge-meta.css'
import Difficulty from "../Difficulty/difficulty";
import QuestionSVG from '../../utils/imgs/SVGs/QuestionSVG.svg'
import {Link} from "react-router-dom";
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

const ChallengeMeta = ({data, type = 'expanded', solved = false}) => {
    const [likeIMG, setLikeIMG] = useState(undefined)
    const sendRequest = useFetchHook()
    const user = useSelector(getUser)
    const dispatch = useDispatch()

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
                    <p><b>{data.title}</b></p>
                    <AuthorName color='light' author={data.author} />
                </div>
                {/*<LanguageSelector down={false} modifiable={true} />*/}
                <Difficulty difficulty={data.difficulty} />
                <Link to='https://stefan3002.github.io/CodeLighthouse-Docs/'><img className='question-svg' src={QuestionSVG} alt=""/></Link>
            </div>
        )
    else
        if(type === 'restricted')
            return (
                <div className={`challenge-meta-bottom ${solved ? 'solved' : null}`}>
                    <div className="challenge-meta-left">
                        <p><b>{data.title}</b></p>
                        <AuthorName color='dark' author={data.author} />
                    </div>
                    <LanguageSelector lightColored = {solved} down={false} modifiable={true} />
                    <Link to='code'><Button text='Code!'/></Link>
                    <img onClick={likeChallenge} src={likeIMG} className='icon-svg' alt=""/>
                    <Link to='https://stefan3002.github.io/CodeLighthouse-Docs/'><img className='icon-svg' src={QuestionSVG} alt=""/></Link>
                    <p>{data.likes_received}</p>
                </div>
            )
        else
        if(type === 'stats')
            return (
                <div className='challenge-meta-bottom'>
                    <div className="challenge-meta-left">
                        <p><b>{data.title}</b></p>
                        <AuthorName author={data.author} />
                    </div>
                    <img onClick={likeChallenge} src={likeIMG} className='icon-svg' alt=""/>
                    <Link to='https://stefan3002.github.io/CodeLighthouse-Docs/'><img className='icon-svg' src={QuestionSVG} alt=""/></Link>
                    <p>{data.likes_received}</p>
                </div>
            )
}
export default ChallengeMeta