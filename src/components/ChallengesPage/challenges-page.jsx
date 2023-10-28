import './challenges-page.css'
import Transition from "../../utils/js/transitions";
import {useEffect, useState} from "react";
import useFetchHook from "../../utils/hooks/fetchHook";
import Parallax from "../Parallax/parallax";
import parallaxData from './parallax-data.json'
import ParallaxIMG from '../../utils/imgs/headers/HeaderChallenges.jpg'
import {Link} from "react-router-dom";
import AuthorName from "../AuthorName/author-name";
import Button from "../Button/button";
import {useDispatch} from "react-redux";
import {setModal, setModalContent} from "../../utils/store/utils-store/utils-store-actions";

const ChallengesPage = () => {
    const sendRequest = useFetchHook()
    const [data, setData] = useState(undefined)
    const dispatch = useDispatch()

    useEffect(() => {
        (async () => {
            const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/challenges/0/10`, undefined, 'GET')
            setData(res)
        })()
    }, []);


    const createChallenge = () => {
        dispatch(setModal(true))
        dispatch(setModalContent({
            type: 'createChallenge',
            data: undefined
        }))
    }

    if(data)
    return (
        <Transition mode='fullscreen'>
            <Parallax parallaxData={parallaxData} img={ParallaxIMG} />
            <div className='wrapper challenges-page'>
                <div className="challenges">
                    {data.map(challenge => {
                        return <Link to={`${challenge.slug}`}><div className='challenge' key={challenge.slug}>
                            <div className="challenge-content">
                                <h2>{challenge.title}</h2>
                                <p dangerouslySetInnerHTML={{__html: challenge.description}}></p>
                            </div>
                            <div className="challenge-meta">
                                <AuthorName author={challenge.author}/>
                                <p>{challenge.author.username}</p>
                            </div>
                        </div>
                        </Link>
                    })}
                </div>
            </div>
            <Button callback={createChallenge} type='plus' />
        </Transition>
    )
}
export default ChallengesPage