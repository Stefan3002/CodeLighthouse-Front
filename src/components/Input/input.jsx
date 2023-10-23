import './input.css'
const Input = ({placeholder, type='text', rows = 40, cols = 100}) => {
    if(type === 'textarea')
        return (
            <textarea rows={rows} cols={cols} className='input text-area-input' placeholder={placeholder}>

            </textarea>
        )
    else
    if(type === 'text')
        return (
            <input className='input' placeholder={placeholder}>

            </input>
        )
}
export default Input