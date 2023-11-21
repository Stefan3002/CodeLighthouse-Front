import './lighthouse-details-page.css'
import Transition from "../../utils/js/transitions";
import {Link, useParams} from "react-router-dom";
import useFetchHook from "../../utils/hooks/fetchHook";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUser} from "../../utils/store/user-store/user-store-selectors";
import AuthorName from "../AuthorName/author-name";
import Missing from "../Missing/missing";
import CopySVG from "../../utils/imgs/SVGs/CopySVG.svg";
import {setModal, setModalContent} from "../../utils/store/utils-store/utils-store-actions";
const LighthouseDetailsPage = () => {
    const user = useSelector(getUser)
    const lighthouseID = useParams()['id']
    const sendRequest = useFetchHook()
    const [data, setData] = useState(undefined)
    const dispatch = useDispatch()

    useEffect(() => {
        (async () => {
            const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/lighthouses/${lighthouseID}`, undefined, 'GET', true)
            setData(res)
        })()
    }, []);

    const copyCodeToClipboard = () => {
        navigator.clipboard.writeText(data.enrollment_code)
        dispatch(setModal(true))
        dispatch(setModalContent({
            type: 'pop-up',
            data: 'Copied to clipboard!'
        }))
    }


    if(user && data)
    return (



        <Transition mode='fullscreen'>
            <div className='wrapper lighthouse-details-page'>
                <div className="lighthouse-details-header">
                    <div className="enrollment-details-main">
                        {data.description ? data.description : 'Why did you not provide a description???'}
                    </div>
                    {user.id === data.author.id ? <div className="enrollment-code-wrapper">
                        <img onClick={copyCodeToClipboard} src={CopySVG} className='icon-svg' alt="Copy code"/>
                        <p><b>Enrollment Code:</b></p>
                        <p className='enrollment-code'>{data.enrollment_code}</p>
                        <p><b>Lighthouse ID:</b></p>
                        <p className='enrollment-code'>{data.id}</p>
                    </div> : null}

                </div>
                <div className='enrollment-details-people'>
                    <h2>Other people in this lighthouse ({data.people.length}):</h2>
                    <div className="enrollment-details-people-inner">
                        {data.people.length > 1 ? data.people.map(person => {
                            return <AuthorName color='dark' author={person} />
                        }) : <Missing text='You are the only one here!' />}
                    </div>
                </div>

            </div>
        </Transition>
    )
}
export default LighthouseDetailsPage