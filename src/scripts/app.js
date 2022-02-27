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
    const notifButton = document.createElement("button")
    notifButton.setAttribute("id", "notification-button")
    notifButton.addEventListener("click", (event) => {
        console.log(window.location.href)
        const href = window.location.href
        for (let i = 0; i < href.length; i++) {
            if (href.substring(i, i + 5) === "index") {
                window.location.href = href.substring(0, i) + "html/notificationpage.html"
                return
            }
        }
    })
    document.getElementById("account-links").appendChild(notifButton)
}
