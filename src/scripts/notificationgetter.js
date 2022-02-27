import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";
import { getFirestore, doc, setDoc, collection, query, where, getDocs, getDoc } from 'https://www.gstatic.com/firebasejs/9.6.7/firebase-firestore.js';
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-storage.js";
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
const db = getFirestore();

const checkSignedIn = () => {
    let lastItem = null
    if (document.cookie.split(';').some((item) => {
        lastItem = item
        return item.includes('session=')
    })) {
        let userID = lastItem.substring(8)
        return userID
    }
    return false
}
const userID = checkSignedIn()
const notifDB = collection(db, "users", userID, "notifications")

const querySnap = await getDocs(notifDB)

querySnap.forEach((doc) => {
    const docData = doc.data()
    const div = document.getElementById("notifications")
    console.log(docData)
    let newNotif = document.createElement("p")
    newNotif.innerText = `Email: ${docData.userEmail}    `
    let title = document.createElement("p")
    title.innerText = `${docData.title}`
    div.appendChild(title)
    div.appendChild(newNotif)

})