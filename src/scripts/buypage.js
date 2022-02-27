import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";
import { getFirestore, doc, setDoc, collection, query, where, getDocs } from 'https://www.gstatic.com/firebasejs/9.6.7/firebase-firestore.js';
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-storage.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAT3OTmeuHnwXf7-I-PJ44RWuvYgi3WMlk",
    authDomain: "charitee-e8cba.firebaseapp.com",
    projectId: "charitee-e8cba",
    storageBucket: "gs://charitee-e8cba.appspot.com",
    messagingSenderId: "969486062473",
    appId: "1:969486062473:web:7c1fc88e5ca2c58d6b8758"
};

// Initialize Firebase
console.dir(window)
console.log(window.location.href)
const app = initializeApp(firebaseConfig);
const db = getFirestore();

const imageStore = getStorage()
const data = collection(db, "donations")
const q = query(data)
const querySnapshot = await getDocs(q);

const postContainer = document.getElementById("items-container")
let subURL = window.location.href
for (let i = 0; i < subURL.length; i++) {
    if (subURL[i] === "h") {
        if (subURL.substring(i, i + 5) === "html/") {
            subURL = subURL.substring(0, i + 5)
            break;
        }
    }
}
console.log(subURL)
const imgURLS = []
querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    const docData = doc.data()
    const pathRef = ref(imageStore, `gs://charitee-e8cba.appspot.com/images/${docData.images[0]}`)
    getDownloadURL(pathRef).then((url) => {
        const newPost = document.createElement('img')
        newPost.addEventListener("click", (event) => {
            window.location.href = `${subURL}item.html?id=${docData.id}`
        })
        newPost.setAttribute('src', url)
        newPost.setAttribute('class', 'item')
        postContainer.appendChild(newPost)
    })
    console.log(doc.id, " => ", doc.data());
});

