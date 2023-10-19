import {motion} from "framer-motion"

const FadeIn = ({children}) => {
    return (
        <motion.div transition={{delay: .5}} initial={{opacity: 0}} animate={{opacity: 1}}>
            {children}
        </motion.div>
    )
}
export default FadeIn