import './language-picker-extension.css'
import JS from "../../utils/imgs/languages/JS.svg";
import Python from "../../utils/imgs/languages/Python.svg";
import {useDispatch} from "react-redux";
import {setLanguage, setLanguagePicker} from "../../utils/store/utils-store/utils-store-actions";
const LanguagePickerExtension = ({lightColored = false, down}) => {
    const dispatch = useDispatch()
    const selectLanguage = (lang) => {
        dispatch(setLanguage(lang))
        dispatch(setLanguagePicker(false))

    }

    return (
        <div className="language-picker-extension" style={{transform: down ? 'translate(-50%, +26%)' : 'translate(-50%, -126%)'}}>
            <div onClick={() => selectLanguage('Javascript')} className={`language-picker-option ${lightColored ? 'light-colored' : null}`}>
                <img src={JS} alt=""/>
                <p>JavaScript</p>
            </div>
            <div onClick={() => selectLanguage('Python')} className={`language-picker-option ${lightColored ? 'light-colored' : null}`}>
                <img src={Python} alt=""/>
                <p>Python 3</p>
            </div>
        </div>
    )
}
export default LanguagePickerExtension