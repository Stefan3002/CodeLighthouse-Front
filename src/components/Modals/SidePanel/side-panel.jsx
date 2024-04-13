import './side-panel.css'
import Input from "../../Input/input";
import Button from "../../Button/button";
import CapSVG from '../../../utils/imgs/SVGs/CapSVG.svg'
import {useDispatch, useSelector} from "react-redux";
import {getModalContent, getSidePanel} from "../../../utils/store/utils-store/utils-store-selectors";
import {useState} from "react";
import useFetchHook from "../../../utils/hooks/fetchHook";
import {setModalContent, setSidePanel} from "../../../utils/store/utils-store/utils-store-actions";
import BackSVG from "../../../utils/imgs/SVGs/BackSVG.svg";
const SidePanel = ({type}) => {
    const data = useSelector(getSidePanel)?.data

    const modalData = useSelector(getModalContent)
    const sendRequest = useFetchHook()
    const [selected, setSelected] = useState(data?.map(person => person.user_id))

    const dispatch = useDispatch()
    const selectAllPeople = () => {
        const newSelected = []
        for(let i of data)
            newSelected.push(i.user_id)

        setSelected(newSelected)
        pushSelected(newSelected)
    }
    const addPerson = (person) => {
        let newSelected = [...selected]
        if(!(newSelected.includes(person.user_id))) {
            newSelected.push(person.user_id)

        }
        else
            newSelected = newSelected.filter(selected => selected !== person.user_id)

        setSelected(newSelected)
        pushSelected(newSelected)
    }

    const deselectAllPeople = () => {
        setSelected([])
        pushSelected([])
    }

    const pushSelected = (newSelectedPeople) => {
        const newModalData = {...modalData, selectedPeople: newSelectedPeople}
        dispatch(setModalContent(newModalData))
    }

    const closeSidePanel = () => {
        dispatch(setSidePanel(null))
    }

    if(data && type === 'students')
    return (
        <div className='side-panel'>
            <div className="side-panel-header">
                <img onClick={closeSidePanel} className='icon-svg' src={BackSVG} alt="Back"/>
                <img className='header-icon' src={CapSVG} alt=""/>
                <h2>Select students. ({selected.length})</h2>
            </div>
            <div className="side-panel-content">
                <div className="side-panel-search">
                    <Input placeholder='Search student' />
                    <Button text='Search' />
                </div>
                <div className="side-panel-helpers">
                    <Button callback={selectAllPeople} text='Select all' />
                    <Button callback={deselectAllPeople} text='Deselect all' />
                </div>

                <div className="side-panel-people">
                    {data.map(person => {
                        return <p className={selected.includes(person.user_id) ? 'person person-selected' : 'person'} onClick={() => addPerson(person)}>{person.username}</p>
                    })}
                </div>
                    {/*<Button text='Select students' callback={pushSelected} />*/}
            </div>
        </div>
    )
}
export default SidePanel