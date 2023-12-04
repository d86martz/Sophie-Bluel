const apiUrl = "http://localhost:5678/api/"

const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

const login = () => {
    loginBox = document.getElementById("login")
    loginBox.addEventListener("submit", (event) => {
        event.preventDefault()
        authentification()
    })      
}
login()

const authentification = async (user) => {
    return await fetch (`${apiUrl}users/login`), {
        method: 'POST',
        body: JSON.stringify ({        
            "email": email,
            "password": password    
        }),
        headers: {
        "Content-Type": "application/json"
        }
    }
    .then(res => res.json())
    .then(data => {
        console.log(data)
        if (data.error) {
            alert("Error Password or E-mail");
        } else {
            window.location.href = './index.html';
            sessionStorage.setItem("token", (data.token.JSON))
        }
    })   
}


