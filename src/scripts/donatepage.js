// get files
// save files
// Get parent dropdown menu (select)
// Dynamically fill from file
// Get form 
// get button
// create on submit
// cancel default action
// create json object with desc, tags array, array of image urls

const submitForm = document.getElementById("signup-form")
const handleSubmit = (event => {
    event.preventDefault()
    // create variables for all form values
    const charity = document.getElementById("charity")
    const images = document.getElementById("images")
    // verify image extensions
    for (file of images.files){
        const fileName = file.name
        let lastDot = -1;
        for (let i = 0; i < fileName.length; i++){
            if (fileName[i] === "."){
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
    const tagArr = []
    // Check value has at least one letter
    const letterCheck = /^[a-zA-Z]+$/g;
    const tagVal = tags.value
    let lastWordIndex = 0
    for (let i = 0; i < tagVal.length; i++) {
        if (tagVal[i] === " ") {
            const add = tagVal.substring(lastWordIndex, i)
            if (letterCheck.test(add)) {
                tagArr[tagArr.length] = add
            }
            lastWordIndex = i + 1
        }
    }
    const add = tagVal.substring(lastWordIndex)
    if (letterCheck.test(add)) {
        tagArr[tagArr.length] = add
    }
    if (tagArr.length < 3) {
        alert("Must include at least 3 tags")
        return
    }
    console.log(tagArr)
    // create json object to send to firebase
    const json = {}
    json.desc = desc.value
    json.tags = tagArr
    json.images = null // todo
    json.account = null //todo
    json.charity = charity.value
})
submitForm.addEventListener("submit", handleSubmit)