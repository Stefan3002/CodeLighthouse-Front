import './App.css';
import {Route, Routes, useLocation} from "react-router-dom";
import AppNavigation from "./components/AppNavigation/app-navigation";
import LandingPageHome from "./components/LandingPageComponents/LandingPageHome/landing-page-home";
import LandingPageFeatures from "./components/LandingPageComponents/LandingPageFeatures/landing-page-header";
import LandingPageAbout from "./components/LandingPageComponents/LandingPageAbout/landing-page-about";
import {useEffect} from "react";
import jsonParser from "./utils/js/json-parser";
import AppHome from "./components/AppHome/app-home";
import Authenticate from "./components/Authenticate/authenticate";
import {AnimatePresence} from "framer-motion";
import ProtectedRoute from "./components/ProtectedRoute/protected-route";
import CompleteProfilePage from "./components/CompleteProfilePage/complete-profile-page";
import {useDispatch, useSelector} from "react-redux";
import {
    getError,
    getLoading,
    getModalContent,
    getModalOpened,
    getSidePanel
} from "./utils/store/utils-store/utils-store-selectors";
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
import LighthouseAssignmentsPage from "./components/LighthouseAssignmentsPage/lighthouse-assignments-page";
import SidePanel from "./components/SidePanel/side-panel";
import ChallengesNav from "./components/ChallengesNav/challenges-nav";
import CommentsPage from "./components/CommentsPage/comments-page";
import StatsPage from "./components/StatsPage/stats-page";
import SubmissionsPage from "./components/SubmissionsPage/submissions-page";
import NotFoundPage from "./components/NotFoundPage/not-found-page";
import LighthouseSubmissionsPage from "./components/LighthouseSubmissionsPage/lighthouse-submissions-page";

function App() {
    const location = useLocation()
    const loading = useSelector(getLoading)
    const error = useSelector(getError)
    const dispatch = useDispatch()
    const modalOpened = useSelector(getModalOpened)
    const sendRequest = useFetchHook()
    const modalType = useSelector(getModalContent).type
    const sidePanel = useSelector(getSidePanel)
    return (
        <div className="App">

            {loading ? <><Blur type='dark' /><Spinner /></> : null}
            {error ? <><Blur /><Modal error={error} /></> : null}
            {modalOpened ? <><Blur /><Modal type={modalType} /></> : null}
            {sidePanel.opened ? <SidePanel type={sidePanel.type} /> : null}

            <AnimatePresence mode='wait'>
                <Routes key={location.pathname} location={location}>
                    {/*<Route path='/' element={<AppNavigation />}>*/}
                    {/*</Route>*/}
                    <Route path='/' element={<LandingPageHome />} />
                    <Route path='/features' element={<LandingPageFeatures />} />
                    <Route path='/about' element={<LandingPageAbout />} />
                    <Route path='/auth' element={<Authenticate mode='1' />} />
                    <Route path='/app' element={<ProtectedRoute> <AppNavigation /> </ProtectedRoute>} >
                        <Route index element={<AppHome />} />
                        <Route path='complete-profile' element={<CompleteProfilePage />} />
                        <Route path='lighthouses' element={<LighthousesPage />} />
                        <Route path='challenges' element={<ChallengesPage />} />
                        <Route path='challenges/:slug' element={<ChallengesNav />}>
                            <Route index element={<ChallengePage />} />
                            <Route path='comments' element={<CommentsPage />} />
                            <Route path='stats' element={<StatsPage />} />
                            <Route path='code' element={<CodePage />} />
                            <Route path='submissions' element={<SubmissionsPage />} />
                        </Route>
                        <Route path='add' element={<AddChallengePage />} />
                        <Route path='users/:id' element={<ProfilePage />} />
                        <Route path='lighthouses/:id' element={<LighthousePage />} >
                            <Route path='people' element={<LighthouseDetailsPage />} />
                            <Route path='assignments' element={<LighthouseAssignmentsPage />} />
                            <Route path='submissions/:assignmentId' element={<LighthouseSubmissionsPage />} />
                        </Route>
                    </Route>
                {/*    404 Route here!*/}
                    <Route path='*' element={<AppNavigation />} >
                        <Route path='*' element={<NotFoundPage />} />
                    </Route>
                </Routes>
            </AnimatePresence>
        </div>
    );
}

export default App;
