import './uploaded-file.css'
import {useEffect, useState} from "react";
import PdfSVG from '../../utils/imgs/SVGs/PdfSVG.svg'
import DefaultFileSVG from '../../utils/imgs/SVGs/FileSVG.svg'
import ImgSVG from '../../utils/imgs/SVGs/ImgFile.svg'
import {Link, useNavigate} from "react-router-dom";
import useFetchHook from "../../utils/hooks/fetchHook";
const UploadedFile = ({file}) => {

    const [extensionImg, setExtensionImg] = useState(DefaultFileSVG)
    const sendRequest = useFetchHook()
    const navigate = useNavigate()


    useEffect(() => {

        const extension = file.name.slice(file.name.indexOf('.'))
        const fileName = file.name.slice(file.name.lastIndexOf('\\'))
        switch (extension){
            case '.pdf':
                setExtensionImg(PdfSVG)
                break
            case '.jpg':
            case '.jpeg':
            case '.png':
                setExtensionImg(ImgSVG)
                break
            default:
                setExtensionImg(DefaultFileSVG)
        }

    }, []);

    const getFile = async () => {
        const fileName = `${process.env.REACT_APP_SERVER_URL}/file/${file.name.slice(file.name.lastIndexOf('/') + 1)}`
        const res = await sendRequest(fileName,undefined , 'GET', false, undefined, ['Where is the file?', 'Oh, no...', 'We got it!!'], true)
        window.location.href = res
    }

    return (
        <div onClick={getFile} className='uploaded-file'>
            <img src={extensionImg} className='icon-file' alt=""/>
            {file.name.slice(file.name.lastIndexOf('/') + 1, file.name.lastIndexOf('.'))}
        </div>
    )
}
export default UploadedFile