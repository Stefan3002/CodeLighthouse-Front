import './language-picker-extension.css'
import JS from "../../utils/imgs/languages/JS.svg";
import Python from "../../utils/imgs/languages/Python.svg";
import Ruby from "../../utils/imgs/languages/Ruby.svg";
import {useDispatch} from "react-redux";
import {setLanguage, setLanguagePicker} from "../../utils/store/utils-store/utils-store-actions";
import {useEffect} from "react";
const LanguagePickerExtension = ({data = [], lightColored = false, down}) => {
    const dispatch = useDispatch()
    const selectLanguage = (lang) => {
        dispatch(setLanguage(lang))
        dispatch(setLanguagePicker(false))

    }

    const getLangIcon = (selectedLang) => {
        switch (selectedLang) {
            case 'Javascript':
                return JS
            case 'Python':
                return Python
            case 'Ruby':
                return Ruby
        }
    }

    return (
        <div className="language-picker-extension" style={{transform: down ? 'translate(-50%, +26%)' : 'translate(-50%, -126%)'}}>
            {data.map(code => {
                const {language} = code
                console.log(language)
                return <div onClick={() => selectLanguage(language)}
                            className={`language-picker-option ${lightColored ? 'light-colored' : null}`}>
                    <img src={getLangIcon(language)} alt=""/>
                    <p>{language}</p>
                </div>
            })}
        </div>
    )
}
export default LanguagePickerExtension