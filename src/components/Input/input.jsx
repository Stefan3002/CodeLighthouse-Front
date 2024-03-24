import './input.css'
import {useState} from "react";
const Input = ({id, marginated = false, step = .01, onChangeCallback = undefined, required = false, defaultValue, placeholder, type='text', rows = 40, cols = 100, value = undefined}) => {
    const [actualValue, setActualValue] = useState(value)

    const changeActualValue = (newValue) => {
        setActualValue(newValue.target.value)
        if(onChangeCallback)
            onChangeCallback(newValue.target.value)
    }

    if(type === 'textarea')
        return (
            <textarea id={id} onChange={changeActualValue} value={actualValue} rows={rows} cols={cols} className='input text-area-input' placeholder={placeholder}>

            </textarea>
        )
    else
    if(type === 'number')
        return (
            <input id={id} type='number' step={step} onChange={changeActualValue} value={actualValue} className='input' placeholder={placeholder}>

            </input>
        )
    if(type === 'file')
        return (
            <input id={id} type='file' onChange={onChangeCallback} multiple={true} className='input'>

            </input>
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
        if(type === 'search')
        return (
            <input id={id} style={{marginTop: marginated ? '1rem' : 0}} required={required} onChange={onChangeCallback} className='input' value={actualValue} type={type} placeholder={placeholder}>

            </input>
        )
    else
        return (
            <input id={id} required={required} onChange={changeActualValue} className='input' value={actualValue} type={type} placeholder={placeholder}>

            </input>
        )
}
export default Input