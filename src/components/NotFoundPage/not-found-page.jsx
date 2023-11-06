import './not-found-page.css'
import LighthouseSVG from '../../utils/imgs/SVGs/LighthouseSVG.svg'
import Button from "../Button/button";
import {Link} from "react-router-dom";
const NotFoundPage = () => {
    return (
        <div className='not-found-page'>
            <div className="not-found-hero">
                <img src={LighthouseSVG} alt=""/>
                <h2>Where are you?</h2>
                <p>We lost track of you!</p>
            </div>
            <div className="not-found-one">
                <h1>Ouch! We got <strong>404</strong>!</h1>
                <p>What is the <b>deal</b> with this number?</p>
            </div>
            <div className="not-found-two">
                <p>This number gets <b>in the way</b> of your enlightenment. That is why we <b>hate</b> it!</p>
                <p>Just go back <b>home</b> using the button <b>below</b> and start your <b>enlightenment
                    journey!</b></p>
                <Link to='/app'><Button text='Home!' /></Link>
            </div>
        </div>
    )
}
export default NotFoundPage