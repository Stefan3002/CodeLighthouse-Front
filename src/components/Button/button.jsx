import './button.css'
import PlusSVG from '../../utils/imgs/SVGs/PlusSVG.svg'
const Button = ({marginated = false, text, color='dark', type='normal', callback = () => {}, buttonType = ''}) => {
    if(type === 'normal')
        return (
            <button style={
                {
                    marginTop: marginated ? '1rem' : null,
                backgroundColor: color === 'light' ?
                    '#FEE1C7' : color === 'danger' ?
                        'crimson' : color === 'success' ?
                            '#69B578' : '#32292F', color: color === 'light' ?
                    '#32292F' :
                    null,
                    borderColor: color === 'light' ?
                        '#FEE1C7' : color === 'danger' ?
                            'crimson' : color === 'success' ?
                                '#69B578' : '#32292F'
                }
            } onClick={() => callback ? callback() : null} type={buttonType}  className='button'>
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