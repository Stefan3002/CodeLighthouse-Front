import './challenge-meta.css'
import Difficulty from "../Difficulty/difficulty";
import QuestionSVG from '../../utils/imgs/SVGs/QuestionSVG.svg'
import {Link} from "react-router-dom";
import LanguageSelector from "../LanguageSelector/language-selector";
import AuthorName from "../AuthorName/author-name";

const ChallengeMeta = ({data}) => {
    console.log('data mea este', data)
    return (
        <div className='challenge-meta-bottom'>
            <div className="challenge-meta-left">
                <p><b>{data.title}</b></p>
                <AuthorName author={data.author} />
            </div>
            <LanguageSelector down={false} modifiable={true} />
            <Difficulty difficulty={data.difficulty} />
            <Link to='https://stefan3002.github.io/CodeLighthouse-Docs/'><img className='question-svg' src={QuestionSVG} alt=""/></Link>
        </div>
    )
}
export default ChallengeMeta