import './challenge-card.css'
import {Link} from "react-router-dom";
import {motion} from "framer-motion"
import AuthorName from "../AuthorName/author-name";
import Difficulty from "../Difficulty/difficulty";

const ChallengeCard = ({challenge, idx}) => {
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
}
export default ChallengeCard