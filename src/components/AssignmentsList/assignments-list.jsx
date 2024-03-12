import './assignments-list.css'
import ChallengeCard from "../ChallengeCard/challenge-card";
import {AnimatePresence} from "framer-motion";
import Assignment from "../Assignment/assignment";
const AssignmentsList = ({limit = 10, filters = true, data, filter, user}) => {
    console.log('aaa', data)
    return (
        <>
            {data.enrolled_lighthouses.map(lighthouse => {
                return lighthouse.assignments.map(assignment => {
                    const completed = user.solved_challenges.includes(assignment.challenge.id)
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