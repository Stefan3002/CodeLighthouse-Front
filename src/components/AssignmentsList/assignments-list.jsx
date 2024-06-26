import './assignments-list.css'
import ChallengeCard from "../ChallengeCard/challenge-card";
import {AnimatePresence} from "framer-motion";
import Assignment from "../Assignment/assignment";
import assignment from "../Assignment/assignment";
import {objectIn} from "../../utils/js/functions";
const AssignmentsList = ({limit = 10, filters = true, data, filter, user}) => {

    return (
        <>
            {data.enrolled_lighthouses.map(lighthouse => {
                return lighthouse.assignments.map(assignment => {
                    const completed = objectIn(user.solved_challenges, assignment.challenge)
                    return assignment.users.map((assignedUser, idx) => {
                        if (idx < limit && assignedUser.user_id === user.user_id)
                            if(filter === 'Unfinished' && completed === false)
                                return <Assignment lighthouse={assignment.lighthouse} assignment={assignment} />
                            else
                            if(filter === 'Finished' && completed === true)
                                return <Assignment lighthouse={assignment.lighthouse} assignment={assignment} />
                            else
                            if(filter === 'All')
                                return <Assignment lighthouse={assignment.lighthouse} assignment={assignment} />
                    })
                })
            })}
       </>
    )
}
export default AssignmentsList