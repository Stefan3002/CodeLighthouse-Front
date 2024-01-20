import './expanded-notifications-modal.css'
import LighthouseSVG from "../../../utils/imgs/SVGs/LighthouseSVG.svg";
import {useSelector} from "react-redux";
import {getModalContent} from "../../../utils/store/utils-store/utils-store-selectors";
const ExpandedNotificationsModal = () => {
    const data = useSelector(getModalContent).content

    return (
        <div className='error-wrapper expanded-notifications'>
            <div className="error-header">
                <img src={LighthouseSVG} alt=""/>
                <h2>Updates</h2>
            </div>
            <div className="error-content">
                <h3>Here are your <strong>updates</strong></h3>
                {data.map(notification => {
                    return <p>{notification}</p>
                })}
            </div>
        </div>
    )
}
export default ExpandedNotificationsModal