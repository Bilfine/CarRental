
const inputs = document.querySelectorAll("input");

inputs.forEach(input => {

    if (input.type === "password") {
        return;
    }

    const savedValue = localStorage.getItem(input.id);

    if (savedValue !== null) {
        input.value = savedValue;
    }

    input.addEventListener("input", () => {
        localStorage.setItem(input.id, input.value);
    });

});
// ---------------------------------------------------------------------------
let signupForm=document.getElementById("signupForm")
signupForm.addEventListener("submit", function(e) {
    e.preventDefault();
    let name=document.getElementById("full name").value.trim()
    let email=document.getElementById("email").value.trim()
    let password=document.getElementById("pass").value.trim()
    let phoneNumber=document.getElementById("phone number").value.trim()
    if (name==="" || email==="" || password==="" || phoneNumber==="") {
        alert("Please fill in all fields");
        return;
    }
    let account=JSON.parse(localStorage.getItem("account")) || [];
    const existAccount=account.find(accountt => accountt.email === email);
    if (existAccount) {
        alert("This email already has an account!");
        return;
    }
     let newAccount={
        name: name,
        email: email,
        password: password,
        phoneNumber: phoneNumber
    }
    account.push(newAccount);
    localStorage.setItem("account", JSON.stringify(account));
    localStorage.setItem(
    "currentUser",
    JSON.stringify(newAccount)
);
    alert("Account created successfully!");
    localStorage.setItem("haveAcount","true")
    window.location.href = "../htmlFiles/home.html";
});
// ----------------------------------------------
let googleBtn=document.getElementById("googleBtn")
googleBtn.addEventListener("click", function () {
    let name=prompt("Enter your name:")
    if (!name || name.trim()==="") {
        alert("Please enter your name")
        return
    }
    let email = prompt("Enter your Gmail:")
    if (!email || email.trim()==="") {
        alert("Please enter your email")
        return
    }
    if (!email.endsWith("@gmail.com")) {
        alert("Please enter a valid Gmail address")
        return
    }
    name = name.trim()
    email = email.trim()
    let account=JSON.parse(localStorage.getItem("account")) || [];
    let existgAccount=account.find(function(accountt){
        return accountt.email===email
    });

    if (existgAccount) {
        alert("This email already has an account!")
        return
    }
    let newAccount={
        name: name,
        email: email
    }
    account.push(newAccount)
    
    localStorage.setItem("account", JSON.stringify(account))

    localStorage.setItem(
    "currentUser",
    JSON.stringify(newAccount)
);


    alert("Account created successfully with Google!")
    localStorage.setItem("haveAcount","true")
    window.location.href = "../htmlFiles/home.html";
});
// localStorage.clear()
