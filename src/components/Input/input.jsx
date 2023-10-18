import './input.css'
const Input = ({placeholder, type='text'}) => {
    if(type === 'textarea')
        return (
            <textarea rows='40' cols='100' className='input text-area-input' placeholder={placeholder}>

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