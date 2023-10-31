import './challenge-page.css'
import Transition from "../../utils/js/transitions";
import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import useFetchHook from "../../utils/hooks/fetchHook";
import Difficulty from "../Difficulty/difficulty";
import {Editor} from "@monaco-editor/react";
import LanguageSelector from "../LanguageSelector/language-selector";
import Button from "../Button/button";
import {useSelector} from "react-redux";
import ModifySVG from '../../utils/imgs/SVGs/ModifySVG.svg'
import {getUser} from "../../utils/store/user-store/user-store-selectors";
const ChallengePage = () => {
    const slug = useParams().slug
    const [data, setData] = useState(undefined)
    const sendRequest = useFetchHook()
    const user = useSelector(getUser)

    useEffect(() => {
        (async () => {
            const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/challenges/${slug}`, undefined, 'GET', true)
            setData(res)
        })()
    }, []);

    if(data)
        return (
            <Transition mode='fullscreen'>
                <div className='wrapper challenge-page'>
                    <div className="challenge-page-meta">
                        <Difficulty difficulty={data.difficulty}/>
                        <h1>{data.title}</h1>
                        {user.user_id === data.author.user_id ? <img className='icon-svg' src={ModifySVG} alt=""/> : null}
                    </div>
                    <div className="challenge-page-content">
                        <p dangerouslySetInnerHTML={{__html: data.description}}></p>
                    </div>
                    <div className="challenge-page-language">
                        <LanguageSelector/>
                        <Link to='code'><Button text='Code!'/></Link>
                    </div>
                </div>
            </Transition>
        );
}
export default ChallengePage