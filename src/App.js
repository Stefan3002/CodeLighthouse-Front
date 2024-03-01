import './App.css';
import {Route, Routes, useLocation} from "react-router-dom";
import AppNavigation from "./components/AppNavigation/app-navigation";
import LandingPageHome from "./components/LandingPageComponents/LandingPageHome/landing-page-home";
import LandingPageFeatures from "./components/LandingPageComponents/LandingPageFeatures/landing-page-features";
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
import CodePage from "./components/Codes/CodePage/code-page";
import LighthousesPage from "./components/LighthousesPage/lighthouses-page";
import LighthousePage from "./components/Lighthouse/LighthousePage/lighthouse-page";
import LighthouseDetailsPage from "./components/Lighthouse/LighthouseDetailsPage/lighthouse-details-page";
import {setUser} from "./utils/store/user-store/user-store-actions";
import useFetchHook from "./utils/hooks/fetchHook";
import LighthouseAssignmentsPage from "./components/Lighthouse/LighthouseAssignmentsPage/lighthouse-assignments-page";
import SidePanel from "./components/Modals/SidePanel/side-panel";
import ChallengesNav from "./components/ChallengesNav/challenges-nav";
import CommentsPage from "./components/CommentsPage/comments-page";
import StatsPage from "./components/StatsPage/stats-page";
import SubmissionsPage from "./components/SubmissionsPage/submissions-page";
import NotFoundPage from "./components/NotFoundPage/not-found-page";
import LighthouseSubmissionsPage from "./components/Lighthouse/LighthouseSubmissionsPage/lighthouse-submissions-page";
import Transition from "./utils/js/transitions";
import AdminPage from "./components/Admin/AdminPage/admin-page";
import AdminNavigation from "./components/Admin/AdminNavigation/admin-navigation";
import AdminDeniedPage from "./components/Admin/AdminDeniedPage/admin-denied-page";
import AdminReportsPage from "./components/Admin/AdminReportsPage/admin-reports-page";
import LighthouseHomePage from "./components/Lighthouse/LighthouseHomePage/lighthouse-home-page";
import LeaderboardPage from "./components/LeaderboardPage/leaderboard-page";
import ContestsPage from "./components/ContestsPage/contests-page";
import AdminContestsPage from "./components/AdminContestsPage/admin-contests-page";
import ContestPage from "./components/ContestPage/contest-page";
import ContestPeoplePage from "./components/ContestPeoplePage/contest-people-page";
import ContestHomePage from "./components/ContestHomePage/contest-home-page";

function App() {
    const location = useLocation()
    const loading = useSelector(getLoading)

    return (
        <div className="App">

            {loading ? <><Blur type='dark' /><Spinner /></> : null}

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
                        <Route path='contests' element={<ContestsPage />} />
                        <Route path='contests/:id' element={<ContestPage />} >
                            <Route index element={<ContestHomePage />} />
                            <Route path='people' element={<ContestPeoplePage />} />
                        </Route>
                        <Route path='challenges/:slug' element={<ChallengesNav />}>
                            <Route index element={<ChallengePage />} />
                            <Route path='comments' element={<CommentsPage />} />
                            <Route path='stats' element={<StatsPage />} />
                            <Route path='code' element={<CodePage />} />
                            <Route path='submissions' element={<SubmissionsPage />} />
                            <Route path='leaderboard' element={<LeaderboardPage />} />
                        </Route>
                        <Route path='add' element={<AddChallengePage />} />
                        <Route path='users/:id' element={<ProfilePage />} />
                        <Route path='lighthouses/:id' element={<LighthousePage />} >
                            <Route index element={<LighthouseHomePage />} />
                            <Route path='people' element={<LighthouseDetailsPage />} />
                            <Route path='assignments' element={<LighthouseAssignmentsPage />} />
                            <Route path='submissions/:assignmentId' element={<LighthouseSubmissionsPage />} />
                        </Route>
                        <Route path='admin' element={<AdminNavigation />}>
                            {/*<Route index element={<AdminPage />} />*/}
                            <Route path='pending' element={<AdminPage />} />
                            <Route path='denied' element={<AdminDeniedPage />} />
                            <Route path='reports' element={<AdminReportsPage />} />
                            <Route path='contests' element={<AdminContestsPage />} />
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
