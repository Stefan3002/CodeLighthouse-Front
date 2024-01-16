import './spinner.css'
import SpinnerSVG from '../../utils/imgs/SpinnerSVG.svg'
import {useSelector} from "react-redux";
import {getLoadingContent} from "../../utils/store/utils-store/utils-store-selectors";
import {useEffect, useRef, useState} from "react";
import spinnerTimeout from '../../utils/spinnerTimeoutMessages.json'
const Spinner = () => {
    const loadingContent = useSelector(getLoadingContent)
    const [index, setIndex] = useState(0)

    useEffect(() => {
        if(loadingContent.length) {
            setTimeout(() => {
                if (index < loadingContent.length - 1)
                    setIndex((prevState) => prevState + 1)
                else
                    setIndex(0)
            }, spinnerTimeout.timeout)
        }
    }, [index]);

    return (
        <div className='spinner-container'>
            <img src={SpinnerSVG} alt=""/>
            {loadingContent.length && <p key={`loading-message-${index}`} className='loading-message'>{loadingContent[index]}</p>}
        </div>
    )
}
export default Spinner