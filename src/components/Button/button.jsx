import './button.css'
import PlusSVG from '../../utils/imgs/SVGs/PlusSVG.svg'
const Button = ({text, color='dark', type='normal', callback, buttonType = ''}) => {
    if(type === 'normal')
        return (
            <button type={buttonType}  className='button'>
                {text}
            </button>
        )
    else
        if(type === 'plus')
            return (
                <img onClick={() => callback()} src={PlusSVG} className='plus-button' />
            )
}
export default Button