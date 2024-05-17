import './heading.css'
const Heading = ({text, extraClass = ''}) => {
    return (
        <div className={`heading ${extraClass}`}>
            {text ? <h2>{text}</h2> : null}
            <p>•• ━━━━━ ••●•• ━━━━━ ••</p>
        </div>
    )
}
export default Heading