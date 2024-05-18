import './contest-people-page.css'
import Transition from "../../utils/js/transitions";
import Button from "../Button/button";
import CopySVG from "../../utils/imgs/SVGs/CopySVG.svg";
import TableSVG from "../../utils/imgs/SVGs/TableSVG.svg";
import WithInfo from "../WithInfo/with-info";
import ReloadSVG from "../../utils/imgs/SVGs/ReloadSVG.svg";
import ChangeSVG from "../../utils/imgs/SVGs/ModifySVG.svg";
import EyeSVG from "../../utils/imgs/SVGs/EyeSVG.svg";
import Input from "../Input/input";
import AuthorName from "../AuthorName/author-name";
import Missing from "../Missing/missing";
import {useDispatch, useSelector} from "react-redux";
import {getUser} from "../../utils/store/user-store/user-store-selectors";
import {Outlet, useParams} from "react-router-dom";
import useFetchHook from "../../utils/hooks/fetchHook";
import {useEffect, useState} from "react";
import useUpdateData from "../../utils/hooks/updateDataHook";
import {setError, setModal, setModalContent} from "../../utils/store/utils-store/utils-store-actions";
const ContestPeoplePage = () => {
    const user = useSelector(getUser)
    const contestID = useParams()['id']
    const sendRequest = useFetchHook()
    const [data, setData] = useState(undefined)
    const dispatch = useDispatch()
    const updateData = useUpdateData(`${process.env.REACT_APP_SERVER_URL}/contests/${contestID}`)
    const [people, setPeople] = useState([])


    useEffect(() => {
        (async () => {
            const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/contests/${contestID}`, undefined, 'GET', true)
            setData(res)
            setPeople(res.people)
        })()
    }, []);

    const successCallback = async (data) => {
        dispatch(setModal(true))
        dispatch(setModalContent({
            type: 'success',
            content: data.data
        }))
        setData(await updateData(true))
    }

    const changeUserPassword = async (userID) => {
        const dataFetch = {
            userID
        }
        const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/contest-reset-password/${contestID}`, JSON.stringify(dataFetch), 'POST', false, successCallback)
    }
    const confirmChangeUserPassword = (userID, username) => {
        dispatch(setModal(true))
        dispatch(setModalContent({
            type: 'confirm',
            content: () => changeUserPassword(userID),
            extraData: `<p>Reset password of user: <b>${username}</b></p>`
        }))
    }

    const changeUserEmail = async (userID, username, contestID) => {
        dispatch(setModal(true))
        dispatch(setModalContent({
            type: 'change-email',
            content: username,
            userID,
            contestID
        }))
    }

    const seeUserSummary = async (userID, username, contestID) => {

        const dataFetch = {
            userID
        }
        const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/contest-participant-summary/${contestID}`, JSON.stringify(dataFetch), 'POST', false)
        if(!Object.keys(res).length || !res){
            // dispatch(setModal(true))
            dispatch(setError('<p>No submissions, no summary!</p>'))
        }
        else {
            dispatch(setModal(true))
            dispatch(setModalContent({
                type: 'summary',
                content: username,
                userID,
                contestID,
                summary: res
            }))
        }
    }
    const searchStudent = (event) => {
        const target = event.target.value

        setPeople((oldPeople) => {
            return data.people.filter((person) => person.username.toLowerCase().includes(target.toLowerCase()))
        })
    }

    const seeUserSubmissions = async (userID, username, contestID) => {
        const dataFetch = {
            userID
        }
        const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/contest-get-submissions/${contestID}`, JSON.stringify(dataFetch), 'POST', false, undefined)
        if(!res || !res.length){
            // dispatch(setModal(true))
            dispatch(setError('<p>No submissions!</p>'))
        }
        else {
            dispatch(setModal(true))
            dispatch(setModalContent({
                type: 'contest-submissions',
                data: {
                    username,
                    submissions: res,
                }
            }))
        }
    }
    if(user)
    return (
        <Transition mode='fullscreen'>
            <div className='wrapper lighthouse-details-page'>
                <div className="lighthouse-details-header">
                    <div className="enrollment-details-main">
                        {/*{user.user_id === data.author.user_id ?*/}
                        {/*    <Button callback={archiveLighthouse} text='Archive this Lighthouse' type='normal' />*/}
                        {/*    : null*/}
                        {/*}*/}
                        <br/>
                        {data && data.description ? data.description : 'Why did you not provide a description???'}
                    </div>

                </div>
                <div className='enrollment-details-people'>
                    <h2>Participants in the contest ({data && data.people.length}):</h2>
                    <div className="enrollment-details-people-inner">
                        <Input type='search' placeholder='Search participant' onChangeCallback={searchStudent} />
                        {people.length > 0 ? people.map(person => {
                            return <div className='participant-container'>
                            <AuthorName color='dark' author={person} />
                            {user.admin_user &&
                                <>
                                    { !person.provider &&
                                        <WithInfo data="Regenerate participant's password" clickHandler={() => confirmChangeUserPassword(person.id, person.username)}><img src={ReloadSVG} className='icon-svg' alt=""/></WithInfo>
                                    }
                                    { !person.provider &&
                                        <WithInfo data="Change participant's e-mail" clickHandler={() => changeUserEmail(person.id, person.username, data.id)}><img src={ChangeSVG} className='icon-svg' alt=""/></WithInfo>
                                    }
                                    <WithInfo data="See participant's submissions" clickHandler={() => seeUserSubmissions(person.id, person.username, data.id)}><img src={EyeSVG} className='icon-svg' alt=""/></WithInfo>
                                    <WithInfo data="See how the participant performed" clickHandler={() => seeUserSummary(person.id, person.username, data.id)}><img src={TableSVG} className='icon-svg' alt=""/></WithInfo>
                                </>
                            }
                            </div>
                        }) : <Missing text='You are the only one here!' />}
                    </div>
                </div>

            </div>

        </Transition>
    )
}
export default ContestPeoplePage