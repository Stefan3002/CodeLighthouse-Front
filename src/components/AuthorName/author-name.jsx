import './author-name.css'
import {Link} from "react-router-dom";
const AuthorName = ({author}) => {
    return (
        <Link to={`/app/users/${author[2]}`}><p>{author[0]}</p></Link>
    )
}
export default AuthorName