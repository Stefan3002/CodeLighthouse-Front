import './enrolled-lighthouses.css'
import LighthouseCard from "../Lighthouse/LighthouseCard/lighthouse-card";
import Missing from "../Missing/missing";
const EnrolledLighthouses = ({data}) => {
    return (
        <div>
            {data.enrolled_lighthouses.length ? data.enrolled_lighthouses.map((lighthouse, idx) => {
                return <LighthouseCard animationDelay={idx} data={lighthouse} />
            }) : <Missing text='You did not join any lighthouse yet!' />}
        </div>
    )
}
export default EnrolledLighthouses