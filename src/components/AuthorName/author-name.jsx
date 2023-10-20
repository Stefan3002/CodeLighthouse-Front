import './author-name.css'
import {Link} from "react-router-dom";
const AuthorName = ({author}) => {
    return (
        <Link to={`/app/users/${author.id}`}><p>{author.username}</p></Link>
    )
}
export default AuthorName