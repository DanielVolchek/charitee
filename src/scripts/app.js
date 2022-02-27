const checkSignedIn = () => {
    if (document.cookie.split(';').some((item) => item.includes('session='))) {
        return true
    }
    return false
}

if (checkSignedIn()) {
    console.log("signed in")
    document.getElementById("signin").setAttribute("class", "hide")
    document.getElementById("signup").setAttribute("class", "hide")
}