import './language-picker-extension.css'
import JS from "../../utils/imgs/languages/JS.svg";
import Python from "../../utils/imgs/languages/Python.svg";
import {useDispatch} from "react-redux";
import {setLanguage} from "../../utils/store/utils-store/utils-store-actions";
const LanguagePickerExtension = () => {
    const dispatch = useDispatch()
    const selectLanguage = (lang) => {
        dispatch(setLanguage(lang))
    }

    return (
        <div className="language-picker-extension">
            <div onClick={() => selectLanguage('javascript')} className='language-picker-option'>
                <img src={JS} alt=""/>
                <p>JavaScript</p>
            </div>
            <div onClick={() => selectLanguage('python')} className='language-picker-option'>
                <img src={Python} alt=""/>
                <p>Python 3</p>
            </div>
        </div>
    )
}
export default LanguagePickerExtension