import './modal.css'
import CreateChallengeModal from "../Modals/CreateChallengeModal/create-challenge-modal";
import AssignChallengeModal from "../Modals/AssignChallengeModal/assign-challenge-modal";
import CreateCommentModal from "../Modals/CreateCommentModal/create-comment-modal";
import ModifyChallengeModal from "../Modals/ModifyChallengeModal/modify-challenge-modal";
import JoinLighthouseModal from "../Modals/JoinLighthouseModal/join-lighthouse-modal";
import SuccessModal from "../Modals/SuccessModal/success-modal";
import CreateLighthouseModal from "../Modals/CreateLighthouseModal/create-lighthouse-modal";
import MenuModal from "../Modals/MenuModal/menu-modal";
import ErrorModal from "../Modals/ErrorModal/error-modal";
import ExpandedCodeModal from "../Modals/ExpandedCodeModal/expanded-code-modal";
import SubmissionsModal from "../Modals/SubmissionsModal/submissions-modal";
import PopUpModal from "../Modals/PopUpModal/pop-up-modal";
import Transition from "../../utils/js/transitions";
import {AnimatePresence} from "framer-motion";
import AdminModal from "../Modals/AdminModal/admin-modal";
import ReportModal from "../Modals/ReportModal/report-modal";
import ReportDescriptionModal from "../Modals/ReportDescriptionModal/report-description-modal";
import AnnouncementModal from "../Modals/AnnouncementModal/announcement-modal";
import ConfirmModal from "../Modals/ConfirmModal/confirm-modal";
import InfoModal from "../Modals/InfoModal/info-modal";
import PreviewModal from "../Modals/PreviewModal/preview-modal";
import AdminConfirmModal from "../Modals/AdminConfirmModal/admin-confirm-modal";
import DifficultyAdminModal from "../Modals/DifficultyAdminModal/difficulty-admin-modal";
import ExpandedNotificationsModal from "../Modals/ExpandedNotificationsModal/expanded-notifications-modal";
import ChatBotModal from "../Modals/ChatBotModal/chat-bot-modal";
import CreateContestModal from "../Modals/CreateContestModal/create-contest-modal";
import ContestChallengeModal from "../Modals/ContestChallengeModal/contest-challenge-modal";
import ChangeEmailModal from "../Modals/ChangeEmailModal/change-email-modal";
import SummaryModal from "../Modals/SummaryModal/summary-modal";
import AccountSettingsModal from "../Modals/AccountSettingsModal/account-settings-modal";
import JoinContestModal from "../Modals/JoinContestModal/join-contest-modal";
import ReportBrokenModal from "../Modals/ReportBrokenModal/report-broken-modal";
import ModifyCommentModal from "../Modals/ModifyComment/modify-comment-modal";
import ContestSubmissionsModal from "../Modals/ContestSubmissionsModal/contest-submissions-modal";
const Modal = ({error, type='error'}) => {

    switch (type) {
        case 'error':
            return <ErrorModal error={error}/>
        case 'joinLighthouse':
            return <JoinLighthouseModal/>
        case 'menuLighthouse':
            return <MenuModal/>
        case 'createLighthouse':
            return <CreateLighthouseModal/>
        case 'lighthousePreview':
            return <PreviewModal/>
        case 'success':
            return <SuccessModal/>
        case 'summary':
            return <SummaryModal/>
        case 'createContest':
            return <CreateContestModal/>
        case 'joinContest':
            return <JoinContestModal/>
        case 'contest-challenge':
            return <ContestChallengeModal/>
        case 'assignChallenge':
            return <AssignChallengeModal/>
        case 'change-email':
            return <ChangeEmailModal/>
        case 'modifyComment':
            return <ModifyCommentModal/>
        case 'code':
            return <ExpandedCodeModal/>
        case 'bot':
            return <ChatBotModal/>
        case 'account-settings':
            return <AccountSettingsModal/>
        case 'notifications':
            return <ExpandedNotificationsModal/>
        case 'createChallenge':
            return <CreateChallengeModal/>
        case 'newComment':
            return <CreateCommentModal/>
        case 'modifyChallenge':
            return <ModifyChallengeModal/>
        case 'submissions':
            return <SubmissionsModal/>
        case 'contest-submissions':
            return <ContestSubmissionsModal/>
        case 'pop-up':
            return <PopUpModal/>
        case 'admin':
            return <AdminModal/>
        case 'admin-confirm':
            return <AdminConfirmModal/>
        case 'difficulty-admin':
            return <DifficultyAdminModal/>
        case 'report':
            return <ReportModal/>
        case 'report-description':
            return <ReportDescriptionModal />
        case 'reportBroken':
            return <ReportBrokenModal />
        case 'announcement':
            return <AnnouncementModal />
        case 'confirm':
            return <ConfirmModal />
        case 'info':
            return <InfoModal />
        default:
            return <></>
    }

}
export default Modal