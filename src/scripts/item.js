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

let ID = window.location.href

for (let i = 0; i < ID.length; i++) {
    if (ID[i] === "?" && ID.substring(i + 1, i + 4) === "id=") {
        ID = ID.substring(i + 4)
    }
}
console.log(ID)
const q = query(data, where("id", "==", ID))
const querySnapshot = await getDocs(q)

const backButton = document.getElementById("backButton")
const frontButton = document.getElementById("frontButton")
const moveBackIMG = () => {
    if (!img || imgIterator === 0) {
        return
    }
    img.setAttribute('src', imgURLS[imgIterator--])
}
const moveForwardIMG = () => {
    if (!img || imgIterator === imgURLS.length) {
        return
    }
    img.setAttribute('src', imgURLS[imgIterator++])
}

backButton.addEventListener("click", moveBackIMG)
frontButton.addEventListener("click", moveForwardIMG)

const imgURLS = []
let imgIterator = 0
let img = null
querySnapshot.forEach(data => {
    const docData = data.data()
    console.log(docData)
    let first = true
    for (const img of docData.images) {
        console.log(img)
        const pathRef = ref(imageStore, `gs://charitee-e8cba.appspot.com/images/${img}`)
        getDownloadURL(pathRef).then(url => {
            if (first) {
                img = document.createElement("img")
                img.setAttribute('src', url)
                img.setAttribute('class', "images")
                backButton.parentNode.insertBefore(img, backButton.nextSibling)
                first = false
            }
            imgURLS.push(url)
        })

    }
})