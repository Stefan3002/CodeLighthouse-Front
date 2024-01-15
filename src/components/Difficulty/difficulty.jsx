import './difficulty.css'
import {useEffect, useState} from "react";
import Dark5 from '../../utils/imgs/difficulties/Dark5.png'
import Dark4 from '../../utils/imgs/difficulties/Dark4.png'
import Dark3 from '../../utils/imgs/difficulties/Dark3.png'
import Dark2 from '../../utils/imgs/difficulties/Dark2.png'
import Dark1 from '../../utils/imgs/difficulties/Dark1.png'
import Light1 from '../../utils/imgs/difficulties/Light1.png'
import Light2 from '../../utils/imgs/difficulties/Light2.png'
import Light3 from '../../utils/imgs/difficulties/Light3.png'
import Light4 from '../../utils/imgs/difficulties/Light4.png'
import Light5 from '../../utils/imgs/difficulties/Light5.png'
import WithInfo from "../WithInfo/with-info";

const Difficulty = ({difficulty}) => {
    const [img, setImg] = useState(undefined)
    useEffect(() => {
        switch (difficulty){
            case -5:
                setImg(Dark5)
                break
            case -4:
                setImg(Dark4)
                break
            case -3:
                setImg(Dark3)
                break
            case -2:
                setImg(Dark2)
                break
            case -1:
                setImg(Dark1)
                break
            case 1:
                setImg(Light1)
                break
            case 2:
                setImg(Light2)
                break
            case 3:
                setImg(Light3)
                break
            case 4:
                setImg(Light4)
                break
            case 5:
                setImg(Light5)
                break
        }
    }, []);
    return (
        <WithInfo data='Difficulty' clickHandler={() => null}>
            <img className='difficulty-img' src={img} alt=""/>
        </WithInfo>
    )
}
export default Difficulty