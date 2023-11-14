// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup, GithubAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCbI1jPJwzrByiNBzHw4agKLARc8FBktOU",
    authDomain: "codelighthouse.firebaseapp.com",
    projectId: "codelighthouse",
    storageBucket: "codelighthouse.appspot.com",
    messagingSenderId: "470810792988",
    appId: "1:470810792988:web:ac5f450d5598ae3d973bd9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth()
const googleProvider = new GoogleAuthProvider()
const githubProvider = new GithubAuthProvider()
export const logInGoogleProviderFirebase = async () => {
    const result = await signInWithPopup(auth, googleProvider)
    return result
}

export const logInGithubProviderFirebase = async () => {
    const result = await signInWithPopup(auth, githubProvider)
    return result
}

export const getTokenFirebase = async () => {
    try{
        const idToken = await auth.currentUser.getIdToken(true)
        return idToken
    }catch (e){
        console.log(e)
    }
}