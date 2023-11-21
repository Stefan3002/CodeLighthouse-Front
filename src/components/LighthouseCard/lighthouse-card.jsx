import './lighthouse-card.css'
import {Link} from "react-router-dom";
import CopySVG from '../../utils/imgs/SVGs/CopySVG.svg'
import AuthorName from "../AuthorName/author-name";
import {setModal, setModalContent} from "../../utils/store/utils-store/utils-store-actions";
import {useDispatch} from "react-redux";
const LighthouseCard = ({animationDelay, type = 'lighthouse', data}) => {
    const dispatch = useDispatch()
    const copyCodeToClipboard = () => {
        navigator.clipboard.writeText(data.enrollment_code)
        dispatch(setModal(true))
        dispatch(setModalContent({
            type: 'pop-up',
            data: 'Copied to clipboard!'
        }))
    }

    if(type === 'lighthouse')
    return (
        <Link to={`/app/lighthouses/${data.id}`}>
        <div style={{animationDelay: `.${animationDelay * 10}s`}} className='lighthouse-card'>
            <div className="lighthouse-card-header">
                <h2>{data.name}</h2>
                {/*<AuthorName color='dark' author={data.author} />*/}
                <p>{data.author.username}</p>
            </div>
            <div className="lighthouse-card-content">

            </div>
        </div>
        </Link>
    )
    else
        if(type === 'community')
            return (
                <div style={{animationDelay: `.${animationDelay * 10}s`}} className='lighthouse-card'>
                    <img onClick={copyCodeToClipboard} src={CopySVG} className='icon-svg' alt="Copy code"/>
                    <Link to={`/app/lighthouses/${data.id}`}>
                    <div className="lighthouse-card-header">
                        <h2>{data.name}</h2>
                        {/*<AuthorName color='dark' author={data.author} />*/}
                        <p>{data.author.username}</p>
                    </div>
                    <div className="lighthouse-card-content">
                        <p>{data.enrollment_code}</p>
                        <p>{data.id}</p>
                    </div>
                    </Link>
                </div>

            )
}
export default LighthouseCard