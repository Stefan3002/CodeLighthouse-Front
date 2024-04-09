import './difficulty-picker.css'
import Light1 from '../../utils/imgs/difficulties/Light1.png'
import Light2 from '../../utils/imgs/difficulties/Light2.png'
import Light3 from '../../utils/imgs/difficulties/Light3.png'
import Light4 from '../../utils/imgs/difficulties/Light4.png'
import Light5 from '../../utils/imgs/difficulties/Light5.png'
import Dark5 from '../../utils/imgs/difficulties/Dark5.png'
import Dark4 from '../../utils/imgs/difficulties/Dark4.png'
import Dark3 from '../../utils/imgs/difficulties/Dark3.png'
import Dark2 from '../../utils/imgs/difficulties/Dark2.png'
import Dark1 from '../../utils/imgs/difficulties/Dark1.png'
import Javascript from '../../utils/imgs/languages/JS.svg'
import Python from '../../utils/imgs/languages/Python.svg'
import Ruby from '../../utils/imgs/languages/Ruby.svg'
import {useDispatch, useSelector} from "react-redux";
import {setDifficulty, setLanguage} from "../../utils/store/utils-store/utils-store-actions";
import {getDifficulty, getLanguage} from "../../utils/store/utils-store/utils-store-selectors";
const DifficultyPicker = ({type = 'difficulties', currentChallenge = undefined}) => {
    const dispatch = useDispatch()
    const selectedLang = useSelector(getLanguage)
    const selectedDifficulty = useSelector(getDifficulty)

    const languages = [
        {
            name: 'Javascript',
            img: Javascript
        },
        {
            name: 'Python',
            img: Python
        },
        {
            name: 'Ruby',
            img: Ruby
        }
    ]

    const setDiff = (difficulty) => {
        dispatch(setDifficulty(difficulty))
    }

    const setLang = (lang) => {
        dispatch(setLanguage(lang))
    }

    const difficulties = [
        {
            img: Dark5,
            text: -5
        },
        {
            img: Dark4,
            text: -4
        },
        {
            img: Dark3,
            text: -3
        },
        {
            img: Dark2,
            text: -2
        },
        {
            img: Dark1,
            text: -1
        },
        {
            img: Light1,
            text: 1
        },
        {
            img: Light2,
            text: 2
        },
        {
            img: Light3,
            text: 3
        },
        {
            img: Light4,
            text: 4
        },
        {
            img: Light5,
            text: 5
        },
    ]


    if(type === 'difficulties')
    return (
        <div className='difficulty-picker'>
            {difficulties.map(diff => {
                return <div style={{transform: `${selectedDifficulty === diff.text ? 'scale(1.2)' : 'scale(1)' }` }} onClick={() => setDiff(diff.text)} className="difficulty">
                    <img src={diff.img} alt=""/>
                </div>
            })}
        </div>
    )
    else
        if(type === 'difficulties-small')
            return (
                <div className=''>

                </div>
            )
        else
            if(type === 'languages')
                return (
                    <div className='difficulty-picker languages'>
                        {languages.map(lang => {
                            return <div onClick={() => setLang(lang.name)} className={`difficulty language ${selectedLang === lang.name ? 'selected-language-challenge' : null}`}>
                                <img src={lang.img} alt=""/>
                            </div>
                        })}
                    </div>
                )
}
export default DifficultyPicker