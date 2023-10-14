import './App.css';
import {Route, Routes, useLocation} from "react-router-dom";
import AppNavigation from "./components/AppNavigation/app-navigation";
import LandingPageHome from "./components/LandingPageHome/landing-page-home";
import LandingPageFeatures from "./components/LandingPageFeatures/landing-page-header";
import LandingPageAbout from "./components/LandingPageAbout/landing-page-about";
import {useEffect} from "react";
import jsonParser from "./utils/js/json-parser";
import AppHome from "./components/AppHome/app-home";
import Authenticate from "./components/Authenticate/authenticate";
import {AnimatePresence} from "framer-motion";
import ProtectedRoute from "./components/ProtectedRoute/protected-route";
import CompleteProfilePage from "./components/CompleteProfilePage/complete-profile-page";
import {useSelector} from "react-redux";
import {getLoading} from "./utils/store/utils-store/utils-store-selectors";
import Spinner from "./components/Spinner/spinner";
import Blur from "./components/Blur/blur";
import ChallengePage from "./components/ChallengePage/challenge-page";
import ChallengesPage from "./components/ChallengesPage/challenges-page";

function App() {
    const location = useLocation()
    const loading = useSelector(getLoading)
    return (
        <div className="App">

            {loading ? <><Blur /><Spinner /></> : null}

            <AnimatePresence mode='wait'>
                <Routes key={location.pathname} location={location}>
                    {/*<Route path='/' element={<AppNavigation />}>*/}
                    {/*</Route>*/}
                    <Route path='/' element={<LandingPageHome />} />
                    <Route path='/features' element={<LandingPageFeatures />} />
                    <Route path='/about' element={<LandingPageAbout />} />
                    <Route path='/auth' element={<Authenticate mode='1' />} />
                    <Route path='/app' element={<ProtectedRoute> <AppNavigation /> </ProtectedRoute>} >
                        <Route path='complete-profile' element={<CompleteProfilePage />} />
                        <Route path='home' element={<AppHome />} />
                        <Route path='challenges/:slug' element={<ChallengePage />} />
                        <Route path='challenges' element={<ChallengesPage />} />
                    </Route>
                </Routes>
            </AnimatePresence>
        </div>
    );
}

export default App;
