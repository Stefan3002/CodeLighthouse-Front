import './lighthouse-details-page.css'
import Transition from "../../utils/js/transitions";
import {useParams} from "react-router-dom";
import useFetchHook from "../../utils/hooks/fetchHook";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {getUser} from "../../utils/store/user-store/user-store-selectors";
const LighthouseDetailsPage = () => {
    const user = useSelector(getUser)
    const lighthouseID = useParams()['id']
    const sendRequest = useFetchHook()
    const [data, setData] = useState(undefined)

    useEffect(() => {
        (async () => {
            const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/lighthouses/${lighthouseID}`, undefined, 'GET', true)
            setData(res[0])
        })()
    }, []);
    console.log(user, data)
    if(user && data)
    return (
        <Transition mode='fullscreen'>
            <div className='wrapper lighthouse-details-page'>
                <div className="lighthouse-details-header">
                    <div className="enrollment-details-main">
                        {data.fields.description ? data.fields.description : 'Why did you not provide a description???'}
                    </div>
                    {user.pk === data.fields.author[2] ? <div className="enrollment-code-wrapper">
                        <p><b>Enrollment Code:</b></p>
                        <p className='enrollment-code'>{data.fields.enrollment_code}</p>
                    </div> : null}

                </div>
                <div>
                    {data.fields.people.map(person => {
                        return <p>{person[0]}</p>
                    })}
                </div>

            </div>
        </Transition>
    )
}
export default LighthouseDetailsPage