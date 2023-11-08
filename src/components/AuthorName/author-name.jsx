import './author-name.css'
import {Link} from "react-router-dom";
const AuthorName = ({author, color = 'light'}) => {
    return (
        <Link to={`/app/users/${author.id}`}><p style={{color: `${color === 'light' ? '#FEE1C7' : '#32292F'}`}}>{author.username}</p></Link>
    )
}
export default AuthorName