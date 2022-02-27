// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";
import { getFirestore, doc, setDoc } from 'https://www.gstatic.com/firebasejs/9.6.7/firebase-firestore.js';
import { getStorage, ref, uploadBytes } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-storage.js";
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

const checkSignedIn = () => {
    if (document.cookie.split(';').some((item) => item.includes('session='))) {
        return true
    }
    return false
}

const setList = () => {
    console.log("setting list")
    const select = document.getElementById("charity")
    console.log(select)
    const data = [
        "NAACP Legal Defense and Educational Fund",
        "Elizabeth Glaser Pediatric AIDS Foundation",
        "American Indian College Fund",
        "Animal Welfare Institute",
        "American Humane",
        "Asia Foundation",
        "Guide Dog Foundation for the Blind",
        "Breast Cancer Research Foundation",
        "National Center for Missing & Exploited Children",
        "American Civil Liberties Union (ACLU)",
        "Food and Water Watch",
        "Partnership to End Addiction",
        "African Wildlife Foundation",
        "Water.org",
        "charity: water",
        "American Foundation for Suicide Prevention",
        "American Bird Conservancy",
        "American Brain Tumor Association     ",
        "American Kidney Fund     ",
        "American Liver Foundation ",
        "American Lung Association",
        "Diabetes Action Research and Education Foundation",
        "Parkinson's Foundation",
        "Hispanic Scholarship Fund",
        "National Alliance to End Homelessness",
        "American Red Cross",
        "Action Against Hunger-USA",
        "The Hunger Project",
        "HIAS",
        "Center for Reproductive Rights",
    ]
    for (let org of data){
        const newOpt = document.createElement("option")
        let newVal = ""
        if (org !== "HIAS"){
            newVal = org.substring(0, org.indexOf(" "))
        }
        else{
            newVal = "HIAS"
        }
        newOpt.setAttribute("value", newVal)
        newOpt.text = org
        select.appendChild(newOpt)
    }
}
setList()
const submitForm = document.getElementById("signup-form")
const handleSubmit = (event => {
    event.preventDefault()

    // First check if user is logged in
    // Set the accountId of the JSON object for submission
    let accountId = null;
    if (checkSignedIn()) {
        accountId = document.cookie.split("=")[1];
        console.log(accountId)
    }
    else {
        alert("User not logged in!")
        return;
    }

    // create variables for all form values
    const images = document.getElementById("images")
    const imageURLs = []
    // verify image extensions
    for (const file of images.files) {
        const fileName = file.name
        let lastDot = -1;
        for (let i = 0; i < fileName.length; i++) {
            if (fileName[i] === ".") {
                lastDot = i
            }
        }
        const fileExt = fileName.substring(lastDot, fileName.length)
        if (lastDot === -1 || (fileExt !== ".jpg" && fileExt !== ".jpeg" && fileExt !== ".png")) {
            alert(`File ${fileName} must be of type JPG or PNG`)
            return
        }
        const newName = UUID() + fileExt
        imageURLs.push(newName)
    }
    // check prereq values
    const desc = document.getElementById("desc")
    if (desc.value.length < 15) {
        alert("Description must be at least 15 characters long")
        return
    }

    // Get title
    const title = document.getElementById("title")
    if (title.value > 15) {
        alert("Title must be under 15 characters long")
        return
    }
    // Get space seperated tag values
    const tags = document.getElementById("tags")
    const tagArr = []
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
    if (tagArr.length == 0) {
        alert("Must include at least 1 tag")
        return
    }
    // Check price greater than 0
    const price = document.getElementById("price")
    if (price.value <= 0) {
        alert("Price must be greater than 0")
        return
    }
    // check charity value is chosen
    const charity = document.getElementById("charity")
    if (charity.value === "dummy") {
        alert("Please choose a charity from the dropdown menu")
        return
    }
    uploadImagesToCloud(images.files, imageURLs)
    // create json object to send to firebase
    const json = {}
    json.id = UUID() // todo
    json.title = title.value
    json.desc = desc.value
    json.tags = tagArr
    json.images = imageURLs // todo
    json.account = accountId // todo
    json.charity = charity.value
    json.price = price.value
    // TODO 
    // Rename image with UUID gen
    // Upload image to firebase
    // Set ID of post to UUID gen
    // Upload json to firebase

    addObjectToDatabase(json);
})

const uploadImagesToCloud = (imgs, names) => {
    const cloud = getStorage()
    console.log(cloud)
    console.log(imgs)
    for (let i = 0; i < imgs.length; i++) {
        const imgRef = ref(cloud, ("images/" + names[i]))
        // const bytes = readIntoByteArray(f)
        uploadBytes(imgRef, imgs[i]).then((snapshot) => {
            console.log("Uploaded file")
        }).catch((error) => {
            alert(error.message)
        })
    }
}

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


// const readIntoByteArray = (file) => {
//     const reader = new FileReader();
//     const fileByteArray = [];
//     reader.readAsArrayBuffer(file)
//     reader.onloadend = () => {
//         if (evt.target.readyState == FileReader.DONE) {
//             const arrayBuffer = evt.target.result,
//                 array = new Uint8Array(arrayBuffer);
//             for (let i = 0; i < array.length; i++) {
//                 fileByteArray.push(array[i]);
//             }
//         }
//     }
//     return fileByteArray
// }

/*
var reader = new FileReader();
var fileByteArray = [];
reader.readAsArrayBuffer(myFile);
reader.onloadend = function (evt) {
    if (evt.target.readyState == FileReader.DONE) {
       var arrayBuffer = evt.target.result,
           array = new Uint8Array(arrayBuffer);
       for (var i = 0; i < array.length; i++) {
           fileByteArray.push(array[i]);
        }
    }
}


*/
submitForm.addEventListener("submit", handleSubmit)




function previewImages(event) {

    let preview = document.getElementById('preview');
    let files = document.getElementById('images').files;

    if (files.length > 0) {
        [].forEach.call(files, readAndPreview);
    }

    function readAndPreview(file) {

        // Make sure `file.name` matches our extensions criteria
        if (!/\.(jpe?g|png|gif)$/i.test(file.name)) {
            return alert(file.name + " is not an image");
        } // else...

        var reader = new FileReader();

        reader.addEventListener("load", function () {
            var image = new Image();
            image.height = 300;
            image.title = file.name;
            image.src = this.result;
            preview.appendChild(image);
        });

        reader.readAsDataURL(file);

    }

}

document.getElementById('images').addEventListener("change", previewImages);