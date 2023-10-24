import './typewriter.css'
import {startTypewriter, stopTypewriter} from './typewriter-logic'
import {useEffect} from "react";
const Typewriter = () => {

    useEffect(() => {
        stopTypewriter()
        startTypewriter()
    }, []);

    return (
        <div>
            <h2 className='container-typewriter'></h2>
        </div>
    )
}
export default Typewriter