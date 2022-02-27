// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";
import { getFirestore, doc, setDoc } from 'https://www.gstatic.com/firebasejs/9.6.7/firebase-firestore.js';
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
const database = getFirestore();

// get files
// save files
// Get parent dropdown menu (select)
// Dynamically fill from file
// Get form 
// get button
// create on submit
// cancel default action
// create json object with desc, tags array, array of image urls

// UUID generator
//Source https://bit.ly/2neWfJ2 
const UUID = () =>
    ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
    );

const submitForm = document.getElementById("signup-form")
const handleSubmit = (event => {
    sessionStorage.setItem("test", "Hello")
    event.preventDefault()
    // create variables for all form values
    const images = document.getElementById("images")
    // verify image extensions
    for (let file of images.files) {
        const fileName = file.name
        let lastDot = -1;
        for (let i = 0; i < fileName.length; i++) {
            if (fileName[i] === ".") {
                lastDot = i
            }
        }
        const fileExt = fileName.substring(lastDot, fileName.length)
        if (lastDot === -1 || (fileExt !== ".jpg" && fileExt !== ".png")) {
            alert(`File ${fileName} must be of type JPG or PNG`)
            return
        }
    }
    // check prereq values
    const desc = document.getElementById("desc")
    if (desc.value.length < 15) {
        alert("Description must be at least 15 characters long")
        return
    }
    // Get space seperated tag values
    const tags = document.getElementById("tags")
    const tagArr = ["hello"]
    console.log("tagArr is " + tagArr)
    // Check value has at least one letter
    const letterCheck = /^[a-zA-Z]+$/g;
    const tagVal = tags.value
    let lastWordIndex = 0
    for (let i = 0; i < tagVal.length; i++) {
        if (tagVal[i] === " ") {
            const add = tagVal.substring(lastWordIndex, i)
            console.log(add)
            if (letterCheck.test(add)) {
                // regex bug only works every other check in loop
                letterCheck.test(add)
                console.log("tagArr is" + tagArr)
                tagArr.push(add)
            }
            lastWordIndex = i + 1
        }
    }
    console.log(tagVal.substring(lastWordIndex))
    const add = tagVal.substring(lastWordIndex)
    if (letterCheck.test(add)) {
        tagArr.push(add)
    }
    console.log(tagArr)
    if (tagArr.length < 3) {
        alert("Must include at least 3 tags")
        return
    }
    // check charity value is chosen
    const charity = document.getElementById("charity")
    if (charity.value === "dummy") {
        alert("Please choose a charity from the dropdown menu")
        return
    }
    // create json object to send to firebase
    const json = {}
    json.id = UUID() // todo
    console.log(json.id)
    json.desc = desc.value
    json.tags = tagArr
    json.images = null // todo
    json.account = null // todo
    json.charity = charity.value
    // Starting bid is 5 dollars
    json.bid = 5
    // Starting time is 3 days
    json.secondsRemaining = 259200
    // TODO 
    // Rename image with UUID gen
    // Upload image to firebase
    // Set ID of post to UUID gen
    // Upload json to firebase

    addObjectToDatabase(json);
})


const addObjectToDatabase = async (object) => {
    await setDoc(doc(database, "donations", object.id), object)
        .then(() => {
            alert("Sucessfully Uploaded");
        })
        .catch((error) => {
            alert(error.message);
            return;
        });
}


submitForm.addEventListener("submit", handleSubmit)