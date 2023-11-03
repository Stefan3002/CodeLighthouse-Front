import './modal.css'
import CreateChallengeModal from "../Modals/CreateChallengeModal/create-challenge-modal";
import AssignChallengeModal from "../Modals/AssignChallengeModal/assign-challenge-modal";
import CreateCommentModal from "../Modals/CreateCommentModal/create-comment-modal";
import ModifyChallengeModal from "../Modals/ModifyChallengeModal/modify-challenge-modal";
import JoinLighthouseModal from "../Modals/JoinLighthouseModal/join-lighthouse-modal";
import SuccessModal from "../Modals/SuccessModal/success-modal";
import CreateLighthouseModal from "../Modals/CreateLighthouseModal/create-lighthouse-modal";
import LighthouseMenuModal from "../Modals/LighthouseMenuModal/lighthouse-menu-modal";
import ErrorModal from "../Modals/ErrorModal/error-modal";
import ExpandedCodeModal from "../Modals/ExpandedCodeModal/expanded-code-modal";
const Modal = ({error, type='error'}) => {

    switch (type) {
        case 'error':
            return <ErrorModal error={error}/>
        case 'joinLighthouse':
            return <JoinLighthouseModal/>
        case 'menuLighthouse':
            return <LighthouseMenuModal/>
        case 'createLighthouse':
            return <CreateLighthouseModal/>
        case 'success':
            return <SuccessModal/>
        case 'assignChallenge':
            return <AssignChallengeModal/>
        case 'code':
            return <ExpandedCodeModal/>
        case 'createChallenge':
            return <CreateChallengeModal/>
        case 'newComment':
            return <CreateCommentModal/>
        case 'modifyChallenge':
            return <ModifyChallengeModal/>
        default:
            return <></>
    }

}
export default Modal