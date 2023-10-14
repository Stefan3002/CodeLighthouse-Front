import './parallax.css'
const Parallax = ({parallaxData, img}) => {
    return (
        <header className='parallax' style={{backgroundImage: `radial-gradient(circle at ${parallaxData.gradientRadius}, rgba(0,0,0,0), rgba(0,0,0,${parallaxData.gradientIntensity})), url(${img})`, height: parallaxData.height}}>
            <h1 style={{color: parallaxData.color}} className='parallax-title'>{parallaxData.title}</h1>
        </header>
    )
}
export default Parallax