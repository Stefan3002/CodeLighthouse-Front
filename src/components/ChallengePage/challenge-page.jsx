import './challenge-page.css'
import Transition from "../../utils/js/transitions";
import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import useFetchHook from "../../utils/hooks/fetchHook";
import Difficulty from "../Difficulty/difficulty";
import {Editor} from "@monaco-editor/react";
import LanguageSelector from "../LanguageSelector/language-selector";
import Button from "../Button/button";
import TickSVG from '../../utils/imgs/SVGs/TickSVG.svg'
import {useDispatch, useSelector} from "react-redux";
import ModifySVG from '../../utils/imgs/SVGs/ModifySVG.svg'
import {getUser} from "../../utils/store/user-store/user-store-selectors";
import {setModal, setModalContent} from "../../utils/store/utils-store/utils-store-actions";
import ChallengeMeta from "../ChallengeMeta/challenge-meta";
import TopSection from "../TopSection/top-section";
import AuthorName from "../AuthorName/author-name";
import useUpdateData from "../../utils/hooks/updateDataHook";
import ExclamationSVG from '../../utils/imgs/SVGs/ExclamationSVG.svg'
import AdminSVG from '../../utils/imgs/SVGs/AdminSVG.svg'
const ChallengePage = () => {
    const slug = useParams().slug
    const [data, setData] = useState(undefined)
    const sendRequest = useFetchHook()
    const user = useSelector(getUser)
    const dispatch = useDispatch()
    const updateData = useUpdateData()

    useEffect(() => {
        updateData(false)
    }, [])

    useEffect(() => {
        (async () => {
            const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/challenges/${slug}`, undefined, 'GET', false)
            setData(res)
        })()
    }, []);

    const modifyChallenge = () => {
        dispatch(setModal(true))
        dispatch(setModalContent({
            type: 'modifyChallenge',
            data
        }))
    }

    const openAdminModal = () => {
        dispatch(setModal(true))
        dispatch(setModalContent({
            type: 'admin',
            content: data
        }))
    }

    const reportChallenge = () => {
        dispatch(setModal(true))
        dispatch(setModalContent({
            type: 'report',
            content: data
        }))
    }


    if(data)
        return (
            <Transition mode='fullscreen'>
                <TopSection title={data.private ? `${data.title} (private)` : data.title} nameOfPage='Challenge' children={
                    <>
                        <AuthorName author={data.author} />
                        <div className='challenge-top-section'>
                            <Difficulty difficulty={data.difficulty}/>
                            <div onClick={reportChallenge}>
                                <img className='icon-svg' src={ExclamationSVG} alt="!"/><p>Report</p>
                            </div>
                            <div onClick={openAdminModal}>
                                {user.admin_user ?
                                    <>
                                        <img className='icon-svg' src={AdminSVG} alt='Admin' />
                                        <p>Admin menu</p>
                                    < />
                                    : null}
                            </div>
                            <div onClick={modifyChallenge}>
                            {user.user_id === data.author.user_id || user.admin_user ?
                                <>
                                    <img className='icon-svg' src={ModifySVG} alt=""/>
                                    <p>Modify</p>
                                </>
                                : null}
                            </div>
                        </div>
                    </>
                }
                />
                <div className='wrapper challenge-page'>
                    <div className="challenge-page-meta">
                        {/*<Difficulty difficulty={data.difficulty}/>*/}
                        {user.solved_challenges.includes(data.id) ? <img src={TickSVG} className='icon-svg' alt="Solved!"/> : null }
                        {/*<h1>{data.title}</h1>*/}

                    </div>
                    <div className="challenge-page-content">
                        <p dangerouslySetInnerHTML={{__html: data.description}}></p>
                    </div>
                    {/*<div className="challenge-page-language">*/}
                    {/*    <LanguageSelector/>*/}
                    {/*    <Link to='code'><Button text='Code!'/></Link>*/}
                    {/*</div>*/}
                </div>
                <ChallengeMeta type='restricted' solved={user.solved_challenges.includes(data.id)} data={data} />
            </Transition>
        );
}
export default ChallengePage