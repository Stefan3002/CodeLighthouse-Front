import './authenticate.css'
import LogIn from "../LandingPageComponents/LogIn/log-in";
import Transition from "../../utils/js/transitions";
const Authenticate = ({mode}) => {
    return (
        <Transition>
        <div>
            {mode == 1 ? <LogIn /> : null}
        </div>
        </Transition>
    )
}
export default Authenticate