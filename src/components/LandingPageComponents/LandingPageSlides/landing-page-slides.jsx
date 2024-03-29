import './landing-page-slides.css'
import LandingPageBulletList from "../LandingPageBulletList/landing-page-bullet-list";
import {useState} from "react";
import LandingPageSlideOne from "../Slides/LandingPageSlideOne/landing-page-slide-one";
import {AnimatePresence} from "framer-motion";
import LandingPageSlideTwo from "../Slides/LandingPageSlideTwo/landing-page-slide-two";
import LandingPageSlideThree from "../Slides/LandingPageSlideThree/landing-page-slide-three";
import LandingPageSlideFour from "../Slides/LandingPageSlideFour/landing-page-slide-four";
const LandingPageSlides = ({slide}) => {
    const [currentSlide, setCurrentSlide] = useState(1)

    return (
        <div>
            <LandingPageBulletList slide={currentSlide} setCurrentSlide={setCurrentSlide}/>
            <AnimatePresence >
                {currentSlide === 1 ?
                    <LandingPageSlideOne setCurrentSlide={setCurrentSlide} />
                    : currentSlide === 2 ?
                        <LandingPageSlideTwo setCurrentSlide={setCurrentSlide} />
                        : currentSlide === 3 ?
                            <LandingPageSlideThree setCurrentSlide={setCurrentSlide} />
                            : currentSlide === 4 ?
                                <LandingPageSlideFour />
                                : null

                }
            </AnimatePresence>

        </div>
    )
}
export default LandingPageSlides