import {useDispatch} from "react-redux";
import {setError, setModal} from "../store/utils-store/utils-store-actions";

const useValidate = () => {
    const dispatch = useDispatch()

    return (fieldName, input, options) => {
        const validationOptions = Object.entries(options)
        for(const option of validationOptions){
            let exitCode = true
            const optionName = option[0]
            const optionValue = option[1]
            switch (optionName){
                case 'inputNull':
                    if(optionValue === false)
                        exitCode = validateNull(input)
                    if(!exitCode){
                        dispatch(setError(`An input is null: ${fieldName}`))
                        dispatch(setModal(false))
                        return false
                    }
                case 'inputMin':
                    exitCode = validateMin(input, optionValue)
                    if(!exitCode){
                        dispatch(setError(`An input is too short: ${fieldName}`))
                        dispatch(setModal(false))
                        return false
                    }
            }

        }
        return true
    }


}
const validateNull = (input) => {
    return input.trim().length && input !== undefined && input !== null
}

const validateMin = (input, minLength) => {
    return input.trim().length >= minLength
}
export default useValidate
