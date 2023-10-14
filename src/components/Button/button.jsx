import './button.css'
const Button = ({text, color='dark'}) => {
    return (
        <button  className='button'>
            {text}
        </button>
    )
}
export default Button