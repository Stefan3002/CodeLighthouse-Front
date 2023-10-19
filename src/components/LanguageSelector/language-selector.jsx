import './language-selector.css'
import JS from '../../utils/imgs/languages/JS.svg'
import Python from '../../utils/imgs/languages/Python.svg'
import {useDispatch, useSelector} from "react-redux";
import {getLanguage, getLanguagePicker} from "../../utils/store/utils-store/utils-store-selectors";
import LanguagePickerExtension from "../LanguagePickerExtension/language-picker-extension";
import {setLanguagePicker} from "../../utils/store/utils-store/utils-store-actions";
import {useEffect, useState} from "react";
const LanguageSelector = ({modifiable = true}) => {
    const isExtended = useSelector(getLanguagePicker)
    const dispatch = useDispatch()
    const selectedLang = useSelector(getLanguage)
    const [lang, setLang] = useState({
        name: 'JavaScript',
        img: JS
    })
    const openLanguagePicker = () => {
        dispatch(setLanguagePicker(true))
    }

    useEffect(() => {
        console.log(selectedLang)
        switch (selectedLang){
            case 'javascript':
                setLang({
                    name: 'JavaScript',
                    img: JS
                })
                break
            case 'python':
                setLang({
                    name: 'Python',
                    img: Python
                })
                break
        }
    }, [selectedLang]);
    if(lang)
    return (
        <div className='language-picker'>
            <div onClick={openLanguagePicker} className='language-picker-option'>
                <img src={lang.img} alt=""/>
                <p>{lang.name}</p>
            </div>
            {modifiable && isExtended ? <LanguagePickerExtension /> : null}
        </div>
    )
}
export default LanguageSelector