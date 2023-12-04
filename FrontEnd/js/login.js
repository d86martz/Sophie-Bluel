const apiUrl = "http://localhost:5678/api/"

const email = document.getElementById("email");
const userMail = email.addEventListener("input", (event) => {
    event.target.value
 })
const password = document.getElementById("password");
const userPass = password.addEventListener("input", (event) => {
    event.target.value
})

const login = async () => {
    return await fetch (`${apiUrl}users/login`), {
        method: 'POST',
        body: JSON.stringify ({        
            "email": userMail,
            "password": userPass    
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
        }
    }) 
}
login()

