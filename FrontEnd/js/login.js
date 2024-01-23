const apiUrl = 'http://localhost:5678/api/' //Stockage de l'adresse de l'API

//Connexion de l'utilisateur
const login = () => {
  loginBox = document.getElementById('login')       //Récupération fu formulaire
  loginBox.addEventListener('submit', (event) => {  //Ecoute du bonton de connexion
    event.preventDefault()                          //Empêche le comportement par défaut
    authentification()                              //Authentification de l'utilisateur
  })
}
login()

//Authentification de l'utilisateur
const authentification = async () => {
  const email = document.getElementById('mail').value     //Récupération du champ E-mail
  const password = document.getElementById('pass').value  //Récupération du champ Mot de passe
  sessionStorage.removeItem('token')                      //Retrait d'un éventuel identifiant présent dans le stockage
  return await fetch(`${apiUrl}users/login`, {            //Chemin de la requête dans l'API     
    method: "POST",                                       //Type de requête
    headers: {                                            //En-tête
      accept: "application/json",                         //Type de réponse
      "Content-Type": "application/json",
    },
    body: JSON.stringify({                                //Conversion des données
      email: email,                                       //Element transmis
      password: password,                                 //Element transmis
    }),
  })
    .then((res) => res.json())                                 //Fonction de rappel pour conversion
    .then((data) => {                                          //Fonction de rappel
      if (data.error) {                                        //Vérification de l'identifiant et du mot de passe
        alert("Erreur dans l’identifiant ou le mot de passe")  //Alerte si erreur
      } else {
        if (data.token) {                                      //Vérification du retour d'un identifiant
        sessionStorage.setItem("token", data.token)            //Stockage de l'identifiant, si present
        window.location.assign("./index.html")                 //Redirection vers la page d'acceuil
        }
      }
    })
    .catch((error) => {                                        //Vérification de la présence d'une erreur
      console.log(error)                                       //Visualisation de l'erreur dans la console
    })
}
