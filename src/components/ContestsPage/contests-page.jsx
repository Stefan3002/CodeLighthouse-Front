import './contests-page.css'
import Parallax from "../Parallax/parallax";
import parallaxData from "../ContestsPage/parallax-data.json";
import ParallaxIMG from "../../utils/imgs/headers/ContestsHeader.jpg";
import {Link} from "react-router-dom";
import AuthorName from "../AuthorName/author-name";
import Transition from "../../utils/js/transitions";
import Heading from "../Heading/heading";
import Button from "../Button/button";
import {useDispatch, useSelector} from "react-redux";
import {getUser} from "../../utils/store/user-store/user-store-selectors";
import {setModal, setModalContent} from "../../utils/store/utils-store/utils-store-actions";
const ContestsPage = () => {
    const user = useSelector(getUser)
    const dispatch = useDispatch()
    const menuContests = () => {
        dispatch(setModal(true))
        dispatch(setModalContent({
            type: 'create-contest',
            content: undefined
        }))
    }

    return (
        <Transition mode='fullscreen'>
            <Parallax parallaxData={parallaxData} img={ParallaxIMG}/>
            {user.admin_user && <Button callback={menuContests} type='plus' />}


            <div className='wrapper contests-page'>
                <Heading text='Enrolled contests' />
                <Heading text='Open contests' />
            </div>
        </Transition>
    )
}
export default ContestsPage