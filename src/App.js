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
import {useDispatch, useSelector} from "react-redux";
import {getError, getLoading, getModalContent, getModalOpened} from "./utils/store/utils-store/utils-store-selectors";
import Spinner from "./components/Spinner/spinner";
import Blur from "./components/Blur/blur";
import ChallengePage from "./components/ChallengePage/challenge-page";
import ChallengesPage from "./components/ChallengesPage/challenges-page";
import Modal from "./components/Error/modal";
import AddChallengePage from "./components/AddChallengePage/add-challenge-page";
import ProfilePage from "./components/ProfilePage/profile-page";
import CodePage from "./components/CodePage/code-page";
import LighthousesPage from "./components/LighthousesPage/lighthouses-page";
import LighthousePage from "./components/LighthousePage/lighthouse-page";
import LighthouseDetailsPage from "./components/LighthouseDetailsPage/lighthouse-details-page";
import {setUser} from "./utils/store/user-store/user-store-actions";
import useFetchHook from "./utils/hooks/fetchHook";

function App() {
    const location = useLocation()
    const loading = useSelector(getLoading)
    const error = useSelector(getError)
    const dispatch = useDispatch()
    const modalOpened = useSelector(getModalOpened)
    const sendRequest = useFetchHook()
    const modalType = useSelector(getModalContent)

    // useEffect(() => {
    //     (async () => {
    //         const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/users/1`, undefined, 'GET', true)
    //         dispatch(setUser(res))
    //     })()
    //
    //     // dispatch(setUser({
    //     //     username: 'stefan',
    //     //     email: 'stefan.secrieru02@e-uvt.ro',
    //     //     pk: 1
    //     // }))
    // }, []);

    return (
        <div className="App">

            {loading ? <><Blur /><Spinner /></> : null}
            {error ? <><Blur error={true} /><Modal error={error} /></> : null}
            {modalOpened ? <><Blur modal={true} /><Modal type={modalType} /></> : null}

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
                        <Route path='lighthouses' element={<LighthousesPage />} />
                        <Route path='challenges/:slug' element={<ChallengePage />} />
                        <Route path='challenges/:slug/code' element={<CodePage />} />
                        <Route path='challenges' element={<ChallengesPage />} />
                        <Route path='add' element={<AddChallengePage />} />
                        <Route path='users/:id' element={<ProfilePage />} />
                        <Route path='lighthouses/:id' element={<LighthousePage />} >
                            <Route path='people' element={<LighthouseDetailsPage />} />
                        </Route>
                    </Route>
                </Routes>
            </AnimatePresence>
        </div>
    );
}

export default App;
