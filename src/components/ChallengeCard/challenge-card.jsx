import './challenge-card.css'
import {Link} from "react-router-dom";
import {motion} from "framer-motion"
import AuthorName from "../AuthorName/author-name";
import Difficulty from "../Difficulty/difficulty";
import {useDispatch, useSelector} from "react-redux";
import {setSelectedChallenge} from "../../utils/store/utils-store/utils-store-actions";
import {getSelectedChallenge} from "../../utils/store/utils-store/utils-store-selectors";

const ChallengeCard = ({challenge, idx, type = 'Big'}) => {
    const dispatch = useDispatch()
    const selectedChallenge = useSelector(getSelectedChallenge)
    const selectChallenge = () => {
        dispatch(setSelectedChallenge(challenge.slug))
    }


    if(type === 'Big')
    return (
        <div style={{transform: idx === 2 || idx === 0 ? 'scale(.8)' : 'scale(1)'}} className="challenge-card">
            <div className="challenge-meta-card" >
                <AuthorName author={challenge.author} />
                <Difficulty difficulty={challenge.difficulty} />
            </div>
            <div className="challenge-description-card" >
                <Link to={`/app/challenges/${challenge.slug}`}>
                    <h2>{challenge.title}</h2>
                    <p dangerouslySetInnerHTML={{__html: challenge.description.slice(0, 200)}}></p>
                </Link>
            </div>
        </div>
    )
    else
        if(type === 'small')
            return (
                <div onClick={selectChallenge} className={selectedChallenge === challenge.slug ? 'challenge-card-small selected-challenge' : 'challenge-card-small'}>
                    <p>{challenge.slug}</p>
                    <AuthorName author={challenge.author} />
                </div>
            )
}
export default ChallengeCard