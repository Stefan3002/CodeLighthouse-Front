import './app-home.css'
const AppHome = () => {

    const runUserCode = (form) => {
        form.preventDefault()
        fetch(`${process.env.REACT_APP_SERVER_URL}/run`, {
            method: 'GET',
            credentials: 'include'
        })
            .then((data) => {
                data.json().then((dataJson) => {
                    console.log(dataJson)
                })
            })


        fetch(`${process.env.REACT_APP_SERVER_URL}/run`, {
            method: 'POST',
            credentials: 'include'
        })
            .then((data) => {
                data.json().then((dataJson) => {
                    console.log(dataJson)
                })
            })
    }

    return (
        <div>
            <form onSubmit={runUserCode} >
                <input type="textarea"/>
                <button type='submit'>Send</button>
            </form>

        </div>
    )
}
export default AppHome