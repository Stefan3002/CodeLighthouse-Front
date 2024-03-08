import './form.css'
import Input from "../Input/input";
import Button from "../Button/button";
import {setModal} from "../../utils/store/utils-store/utils-store-actions";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import useFetchHook from "../../utils/hooks/fetchHook";
const Form = ({className, onSubmit, children}) => {
    const dispatch = useDispatch()
    const sendRequest = useFetchHook()
    const ohMyGodHoneyWrapper = (event) => {
        event.preventDefault()

        const formLength = event.target.length
        const honeyPot1 = event.target[formLength - 2]
        const honeyPot2 = event.target[formLength - 1]
        if (honeyPot1.value || honeyPot1.value?.length || honeyPot2.value || honeyPot2.value?.length) {
            dispatch(setModal(false))
            return
        }

        // eslint-disable-next-line no-undef
        grecaptcha.ready(async function () {
            // eslint-disable-next-line no-undef
            grecaptcha.execute(process.env.REACT_APP_CAPTCHA_KEY, {action: 'submit'}).then(async function (token) {
                // Add your logic to submit to your backend server here.
                // Check the captcha first
                const dataFetch = {
                    token,
                }
                const res = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/check-captcha`, JSON.stringify(dataFetch), 'POST', true)
                if(!res.data.success)
                    return
                onSubmit(event)
            });
        });
    }
    // useEffect(() => {
    //     // eslint-disable-next-line no-undef
    //     grecaptcha.render("recaptcha-container", {
    //         "sitekey": process.env.REACT_APP_CAPTCHA_KEY
    //     });
    // }, []);

    return (
        <form className={className} onSubmit={ohMyGodHoneyWrapper}>
            {/*    H O N E Y P O T H E R E T R A P S P A M M E R S  */}
            {children}
            {/*<button className="g-recaptcha"*/}
            {/*        data-sitekey={process.env.REACT_APP_CAPTCHA_KEY}*/}
            {/*        data-callback='onSubmit'*/}
            {/*        data-action='submit'>Submit*/}
            {/*</button>*/}
            <div id="recaptcha-container"></div>
            <label className='ohmygodhoney' htmlFor="name"></label>
            <input className='ohmygodhoney' type="text" name='name' id='name' placeholder='Name' autoComplete='off'/>
            <label className='ohmygodhoney' htmlFor="email"></label>
            <input className='ohmygodhoney' type="text" name='email' id='email' placeholder='E-mail'
                   autoComplete='off'/>
        </form>
    )
}
export default Form