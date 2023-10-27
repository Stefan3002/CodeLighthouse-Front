import './challenge-page.css'
import Transition from "../../utils/js/transitions";
import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import useFetchHook from "../../utils/hooks/fetchHook";
import Difficulty from "../Difficulty/difficulty";
import {Editor} from "@monaco-editor/react";
import LanguageSelector from "../LanguageSelector/language-selector";
import Button from "../Button/button";
const ChallengePage = () => {
    const slug = useParams().slug
    const [data, setData] = useState(undefined)
    const sendRequest = useFetchHook()

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