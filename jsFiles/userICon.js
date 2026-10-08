// localStorage.clear()

let SignUp=document.getElementById("SignUp")
let SignIn=document.getElementById("SignIn")
let Icon=document.getElementById("Icon")
let Logout=document.getElementById("Logout")
let haveAcount=localStorage.getItem("haveAcount")
if(haveAcount==='true'){
    SignIn.classList.add("hide")
    SignUp.classList.add("hide")
    Icon.classList.remove("hide")
    Logout.classList.remove("hide")
    Icon.addEventListener("click",function(){
        window.location='../htmlFiles/dashboard.html'
    })
}
Logout.addEventListener("click",function(){
    SignIn.classList.remove("hide")
    SignUp.classList.remove("hide")
    Icon.classList.add("hide")
    Logout.classList.add("hide")
    localStorage.removeItem("haveAcount")
    localStorage.removeItem("account")
    localStorage.removeItem("currentUser")
    window.location='../htmlFiles/home.html'
})


let dashboard=document.getElementById("Dashboard")
let Logout2=document.getElementById("Logout2")
let SignUp2=document.getElementById("SignUp2")
let SignIn2=document.getElementById("SignIn2")

if(haveAcount==='true'){
    SignIn2.classList.add("hide2")
    SignUp2.classList.add("hide2")
    dashboard.classList.remove("hide2")
    Logout2.classList.remove("hide2")
    dashboard.addEventListener("click",function(){
         window.location='../htmlFiles/dashboard.html'
    })
}
Logout2.addEventListener("click",function(){
    SignIn2.classList.remove("hide2")
    SignUp2.classList.remove("hide2")
    dashboard.classList.add("hide2")
    Logout2.classList.add("hide2")
    localStorage.removeItem("account")
    localStorage.removeItem("haveAcount")
    localStorage.removeItem("currentUser")
    window.location='../htmlFiles/home.html'
})

// localStorage.clear()

// ********************************************************
let dash=document.getElementById("dash")
let dash2=document.getElementById("dash2")
dash
.addEventListener("click",function(){
    if(haveAcount!='true'){
        confirm("sign in to see your dashboard")
        dash.href='../htmlFiles/login.html'
    }
})
dash2.addEventListener("click",function(){
    if(haveAcount!='true'){
        confirm("sign in to see your dashboard")
        dash2.href='../htmlFiles/login.html'
    }
})


