import './language-selector.css'
import JS from '../../utils/imgs/languages/JS.svg'
import Python from '../../utils/imgs/languages/Python.svg'
import {useDispatch, useSelector} from "react-redux";
import {getLanguage, getLanguagePicker} from "../../utils/store/utils-store/utils-store-selectors";
import LanguagePickerExtension from "../LanguagePickerExtension/language-picker-extension";
import {setLanguagePicker} from "../../utils/store/utils-store/utils-store-actions";
import {useEffect, useState} from "react";
const LanguageSelector = ({lightColored = false, modifiable = true, down = true, type = 'selector', customLanguage}) => {
    const isExtended = useSelector(getLanguagePicker)
    const dispatch = useDispatch()
    const languagePickerOpened = useSelector(getLanguagePicker)
    const selectedLang = useSelector(getLanguage)
    const [lang, setLang] = useState({
        name: 'JavaScript',
        img: JS
    })
    const openLanguagePicker = () => {
        dispatch(setLanguagePicker(!languagePickerOpened))
    }

    useEffect(() => {
        if(type === 'simple-icon')
            switch (customLanguage){
                case 'Javascript':
                    setLang({
                        name: 'JavaScript',
                        img: JS
                    })
                    break
                case 'Python':
                    setLang({
                        name: 'Python',
                        img: Python
                    })
                    break
            }
        else
            switch (selectedLang){
                case 'Javascript':
                    setLang({
                        name: 'JavaScript',
                        img: JS
                    })
                    break
                case 'Python':
                    setLang({
                        name: 'Python',
                        img: Python
                    })
                    break
            }
    }, [selectedLang]);

    if(type === 'selector') {
        if (lang)
            return (
                <div className="language-picker">
                    <div onClick={openLanguagePicker}
                         className={`language-picker-option ${lightColored ? 'light-colored' : null}`}>
                        <img src={lang.img} alt=""/>
                        <p>{lang.name}</p>
                    </div>
                    {modifiable && isExtended ?
                        <LanguagePickerExtension lightColored={lightColored} down={down}/> : null}
                </div>
            )
    }
    else
        if(type === 'simple-icon')
            return (
                <div className="language-picker">
                    <img className='icon-svg' src={lang.img} alt=""/>
                </div>
            )
}
export default LanguageSelector