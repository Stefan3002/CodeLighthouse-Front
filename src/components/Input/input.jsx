import './input.css'
import {useState} from "react";
const Input = ({defaultValue, placeholder, type='text', rows = 40, cols = 100, value = undefined}) => {
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
                {defaultValue === 'checked' ? <input id='checkbox-item' defaultChecked={true} className='input' type={type}>

                </input> : <input id='checkbox-item' className='input' type={type}>

                </input>}

                <label htmlFor='checkbox-item'>{placeholder}</label>
            </div>

        )
    else
        return (
            <input onChange={changeActualValue} className='input' value={actualValue} type={type} placeholder={placeholder}>

            </input>
        )
}
export default Input