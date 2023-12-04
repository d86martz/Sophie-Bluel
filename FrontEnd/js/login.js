const apiUrl = "http://localhost:5678/api/"

const login = () => {
    loginBox = document.getElementById("login")
    const user = {
        email : document.getElementById("email").value,
        password : document.getElementById("password").value
    }
    loginBox.addEventListener("submit", (event) => {
        authentification(user)
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
        }
    }) 
}


