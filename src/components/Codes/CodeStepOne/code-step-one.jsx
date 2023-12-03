import './code-step-one.css'
import EditorCard from "../../EditorCard/editor-card";
import Button from "../../Button/button";
import {useSelector} from "react-redux";
import {getCode} from "../../../utils/store/utils-store/utils-store-selectors";
const CodeStepOne = ({data, setCodeStep}) => {
    const code = useSelector(getCode)

    if(data)
    return (
        <div key='code-step-one' className='wrapper code-page-wrapper code-page code-step code-step-one'>
            <div className="code-page-text">
                <p dangerouslySetInnerHTML={{__html: data.description}}></p>
            </div>
            {/*<div className="code-page-editor">*/}
            <EditorCard  info='Write your solution to the challenge here.' value={code} height='300px' type='code' headerText='Your solution' />
            <Button callback={() => setCodeStep(2)} text='Next' />
            {/*</div>*/}
        </div>
    )
}
export default CodeStepOne