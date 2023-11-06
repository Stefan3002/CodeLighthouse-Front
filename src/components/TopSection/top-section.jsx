import './top-section.css'
const TopSection = ({nameOfPage, title, subtitle, children}) => {
    return (
        <div className='top-section'>
            <p>{nameOfPage}</p>
            <h1>{title}</h1>
            <p>{subtitle}</p>
            <div className="top-section-children">
                {children}
            </div>
        </div>
    )
}
export default TopSection