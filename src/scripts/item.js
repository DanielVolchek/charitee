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


let imgURLS = []
let imgIterator = 0
let displayImg = null
querySnapshot.forEach(data => {
    const docData = data.data()
    console.log(docData)
    let first = true
    document.getElementById("title").innerText = docData.title
    for (const img of docData.images) {
        console.log(img)
        const pathRef = ref(imageStore, `gs://charitee-e8cba.appspot.com/images/${img}`)
        getDownloadURL(pathRef).then(url => {
            if (first) {
                displayImg = document.createElement("img")
                displayImg.setAttribute('src', url)
                displayImg.setAttribute('class', "images")
                backButton.parentNode.insertBefore(displayImg, backButton.nextSibling)
                first = false
            }
            console.log("img url ", url)
            imgURLS.push(url)
            console.log(imgURLS)
        })
    }
    const content = document.getElementById("content")
    const desc = document.createElement("p")
    desc.setAttribute("class", 'desc')
    desc.innerText = docData.desc
    content.appendChild(desc)
    const price = document.createElement("p")
    price.innerText = `Price: ${docData.price}$`
    content.appendChild(price)
    const charity = document.createElement("p")
    charity.innerText = `Supported Charity: ${docData.charity}`
    content.appendChild(charity)
})
const backButton = document.getElementById("backButton")
const frontButton = document.getElementById("frontButton")
const buyButton = document.getElementById("items-container")
const moveBackIMG = () => {
    if (!displayImg || imgIterator === 0 || !imgURLS[imgIterator - 1]) {
        return
    }
    displayImg.setAttribute('src', imgURLS[imgIterator--])
}
const moveForwardIMG = () => {
    if (!displayImg || imgIterator === imgURLS.length || !imgURLS[imgIterator + 1]) {
        return
    }
    displayImg.setAttribute('src', imgURLS[imgIterator++])
}

const checkSignedIn = () => {
    if (document.cookie.split(';').some((item) => item.includes('session='))) {
        return true
    }
    return false
}
const notifyBuyer = () => {
    if (checkSignedIn())
    const docRef = await addDoc(collection(db, 'users/' + + "/userData"), userData);
}
backButton.addEventListener("click", moveBackIMG)
frontButton.addEventListener("click", moveForwardIMG)
buyButton.addEventListener("click",)