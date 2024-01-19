import {useDispatch} from "react-redux";
import {setError, setModal} from "../store/utils-store/utils-store-actions";
import {type} from "@testing-library/user-event/dist/type";

const useValidate = () => {
    const dispatch = useDispatch()

    return (fieldName, input, options) => {
        const validationOptions = Object.entries(options)
        console.log('ttttt', validationOptions)
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
                    break
                case 'inputMin':
                    exitCode = validateMin(input, optionValue)
                    if(!exitCode){
                        dispatch(setError(`An input is too short: ${fieldName}`))
                        dispatch(setModal(false))
                        return false
                    }
                    break
                case 'inputMax':
                    exitCode = validateMax(input, optionValue)
                    if(!exitCode){
                        dispatch(setError(`An input is too large: ${fieldName}`))
                        dispatch(setModal(false))
                        return false
                    }
                    break
                case 'checked':
                    exitCode = validateChecked(input, optionValue)
                    if(!exitCode){
                        dispatch(setError(`An input is not checked: ${fieldName}`))
                        dispatch(setModal(false))
                        return false
                    }
                    break
            }

        }
        return true
    }


}
const validateNull = (input) => {
    if(typeof input === 'string')
        return input !== undefined && input.trim().length && input.length !== 0 && input !== null
    else
        return input !== undefined && input.length !== 0 && input !== null

}

const validateMin = (input, minLength) => {
    return input.trim().length >= minLength
}
const validateChecked = (input, checked) => {
    return input === checked
}
const validateMax = (input, maxLength) => {
    if(typeof input === 'string')
        return input.trim().length <= maxLength
    else
        if(typeof input === 'number')
            return input <= maxLength
}
export default useValidate
