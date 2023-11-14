import './author-name.css'
import {Link} from "react-router-dom";
const AuthorName = ({author, color = 'light'}) => {
    return (
        <Link to={`/app/users/${author.id}`}>
            <div className='author-name'>
                {author.photoURL ? <img className='user-photo' src={author.photoURL} alt=""/>  : null}
                <p style={{color: `${color === 'light' ? '#FEE1C7' : '#32292F'}`}}>{author.username}</p>
            </div>
        </Link>
    )
}
export default AuthorName