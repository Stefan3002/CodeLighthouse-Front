import './contest-people-page.css'
import Transition from "../../utils/js/transitions";
import Button from "../Button/button";
import CopySVG from "../../utils/imgs/SVGs/CopySVG.svg";
import WithInfo from "../WithInfo/with-info";
import ReloadSVG from "../../utils/imgs/SVGs/ReloadSVG.svg";
import ChangeSVG from "../../utils/imgs/SVGs/ModifySVG.svg";
import Input from "../Input/input";
import AuthorName from "../AuthorName/author-name";
import Missing from "../Missing/missing";
import {useDispatch, useSelector} from "react-redux";
import {getUser} from "../../utils/store/user-store/user-store-selectors";
import {Outlet, useParams} from "react-router-dom";
import useFetchHook from "../../utils/hooks/fetchHook";
import {useEffect, useState} from "react";
import useUpdateData from "../../utils/hooks/updateDataHook";
import {setModal, setModalContent} from "../../utils/store/utils-store/utils-store-actions";
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

    const copyCodeToClipboard = () => {
        navigator.clipboard.writeText(data.enrollment_code)
        dispatch(setModal(true))
        dispatch(setModalContent({
            type: 'pop-up',
            data: 'Copied to clipboard!'
        }))
    }

    // const successCallback = () => {
    //     dispatch(setModal(true))
    //     dispatch(setModalContent({
    //         type: 'success',
    //         content: 'Contest archived!'
    //     }))
    // }
    //
    // const archiveLighthouse = async () => {
    //     dispatch(setModal(true))
    //     dispatch(setModalContent({
    //         type: 'confirm',
    //         content: async () => await sendRequest(`${process.env.REACT_APP_SERVER_URL}/lighthouses/${contestID}`, undefined, 'DELETE', false, successCallback)
    //     }))
    //     // const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/lighthouses/${contestID}`, undefined, 'DELETE', false, successCallback)
    // }

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
    const searchStudent = (event) => {
        const target = event.target.value

        setPeople((oldPeople) => {
            return data.people.filter((person) => person.username.toLowerCase().includes(target.toLowerCase()))
        })
    }

    if(user && data)
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
                        {data.description ? data.description : 'Why did you not provide a description???'}
                    </div>

                </div>
                <div className='enrollment-details-people'>
                    <h2>Participants in the contest ({data.people.length}):</h2>
                    <div className="enrollment-details-people-inner">
                        <Input type='search' placeholder='Search participant' onChangeCallback={searchStudent} />
                        {people.length > 0 ? people.map(person => {
                            return <div className='participant-container'>
                            <AuthorName color='dark' author={person} />
                            {user.admin_user &&
                                <>
                                    <WithInfo data="Regenerate participant's password" clickHandler={() => confirmChangeUserPassword(person.id, person.username)}><img src={ReloadSVG} className='icon-svg' alt=""/></WithInfo>
                                    <WithInfo data="Change participant's e-mail" clickHandler={() => changeUserEmail(person.id, person.username, data.id)}><img src={ChangeSVG} className='icon-svg' alt=""/></WithInfo>
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