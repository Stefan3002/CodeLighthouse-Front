import './assignments-list.css'
import ChallengeCard from "../ChallengeCard/challenge-card";
import {AnimatePresence} from "framer-motion";
const AssignmentsList = ({limit = 10, filters = true, data, filter, user}) => {
    return (
        <>
            {data.enrolled_lighthouses.map(lighthouse => {
                return lighthouse.assignments.map(assignment => {
                    const completed = user.solved_challenges.includes(assignment.challenge.id)
                    return assignment.users.map((assignedUser, idx) => {
                        if (idx < limit && assignedUser.user_id === user.user_id)
                            if(filter === 'Unfinished' && completed === false)
                                return <ChallengeCard completed={completed} type='assignment' detailedAssignment={true}
                                                      challenge={assignment}/>
                            else
                            if(filter === 'Finished' && completed === true)
                                return <ChallengeCard completed={completed} type='assignment' detailedAssignment={true}
                                                                       challenge={assignment}/>
                            else
                            if(filter === 'All')
                                return <ChallengeCard completed={completed} type='assignment' detailedAssignment={true}
                                                      challenge={assignment}/>
                    })
                })
            })}
       </>
    )
}
export default AssignmentsList