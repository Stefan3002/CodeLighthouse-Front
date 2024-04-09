// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signInWithRedirect} from "firebase/auth";
import {setError} from "../store/utils-store/utils-store-actions";

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
export const auth = getAuth()
const googleProvider = new GoogleAuthProvider()
const githubProvider = new GithubAuthProvider()
export const logInGoogleProviderFirebase = async (setErrorCallback) => {
    try{
        return await signInWithPopup(auth, googleProvider)
    }

    catch (e) {
        throw e
    }
}

export const logInGithubProviderFirebase = async () => {
    try {
        return await signInWithPopup(auth, githubProvider)
    }
    catch (e) {
        throw e
    }

}

export const getTokenFirebase = async () => {
    try{
        return await auth.currentUser.getIdToken(true)
    }catch (e){
        throw e
    }
}