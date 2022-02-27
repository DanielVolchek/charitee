// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.6.7/firebase-auth.js';
import { getFirestore, updateDoc, doc, getDoc } from 'https://www.gstatic.com/firebasejs/9.6.7/firebase-firestore.js';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyAT3OTmeuHnwXf7-I-PJ44RWuvYgi3WMlk",
    authDomain: "charitee-e8cba.firebaseapp.com",
    projectId: "charitee-e8cba",
    storageBucket: "charitee-e8cba.appspot.com",
    messagingSenderId: "969486062473",
    appId: "1:969486062473:web:7c1fc88e5ca2c58d6b8758"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getFirestore();


const handleSignin = () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Checks if any fields are missing values
    if (!validateInputField(email) || !validateInputField(password)) {
        alert('Missing input');
        return;
    }

    // Checks for a valid password/email
    if (!passwordValidation(password) || !emailValidation(email)) {
        alert('Email/Password does not meet requirements');
        return;
    }

    // Submit actions after inputs have been validated
    signInWithEmailAndPassword(auth, email, password)
        .then(async () => {
            // Ref to current user
            let user = auth.currentUser;

            alert('User Logged in!')
        })
        .catch((error) => {
            alert(error.message);
            console.log(error.code);
        })
}

const emailValidation = (email) => {
    const expression = /^[^@]+@\w+(\.\w+)+\w$/; // Regex tests if email input is in proper format
    // Email is bad
    if (expression.test(email) == false) {
        return false;
    }
    // Email is good
    return true;
}

const passwordValidation = (password) => {
    // Firebase requires > 6 chars
    if (password.length < 6) {
        return false;
    }

    // Password is good
    return true;
}

const validateInputField = (field) => {
    // Checks if input field is empty
    if (field.length == null || field.length <= 0) {
        return false;
    }
    // Fields are good
    return true;
}


const button = document.getElementById("submit");
button.addEventListener("click", handleSignin)