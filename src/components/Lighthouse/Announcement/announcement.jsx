import './announcement.css'
import AuthorName from "../../AuthorName/author-name";
import DateTime from "../../DateTime/date-time";
import DateSVG from '../../../utils/imgs/SVGs/CalendarSVG.svg'
import {useDispatch, useSelector} from "react-redux";
import {getUser} from "../../../utils/store/user-store/user-store-selectors";
import WithInfo from "../../WithInfo/with-info";
import DeleteDarkSVG from "../../../utils/imgs/SVGs/DeleteDarkSVG.svg";
import useFetchHook from "../../../utils/hooks/fetchHook";
import useUpdateData from "../../../utils/hooks/updateDataHook";
import {setModal, setModalContent} from "../../../utils/store/utils-store/utils-store-actions";
import UploadedFile from "../../UploadedFile/uploaded-file";
import SelectedFiles from "../../SelectedFiles/selected-files";
const Announcement = ({data}) => {

    const user = useSelector(getUser)
    const sendRequest = useFetchHook()
    const updateData = useUpdateData()
    const dispatch = useDispatch()
    const successCallback = async () => {
        dispatch(setModal(true))
        dispatch(setModalContent({
            type: 'success',
            data: 'Announcement deleted!'
        }))
        await updateData(true)
    }

    const deleteAnnouncement = async () => {
        const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/announcements-delete/${data.id}`, undefined , 'DELETE', false, successCallback, ['Deleting announcement!', 'Sending notifications!'])
    }
    return (
        <div className='announcement'>
            <div className="announcement-content">
                <p className='danger-html' dangerouslySetInnerHTML={{__html: data.content}}></p>
                <SelectedFiles data={[{
                    name: data.file,
                    url: data.file
                }]}/>
            </div>
            <div className="announcement-meta">
                <AuthorName color='dark' author={data.author} />
                <DateTime icon={DateSVG} data={data.date} />
                {data.author.user_id === user.user_id &&
                    <WithInfo data='Delete announcement' clickHandler={deleteAnnouncement}><img src={DeleteDarkSVG} className='icon-svg' alt=""/></WithInfo>
                }

            </div>
        </div>
    )
}
export default Announcement