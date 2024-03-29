import './button.css'
import PlusSVG from '../../utils/imgs/SVGs/PlusSVG.svg'
import {Link} from "react-router-dom";
const Button = ({id, size, imgSRC, ariaLabel, href='#', disabled = false, marginatedHorizontal = false, marginated = false, text, color='dark', type='normal', callback = () => {}, buttonType = ''}) => {
    if(type === 'anchor')
        return (
            <Link id={id} aria-label={ariaLabel} to={href}
                  style={
                    {
                        marginTop: marginated ? '1rem' : null,
                        marginRight: marginatedHorizontal ? '1rem' : null,
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
                } className='button button-anchor'>
                    {text}
            </Link>

        )
    if (type === 'normal')
        return (
            <button id={id} aria-label={ariaLabel} disabled={disabled} style={
                {
                    marginTop: marginated ? '1rem' : null,
                    marginRight: marginatedHorizontal ? '1rem' : null,
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
                <img id={id} aria-label={ariaLabel} onClick={() => callback()} src={PlusSVG} className='plus-button' />
            )
    else
        if(type === 'image')
            return (
                <img id={id} style={{maxWidth: `${size}px`, marginTop: marginated ? '1rem' : null}} aria-label={ariaLabel} onClick={() => callback()} src={imgSRC} className='icon-svg2' />
            )
}
export default Button