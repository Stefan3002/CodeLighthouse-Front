import './input.css'
import {useState} from "react";
const Input = ({placeholder, type='text', rows = 40, cols = 100, value = undefined}) => {
    const [actualValue, setActualValue] = useState(value)

    const changeActualValue = (newValue) => {
        setActualValue(newValue.value)
    }

    if(type === 'textarea')
        return (
            <textarea onChange={changeActualValue} value={actualValue} rows={rows} cols={cols} className='input text-area-input' placeholder={placeholder}>

            </textarea>
        )
    else
    if(type === 'checkbox')
        return (
            <div className='checkbox-input'>
                <input className='input' type={type}>

                </input>
                <p>{placeholder}</p>
            </div>

        )
    else
        return (
            <input onChange={changeActualValue} className='input' value={actualValue} type={type} placeholder={placeholder}>

            </input>
        )
}
export default Input