import './lighthouse-card.css'
const LighthouseCard = ({data}) => {



    return (
        <div className='lighthouse-card'>
            <div className="lighthouse-card-header">
                <h2>{data.fields.name}</h2>
                <p>{data.fields.author[0]}</p>
            </div>
            <div className="lighthouse-card-content">

            </div>
        </div>
    )
}
export default LighthouseCard