import './App.css';
import {Route, Routes} from "react-router-dom";
import LandingPageNavigation from "./components/LandingPageNavigation/landing-page-navigation";
import LandingPageHome from "./components/LandingPageHome/landing-page-home";
import LandingPageFeatures from "./components/LandingPageFeatures/landing-page-header";
import LandingPageAbout from "./components/LandingPageAbout/landing-page-about";
import {useEffect} from "react";
import jsonParser from "./utils/js/json-parser";
import AppHome from "./components/AppHome/app-home";
import Authenticate from "./components/Authenticate/authenticate";

function App() {

    return (
        <div className="App">
            <Routes>
                {/*<Route path='/' element={<LandingPageNavigation />}>*/}

                {/*</Route>*/}
                <Route path='/' element={<LandingPageHome />} />
                <Route path='/features' element={<LandingPageFeatures />} />
                <Route path='/about' element={<LandingPageAbout />} />
                <Route path='/auth' element={<Authenticate />} />
                <Route path='/app' element={<AppHome />} />
            </Routes>
        </div>
    );
}

export default App;
