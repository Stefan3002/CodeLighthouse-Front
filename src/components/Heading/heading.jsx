import './heading.css'
const Heading = ({text}) => {
    return (
        <div className='heading'>
            {text ? <h2>{text}</h2> : null}
            <p>•• ━━━━━ ••●•• ━━━━━ ••</p>
        </div>
    )
}
export default Heading