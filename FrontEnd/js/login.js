const username = document.getElementById(username).value;
const password = document.getElementById(password).value;

const login = async () => {
    return await fetch (`${apiUrl}users`), {
        method: 'POST',
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON
        } 
        .then(send(JSON.stringify({
            "email": username,
            "password": password    
        })))
        .then((res) => res.json())
        .then(data => {
            if (data.error) {
                alert("Error Password or E-mail");
            } else {
                window.location.href = './index.html';
            }
        })
        .catch((err) => {
            console.log(err);
        }); 
}



    
