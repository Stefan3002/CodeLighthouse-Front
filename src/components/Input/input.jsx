import './input.css'
const Input = ({placeholder, type='text', rows = 40, cols = 100}) => {
    if(type === 'textarea')
        return (
            <textarea rows={rows} cols={cols} className='input text-area-input' placeholder={placeholder}>

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
            <input className='input' type={type} placeholder={placeholder}>

            </input>
        )
}
export default Input