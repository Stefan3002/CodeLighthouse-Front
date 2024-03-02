import './contest-results-page.css'
import Input from "../Input/input";
import AuthorName from "../AuthorName/author-name";
import WithInfo from "../WithInfo/with-info";
import ReloadSVG from "../../utils/imgs/SVGs/ReloadSVG.svg";
import ChangeSVG from "../../utils/imgs/SVGs/ModifySVG.svg";
import Missing from "../Missing/missing";
import Transition from "../../utils/js/transitions";
import {useDispatch, useSelector} from "react-redux";
import {getUser} from "../../utils/store/user-store/user-store-selectors";
import {useParams} from "react-router-dom";
import useFetchHook from "../../utils/hooks/fetchHook";
import {useEffect, useState} from "react";
import useUpdateData from "../../utils/hooks/updateDataHook";
const ContestResultsPage = () => {
    const user = useSelector(getUser)
    const contestID = useParams()['id']
    const sendRequest = useFetchHook()
    const [data, setData] = useState(undefined)


    useEffect(() => {
        (async () => {
            const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/contests/${contestID}`, undefined, 'GET', true)
            setData(res)
        })()
    }, []);

    console.log('aaa', data)

    if(data)
    return (
        <Transition mode='fullscreen'>
            <div className='wrapper lighthouse-details-page'>
                <div className="lighthouse-details-header">
                    <div className="enrollment-details-main">
                    </div>

                </div>
                <div className='enrollment-details-people'>
                    <div className="enrollment-details-people-inner">
                        {data.people.map(person => {
                            return <AuthorName author={person} color='dark' />
                        })}

                    </div>
                </div>

            </div>

        </Transition>
    )
}
export default ContestResultsPage