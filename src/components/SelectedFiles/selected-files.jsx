import './selected-files.css'

import UploadedFile from "../UploadedFile/uploaded-file";
const SelectedFiles = ({data}) => {

    return (
        <div className='selected-files'>
            {Array.from(data).map(file => {
                return <UploadedFile file={file} />
            })}
        </div>
    )
}
export default SelectedFiles