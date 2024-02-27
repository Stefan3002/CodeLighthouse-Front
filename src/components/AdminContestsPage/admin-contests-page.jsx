import './admin-contests-page.css'
import Heading from "../Heading/heading";
import ChallengeCard from "../ChallengeCard/challenge-card";
const AdminContestsPage = () => {
    return (
        <div className='wrapper admin-denied-page'>
            <Heading text='Contests, admin.'/>
            <div className="pending-challenges">
                {/*{data.map(challenge => {*/}
                {/*    return <ChallengeCard challenge={challenge} type='small-card' />*/}
                {/*})}*/}
            </div>
        </div>
    )
}
export default AdminContestsPage