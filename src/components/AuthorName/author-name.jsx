import './author-name.css'
import {Link} from "react-router-dom";
const AuthorName = ({author, color = 'dark'}) => {
    return (
        <Link to={`/app/users/${author.id}`}><p style={{color: `${color === 'light' ? '#FEE1C7' : null}`}}>{author.username}</p></Link>
    )
}
export default AuthorName