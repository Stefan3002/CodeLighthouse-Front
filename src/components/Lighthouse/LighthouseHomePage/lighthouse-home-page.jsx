import './lighthouse-home-page.css'
import Button from "../../Button/button";
import {useDispatch, useSelector} from "react-redux";
import {setModal, setModalContent} from "../../../utils/store/utils-store/utils-store-actions";
import {useEffect, useState} from "react";
import useFetchHook from "../../../utils/hooks/fetchHook";
import {useParams} from "react-router-dom";
import {getUser} from "../../../utils/store/user-store/user-store-selectors";
const LighthouseHomePage = () => {
    const dispatch = useDispatch()
    const [data, setData] = useState(undefined)
    const sendRequest = useFetchHook()
    const lighthouseId = useParams().id
    const user = useSelector(getUser)
    const openAnnouncementModal = () => {
        dispatch(setModal(true))
        dispatch(setModalContent({
            type: 'announcement',
            data: data
        }))
    }

    useEffect(() => {
        (async () => {
            const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/lighthouses/${lighthouseId}`, undefined, 'GET', false)
            setData(res)
        })()
    }, []);


    if (data) {
        console.log('ccc', data)
        return (
            <>
                <div className='wrapper lighthouse-home-page'>
                    {data.announcements.map(announcement=> {
                            return announcement.content
                    })}
                </div>
                {user.user_id === data.author.user_id ?
                    <Button type='plus' callback={openAnnouncementModal}/>
                    : null
                }
            </>
        )
    }
}
export default LighthouseHomePage