import './landing-page-bullet-list.css'
const LandingPageBulletList = ({slide, setCurrentSlide}) => {

    const changeSlide = (slide) => {
        setCurrentSlide(slide)
    }


    return (
        <div aria-hidden='true' className='landing-page-bullet-list'>
            <span aria-hidden='true' onClick={() => changeSlide(1)} className={`bullet-1 bullet ${slide === 1 && 'active-slide'}`}></span>
            <span aria-hidden='true' onClick={() => changeSlide(2)} className={`bullet-2 bullet ${slide === 2 && 'active-slide'}`}></span>
            <span aria-hidden='true' onClick={() => changeSlide(3)} className={`bullet-3 bullet ${slide === 3 && 'active-slide'}`}></span>
            <span aria-hidden='true' onClick={() => changeSlide(4)} className={`bullet-4 bullet ${slide === 4 && 'active-slide'}`}></span>
        </div>
    )
}
export default LandingPageBulletList