import './lighthouse-page.css'
import {Outlet, useParams} from "react-router-dom";
import Transition from "../../utils/js/transitions";
import useFetchHook from "../../utils/hooks/fetchHook";
import {useEffect, useState} from "react";
import LighthouseNavigation from "../Lighthouse/LighthouseNavigation/lighthouse-navigation";
import Button from "../Button/button";
import TopSection from "../TopSection/top-section";
import AuthorName from "../AuthorName/author-name";
import AssignmentsList from "../AssignmentsList/assignments-list";
import {useSelector} from "react-redux";
import {getUser} from "../../utils/store/user-store/user-store-selectors";
const LighthousePage = () => {
    const lighthouseID = useParams()['id']
    const sendRequest = useFetchHook()
    const user = useSelector(getUser)
    const [data, setData] = useState(undefined)

    useEffect(() => {
        (async () => {
            const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/lighthouses/${lighthouseID}`, undefined, 'GET', false)
            setData(res)
        })()
    }, []);


    if(data && user)
    return (
        <Transition mode='fullscreen'>
            <LighthouseNavigation />
            <TopSection nameOfPage='Lighthouse' children={<AuthorName author={data.author} />}
                        title={data.archived ? `${data.name} (archived)` : data.public ? `${data.name} {community}` : data.name} />
            <div className='wrapper lighthouse-page'>
                {/*<AssignmentsList limit={1} filters={false} user={user} data={user} filter='All' />*/}
            </div>
            <Outlet />
        </Transition>
    )
}
export default LighthousePage