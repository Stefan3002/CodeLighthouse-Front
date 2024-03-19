import './lighthouse-home-page.css'
import Button from "../../Button/button";
import {useDispatch, useSelector} from "react-redux";
import {setModal, setModalContent} from "../../../utils/store/utils-store/utils-store-actions";
import {useEffect, useState} from "react";
import useFetchHook from "../../../utils/hooks/fetchHook";
import {useParams} from "react-router-dom";
import {getUser} from "../../../utils/store/user-store/user-store-selectors";
import Announcement from "../Announcement/announcement";
import Missing from "../../Missing/missing";
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
            data: data,
            updateLighthouseDataHook: setData
        }))
    }

    useEffect(() => {
        (async () => {
            const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/lighthouses/${lighthouseId}`, undefined, 'GET', false)
            setData(res)
        })()
    }, []);

    if (data) {
        return (
            <>
                <div className='wrapper lighthouse-home-page'>
                    <div className="announcements">
                        {(data.announcements && data.announcements.length) ? data.announcements.map(announcement=> {
                            return <Announcement setPageUpdateDataHook={setData} data={announcement} />
                        }) : <Missing text='No announcements yet' />}
                    </div>
                </div>
                {!data.archived && user.user_id === data.author.user_id ?
                    <Button ariaLabel='Make a new announcement' type='plus' callback={openAnnouncementModal}/>
                    : null
                }
            </>
        )
    }
}
export default LighthouseHomePage