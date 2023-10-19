import './challenge-card.css'
import {Link} from "react-router-dom";
import {motion} from "framer-motion"
import AuthorName from "../AuthorName/author-name";
import Difficulty from "../Difficulty/difficulty";

const ChallengeCard = ({challenge, idx}) => {
    return (
        <div style={{transform: idx === 2 || idx === 0 ? 'scale(.8)' : 'scale(1)'}} className="challenge-card">
            <div className="challenge-meta-card" >
                <AuthorName author={challenge.fields.author} />
                <Difficulty difficulty={challenge.fields.difficulty} />
            </div>
            <div className="challenge-description-card" >
                <Link to={`/app/challenges/${challenge.fields.slug}`}>
                    <h2>{challenge.fields.title}</h2>
                    <p dangerouslySetInnerHTML={{__html: challenge.fields.description.slice(0, 200)}}></p>
                </Link>
            </div>
        </div>
    )
}
export default ChallengeCard