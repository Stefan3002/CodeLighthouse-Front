import './search.css'
import Input from "../Input/input";
import {useState} from "react";
const Search = ({text, marginated = false, setEntity, filterFunction}) => {

    const searchEntity = (event) => {
        const target = event.target.value
        setEntity((oldPeople) => {
            return filterFunction(target)
        })
    }

    return (
        <Input marginated={marginated} type='search' placeholder={text} onChangeCallback={searchEntity} />
    )
}
export default Search