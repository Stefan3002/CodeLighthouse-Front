import './challenges-highlighted.css'
import {Link} from "react-router-dom";
import AuthorName from "../AuthorName/author-name";
import useFetchHook from "../../utils/hooks/fetchHook";
import {useEffect, useState} from "react";
import useLazyLoadHook from "../../utils/hooks/lazyLoadHook";
const ChallengesHighlighted = () => {
    let LOAD_SIZE = 3
    const sendRequest = useFetchHook()
    const [data, setData] = useState([])

    useEffect(() => {
        (async () => {
            if(window.innerWidth < 1100)
                LOAD_SIZE = 1
            const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/challenges?start=0&end=${LOAD_SIZE}`, undefined, 'GET', true)
            setData(res)
        })()
    }, []);


    return (
        <div className="challenges-high">
            {data && data.map((challenge, idx) => {
                if (idx < 3) {
                    if (challenge.public)
                        return <Link to={`${challenge.slug}`}>
                            <div className='challenge-high'>
                                <h2>{challenge.title}</h2>
                                <AuthorName author={challenge.author} color='light'/>
                            </div>
                        </Link>
                }

            })
            }
        </div>
    )
}
export default ChallengesHighlighted