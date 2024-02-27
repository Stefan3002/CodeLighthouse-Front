import './contests-page.css'
import Parallax from "../Parallax/parallax";
import parallaxData from "../ContestsPage/parallax-data.json";
import ParallaxIMG from "../../utils/imgs/headers/ContestsHeader.jpg";
import {Link} from "react-router-dom";
import AuthorName from "../AuthorName/author-name";
import Transition from "../../utils/js/transitions";
import Heading from "../Heading/heading";
const ContestsPage = () => {
    return (
        <Transition mode='fullscreen'>
            <Parallax parallaxData={parallaxData} img={ParallaxIMG}/>
            <div className='wrapper contests-page'>
                <Heading text='Enrolled contests' />
                <Heading text='Open contests' />
            </div>
        </Transition>
    )
}
export default ContestsPage