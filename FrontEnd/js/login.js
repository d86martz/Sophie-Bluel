const apiUrl = "http://localhost:5678/api/"

const login = () => {
    loginBox = document.getElementById("login")
    loginBox.addEventListener("submit", (event) => {
        event.preventDefault()
        authentification()
    })      
}
login()

const authentification = async () => {
    const email = document.getElementById("mail").value;
    const password = document.getElementById("pass").value;
    console.log(email);
    console.log(password);
    return await fetch (`${apiUrl}users/login`, {
        method: 'POST',
        body: JSON.stringify ({        
            "email": email,
            "password": password    
        }),
        headers: {
        "Content-Type": "application/json"
        }
    })
    .then(res => res.json())
    .then((data) => {
        if (data.error) {
            alert("Error Password or E-mail");
        } else {
            sessionStorage.setItem("token", (data.token.JSON));
            window.location.assign("./index.html");
        }
      })
}