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
const DifficultyPicker = () => {

    const setDifficulty = (difficulty) => {

    }


    return (
        <div className='difficulty-picker'>
            <div onClick={() => setDifficulty(-5)} className="difficulty">
                <img src={Dark5} alt=""/>
            </div>
            <div onClick={() => setDifficulty(-4)} className="difficulty">
                <img src={Dark4} alt=""/>
            </div>
            <div onClick={() => setDifficulty(-3)} className="difficulty">
                <img src={Dark3} alt=""/>
            </div>
            <div onClick={() => setDifficulty(-2)} className="difficulty">
                <img src={Dark2} alt=""/>
            </div>
            <div onClick={() => setDifficulty(-1)} className="difficulty">
                <img src={Dark1} alt=""/>
            </div>

            <div onClick={() => setDifficulty(1)} className="difficulty">
                <img src={Light1} alt=""/>
            </div>
            <div onClick={() => setDifficulty(2)} className="difficulty">
                <img src={Light2} alt=""/>
            </div>
            <div onClick={() => setDifficulty(3)} className="difficulty">
                <img src={Light3} alt=""/>
            </div>
            <div onClick={() => setDifficulty(4)} className="difficulty">
                <img src={Light4} alt=""/>
            </div>
            <div onClick={() => setDifficulty(5)} className="difficulty">
                <img src={Light5} alt=""/>
            </div>
        </div>
    )
}
export default DifficultyPicker