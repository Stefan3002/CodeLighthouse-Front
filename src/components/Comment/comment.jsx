import './comment.css'
import AuthorName from "../AuthorName/author-name";
const Comment = ({data}) => {
    return (
        <div className='comment'>
            <div className="comment-content">
                <p>{data.content}</p>
            </div>
            <div className="comment-meta">
                <AuthorName author={data.author} />
            </div>
        </div>
    )
}
export default Comment