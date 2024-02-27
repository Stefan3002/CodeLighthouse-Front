import './stats-page.css'
import Transition from "../../utils/js/transitions";
import ChallengeMeta from "../ChallengeMeta/challenge-meta";
import {useEffect, useState} from "react";
import useFetchHook from "../../utils/hooks/fetchHook";
import {useParams} from "react-router-dom";
import TopSection from "../TopSection/top-section";
import AuthorName from "../AuthorName/author-name";
import Difficulty from "../Difficulty/difficulty";
import LikeSVG from '../../utils/imgs/SVGs/FullHeartSVG.svg'
import TickSVG from '../../utils/imgs/SVGs/TickSVG.svg'
import RetrySVG from '../../utils/imgs/SVGs/RetrySVG.svg'
import {exponentialDelay} from "../../utils/js/exponentialDelay";
const StatsPage = () => {
    const slug = useParams().slug
    const sendRequest = useFetchHook()
    const [data, setData] = useState(undefined)

    useEffect(() => {
        (async () => {
            const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/challenges/${slug}`, undefined, 'GET', true)
            setData(res)
        })()
    }, []);

    if(data)
    return (
        <Transition mode='fullscreen'>
            <TopSection title={data.title} nameOfPage='Challenge' children={<> <AuthorName author={data.author} /> <Difficulty difficulty={data.difficulty}/> </>} />


            <div className='wrapper stats-page'>


                <div style={{animationDelay: `${exponentialDelay(0)}ms`}} className="stats-likes stat">
                    <img src={LikeSVG} className='big-stat-icon' alt=""/>
                    <p className='stat-value'><b>{data.likes_received}</b></p>
                    <div className="stat-text">
                        <p>{data.likes_received === 1 ? 'Love' : data.likes_received === 0 ? 'No love' : 'Loves'}</p>
                        <p className='stat-small-text'>received</p>
                    </div>

                </div>


                <div>
                    <div style={{animationDelay: `${exponentialDelay(2)}ms`}} className="stats-attempted stat">
                        <img src={RetrySVG} className='regular-stat-icon' alt=""/>
                        <p className='stat-value'><b>{data.attempts}</b></p>
                        <div className="stat-text">
                            <p>{data.attempts === 1 ? 'Attempt' : 'Attempts'}</p>
                            <p className='stat-small-text'>made</p>
                        </div>

                    </div>
                    <div style={{animationDelay: `${exponentialDelay(4)}ms`}} className="stats-solved stat">
                        <img src={TickSVG} className='regular-stat-icon' alt=""/>
                        <p className='stat-value'><b>{data.solved}</b></p>
                        <div className="stat-text">
                            <p>{data.solved === 1 ? 'Solution' : 'Solutions'}</p>
                            <p className='stat-small-text'>found</p>
                        </div>

                    </div>
                </div>
                {/*<iframe title="CodeLighthousetest" width="1140" height="541.25"*/}
                {/*        src="https://app.powerbi.com/reportEmbed?reportId=82aa25ad-7738-46e6-ad90-5b9a0d73b9f7&autoAuth=true&ctid=90bc7298-1c17-48c6-830b-e88b375f216d"*/}
                {/*        frameBorder="0" allowFullScreen="true"></iframe>*/}
            </div>

            {/*<ChallengeMeta type='stats' data={data} />*/}
        </Transition>
    )
}
export default StatsPage