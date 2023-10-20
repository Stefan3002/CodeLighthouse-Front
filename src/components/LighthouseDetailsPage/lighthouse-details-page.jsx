import './lighthouse-details-page.css'
import Transition from "../../utils/js/transitions";
import {Link, useParams} from "react-router-dom";
import useFetchHook from "../../utils/hooks/fetchHook";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {getUser} from "../../utils/store/user-store/user-store-selectors";
import AuthorName from "../AuthorName/author-name";
const LighthouseDetailsPage = () => {
    const user = useSelector(getUser)
    const lighthouseID = useParams()['id']
    const sendRequest = useFetchHook()
    const [data, setData] = useState(undefined)

    useEffect(() => {
        (async () => {
            const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/lighthouses/${lighthouseID}`, undefined, 'GET', true)
            setData(res)
        })()
    }, []);
    console.log(user, data)
    if(user && data)
    return (
        <Transition mode='fullscreen'>
            <div className='wrapper lighthouse-details-page'>
                <div className="lighthouse-details-header">
                    <div className="enrollment-details-main">
                        {data.description ? data.description : 'Why did you not provide a description???'}
                    </div>
                    {user.id === data.author.id ? <div className="enrollment-code-wrapper">
                        <p><b>Enrollment Code:</b></p>
                        <p className='enrollment-code'>{data.enrollment_code}</p>
                        <p><b>Lighthouse ID:</b></p>
                        <p className='enrollment-code'>{data.id}</p>
                    </div> : null}

                </div>
                <div className='enrollment-details-people'>
                    <h2>Other people in this lighthouse ({data.people.length}):</h2>
                    {data.people.map(person => {
                        return <AuthorName author={person} />
                    })}
                </div>

            </div>
        </Transition>
    )
}
export default LighthouseDetailsPage