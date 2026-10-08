const form=document.querySelector("#loginForm")
const email=document.querySelector("#email")
const password=document.querySelector("#pass")
form.addEventListener("submit", function (event) {
    event.preventDefault()
    if (email.value.trim()==="") {
        alert("Please enter your email")
        email.focus()
        return
    }
    if (password.value==="") {
        alert("Please enter your password")
        password.focus()
        return
    }
    if (password.value.length<6 || password.value.length>25) {
        alert("Password must be between 6 and 25 characters")
        return
    }
    let users=JSON.parse(localStorage.getItem("account")) || []
    let user=users.find(
        u => u.email.toLowerCase() === email.value.trim().toLowerCase()
    )
    if (!user) {
        alert("Account not found. Please sign up first.")
        return
    }
    if (user.password !== password.value) {
        alert("Incorrect password.")
        return
    }
    localStorage.setItem(
        "currentUser",
        JSON.stringify(user)
    )
    localStorage.setItem("haveAcount","true")
    window.location.href = "../htmlFiles/home.html"
})
//------------------------------------------------------
let googleBtn = document.getElementById("googleBtn")
googleBtn.addEventListener("click", function(){
    let email=prompt("Enter your Gmail:")
    if (!email || email.trim()==="") {
        alert("Please enter your email")
        return
    }
    email = email.trim().toLowerCase()
    if (!email.endsWith("@gmail.com")) {
        alert("Please enter a valid Gmail address")
        return
    }
    let account = JSON.parse(localStorage.getItem("account")) || []
    let user = account.find(function (accountt) {
        return accountt.email.toLowerCase() === email
    })
    if (!user) {
        alert("Account not found. Please sign up first.")
        return
    }
    localStorage.setItem(
        "currentUser",
        JSON.stringify(user)
    );
    alert("Login successful with Google!")
    localStorage.setItem("haveAcount","true")
    window.location.href = "../htmlFiles/home.html"
})
