import './score.css'
import {useEffect, useState} from "react";
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
const Score = ({data}) => {
    const [IMG, setIMG] = useState(undefined)

    useEffect(() => {
        //  TODO: Change these numbers with the ones from the docs
        switch (true){
            case (data < 1000):
                setIMG(Dark5)
                break
            case (data >= 1000 && data < 8000):
                setIMG(Dark4)
                break
            case (data >= 8000 && data < 14000):
                setIMG(Dark3)
                break
            case (data >= 14000 && data < 20000):
                setIMG(Dark2)
                break
            case (data >= 20000 && data < 50000):
                setIMG(Dark1)
                break
            case (data >= 50000 && data < 60000):
                setIMG(Light1)
                break
            case (data >= 60000 && data < 80000):
                setIMG(Light2)
                break
            case (data >= 80000 && data < 100000):
                setIMG(Light3)
                break
            case (data >= 100000 && data < 150000):
                setIMG(Light4)
                break
            case (data >= 150000):
                setIMG(Light5)
                break
        }
    }, []);


    return (
        <div className='score'>
            <img className='difficulty-img' src={IMG} alt=""/>
            <p>{data}</p>
        </div>
    )
}
export default Score