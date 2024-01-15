const apiUrl = 'http://localhost:5678/api/'   //Stockage de l'adresse de l'API
const token = sessionStorage.getItem('token') //Récupération et stockage de l'identifiant

const show = (data) => {       //
  data.forEach(index => {      //Affichage d'éléments du document
    index.style.display = null //
  })
}

const hide = (data) => {         //
  data.forEach(index => {        //Masquage d'éléments du document
    index.style.display = 'none' //
  })
}

hide(document.querySelectorAll('.mask'))

//Connexion de l'utilisateur
const userConnected = () => {   
  if(sessionStorage.getItem('token') !== null) {                   //Vérification de la présence d'un identifiant           
    show(document.querySelectorAll('.edition'))                    //Affichage du mode édition
    document.getElementById('filters').style.visibility = 'hidden' //Masquage des boutons filtres
  }
}
userConnected()

//Catégories//

//Connexion à l'API
const getApiCategory = async () => {  
  return await fetch (`${apiUrl}categories`) //Chemin de la requête dans l'API                  
    .then(res => res.json())                 //Conversion des données                                   
    .catch (error => {                       //Vérification de la présence d'une erreur
      console.log(error)                     //Visualisation de l'erreur dans la console
    })
}
//Création de la liste des catégories
const setCategory = async () => {
  let setApiCategory = new Set(await getApiCategory())     //Création d'une liste des catégories sans doublons
  const categoryList = Array.from(setApiCategory.values()) //Conversion en tableau
  inputSelect(categoryList)                                //Ajout des options de sélection de catégorie dans la partie ajout de la modale
  categoryList.splice(0,0,{id:0, name:"Tous"})             //Ajout de la catégorie "Tous"
  console.log("Category : ", categoryList)                 //Visualisation de la liste dans la console
  setFilters(categoryList)                                 //Création des filtres
}
setCategory()

//Création des filtres 
const setFilters = (categoryList) => {
  categoryList.forEach(category => {   //Sélection des catégories
    filterButton(category)             //Création du bouton filtre pour chaques catégories
  })
}

//Création du bouton
const filterButton = (category) => {
  button = document.createElement('button')                      
  button.setAttribute('id', category.id)                 //Attribution d'un id identique à celui de la catégorie
  button.setAttribute('class', category.name)            //Attribution d'une classe identique au nom de la catégorie             
  button.textContent = (category.name)                   //Attribution d'un nom identique à celui de la catégorie                                
  document.getElementById('filters').appendChild(button) //Ajout du bouton dans le document 
 }

//Projets//

//Connexion à l'API
const getApiWorks = async () => {
  return await fetch (`${apiUrl}works`) //Chemin de la requête dans l'API                       
    .then((res) => res.json())          //Conversion des données   
    .catch (error => {                  //Vérification de la présence d'une erreur
      console.log(error)                //Visualisation de l'erreur dans la console
    })
}

//Création de la liste des projets
const getWorks = async () => {
  const setWorks = new Set (await getApiWorks()) //Création d'une liste des projets sans doublons
  const works = Array.from(setWorks.values())    //Conversion en tableau
  console.log("Works : ", works)                 //Visualisation de la liste dans la console
  displayGalleries(works)                        //Affichage des galeries
}
getWorks()

//Affichage des galeries
const displayGalleries = (works) => { 
  document.getElementById(0).focus()
  works.forEach(work => {             //Sélection de projets
    galleryFigure(work)               //Affichage de la galerie dans le document
    modalFigure(work)                 //Affichage de la galerie dans la modale
  })
}

//Filtration de la galerie
const filterGallery = () => {
  document.getElementById('filters')        //Sélection de la barre de filtre
    .addEventListener('click', (event) => { //Ecoute de la sélection du bouton
      filter = event.target.id              //Récupération de l'id de catégorie du bouton sélectionné
      setGallery(filter)                    //Edition de la galerie selon le filtre                                
  })                                    
}
filterGallery()

//Edition de la galerie selon le filtre
const setGallery = (filter) => {
  const works = document.querySelectorAll('.galleryFigure')        //Sélection de la galerie
  works.forEach(work => {                                          //Sélection des projets
    if (filter == 0 || filter == work.attributes.category.value) { //Tri selon l'id
      work.style.display = null                                    //Affichage
    } 
    else {
      work.style.display = 'none'                                  //Masquage
    }
  })
}

//Création de la figure du projet
const galleryFigure = (work) => {                    
  image = document.createElement('img')                                //Création d'un élément image                      
  title = document.createElement('p')                                  //Création d'un élément titre                         
  image.src = work.imageUrl                                            //Source de l'image selon le projet
  image.setAttribute('alt', work.title)                                //Attribution d'une description à l'image             
  title.textContent = work.title                                       //Source du titre identique à celui du projet 
  const figure = document.createElement('work')                        //Création d'un élément figure                               
  figure.appendChild(image)                                            //Ajout de l'image à la figure                                   
  figure.appendChild(title)                                            //Ajout du titre à la figure
  figure.setAttribute('id', work.id)                                   //Attribution d'un id identique à celui du projet
  figure.setAttribute('category', work.category.id)                    //Attribution d'un id de catégorie identique à celui du projet
  figure.setAttribute('class', 'bodyElement workFigure galleryFigure') //Attribution d'une classe
  document.getElementById('gallery').appendChild(figure)               //Ajout de la figure dans le document                                                  
}

//Création de la figure du projet
const modalFigure = (work) => {                   
  image = document.createElement('img')                                           //Création d'un élément image                                                         
  image.src = work.imageUrl                                                       //Source de l'image selon le projet
  image.setAttribute('alt', work.title)                                           //Ajout d'une description à l'image
  button = document.createElement('button')                                       //Création d'un élément bouton
  button.innerHTML = ('value',`<i id='${work.id}' class='fas fa-trash-can'></i>`) //Ajout d'un icône au bouton avec un id identique à celui du projet 
  button.setAttribute('class', 'trashButton')                                     //Attribution d'une classe au bouton                                             
  const figure = document.createElement('work')                                   //Création d'un élément figure                            
  figure.appendChild(button)                                                      //Ajout du bouton à l'élément figure
  figure.appendChild(image)                                                       //Ajout de l'image à l'élément figure
  figure.setAttribute('id', work.id)                                              //Attribution d'un id à la figure identique à celui du projet
  figure.setAttribute('class', 'workFigure')                                      //Attribution d'une classe à la figure
  document.getElementById('modalGallery').appendChild(figure)                     //Ajout de la figure dans le document
  button.addEventListener('click', (event) => {                                   //Ecoute du bouton 
    event.preventDefault()                                                        //Empêche le comportement par défaut
    id = event.target.getAttribute('id')                                          //Récupération de l'id du bouton sélectionné
    deleteWork(id)                                                                //Suppression du projet selon l'id
  })                                                                             
}

//modale

document.getElementById('editButton').addEventListener('click', (event) => { //Ecoute du click sur le bouton modifier
  event.preventDefault()                                                     //Empêche le comportement par défaut
  openModal()                                                                //Lancement de l'ouverture de la modale
})

const stopPropagation = (event) => { //Stop la propagation d'un évènement
  event.stopPropagation()
}

//Ouverture de la modale
const openModal = () => {
  show(document.querySelectorAll('.modal'))                       //Affichage de la modale
  show(document.querySelectorAll('.delete'));                     //Affichage des éléments de suppression de projet
  document.querySelector('body').classList.add('bodyOverlay')     //Affichage du voile derrière la modale
  const figures = document.getElementsByClassName('bodyElement')  //
  for (i = 0; i < figures.length; i++) {                          //Affichage du voile sur les éléments du document
    figures.item(i).classList.add('elementOverlay')               //
  }
  document.getElementById('modal').addEventListener('click', closeModal)             //Ecoute du click en dehors pour la fermeture 
  document.querySelector('.modalStop').addEventListener('click', stopPropagation)    //Stop la propagation du click de fermeture à la modale
  document.getElementById('modalAddButton').addEventListener('click', modalAddWork)  //Ecoute de l'entrée de formulaire pour l'aperçu de l'image
  document.getElementById('newWorkImage').addEventListener('change', displayPreview) //Ecoute du champ de formulaire d'ajout d'image du projet          
  document.getElementById('modalCloseButton').addEventListener('click', () => {      //Ecoute du click sur le bouton de fermeture 
    closeModal()                                                                     //Fermeture de la modale
    clearForm()                                                                      //Nettoyage du formulaire
  })           
  document.getElementById('modalReturnButton').addEventListener('click', () => {     //Ecoute du click sur le bouton de retour              
    returnModalGallery()                                                             //Retour à la partie ajout de projet
    clearForm()                                                                      //Nettoyage de la modale
  })  
}

//Partie ajout de projet de la modale 
const modalAddWork = () => {
  document.getElementById('modalReturnButton').style.visibility = 'visible'           //Affichage du bouton de retour 
  hide(document.querySelectorAll('.delete'))                                          //Masquage des éléments de suppression de projet
  show(document.querySelectorAll('.add'))                                             //Affichage des éléments d'ajout de projet
  document.getElementById('modalValidateButton').addEventListener('click', validForm) //Ecoute du bouton de validation du formulaire
  document.querySelectorAll('.formInput').forEach(input => {                          //Ecoute des champs de formulaire
    input.addEventListener('input', validInput)                                       //Validation du champ 
  })                                                                                  
}

//Ajout des options de sélection de catégorie dans la partie ajout de la modale
const inputSelect = (categoryList) => {
  categoryList.forEach(category => {
  const option = new Option(category.name, category.name)
  option.setAttribute('id', category.id)
  document.getElementById('newWorkCategory').appendChild(option)
  })
}

//Retour dans la modale
const returnModalGallery = () => {
  document.getElementById('modalReturnButton').style.visibility = 'hidden' //Masquage du bouton retour
  hide(document.querySelectorAll('.add'))                                  //Masquage de la partie ajout de projet de la modale
  show(document.querySelectorAll('.delete'))                               //Affichage de la partie suppression de projet de la modale
}

//Fermeture de la modale
const closeModal = () => {        
  hide(document.querySelectorAll('.modal'))                                //Masquage de la modale
  hide(document.querySelectorAll('.add'))                                  //Masquage des éléments d'ajout de projet de la modale
  document.getElementById('modalReturnButton').style.visibility = 'hidden' //Masquage du bouton retour
  document.querySelector('body').classList.remove('bodyOverlay')           //Retrait du voile sur le document 
  const figures = document.getElementsByClassName('bodyElement')           //
  for (i = 0; i < figures.length; i++) {                                   //Affichage du voile sur les éléments du document
    figures.item(i).classList.remove('elementOverlay')                     //
  }
  document.getElementById('modal').removeEventListener('click', closeModal)              //
  document.querySelector('.modalStop').removeEventListener('click', stopPropagation)     //
  document.getElementById('modalAddButton').removeEventListener('click', modalAddWork)   //
  document.getElementById('newWorkImage').removeEventListener('change', displayPreview)  //
  document.getElementById('modalValidateButton').removeEventListener('click', validForm) //
  document.getElementById('modalCloseButton').removeEventListener('click', () => {       //
    closeModal()                                                                         //
    clearForm()                                                                          //
  })                                                                                     //Retrait des écoutes  
  document.getElementById('modalReturnButton').removeEventListener('click', () => {      //  
  returnModalGallery()                                                                   //
  clearForm()                                                                            //
  })                                                                                     //
  document.querySelectorAll('.formInput').forEach(input => {                             //
    input.removeEventListener('input', validInput)                                       //
  })                                                                                     //
}                                                                                        //

//Aperçu de l'image du projet à ajouter
const displayPreview = () => {
  const preview = document.getElementById('preview')                    //Récupération de l'élément dans le document  
  const file = document.getElementById('newWorkImage').files[0]         //Récupération de l'élément de champ dans le formulaire
  const image = document.createElement('img')                           //Création d'un élément image
  image.setAttribute('id', 'imagePreview')                              //Attribution d'un id
  image.src = URL.createObjectURL(file)                                 //Source de l'image
  if (file) {                                                           //Vérification de la présence d'un fichier
      document.getElementById('setNewWorkImage').style.display = 'none' //Masquage du champ de formulaire
      preview.style.display = null                                      //Affichage de la partie aperçu
      preview.appendChild(image)                                        //Ajout de l'aperçu dans le document
  }    
}

//Nettoyage du formulaire d'ajout de projet
const clearForm = () => {
  document.getElementById('setNewWorkImage').style.display = null //Affichage du champ d'ajout d'image
  document.getElementById('newWorkImage').value = ''              //Nettoyage du champ d'ajout d'image
  document.getElementById('preview').style.display = 'none'       //Masquage du champ d'aperçu
  document.getElementById('preview').innerHTML = ''               //Nettoyage du champ d'aperçu de l'image
  document.getElementById('newWorkTitle').value = ''              //Nettoyage du champ titre 
  document.getElementById('newWorkCategory').selectedIndex = 0    //Nettoyage du champ de sélection de catégorie
  document.querySelectorAll('.formInput').forEach(input => {      //
    if (input.parentElement.classList.contains('invalid')) {      //Retrait de la classe invalid des champs de formulaire si présente
      input.parentElement.classList.remove('invalid')             //
    }
  })
}

//Suppression d'un projet
const deleteWork = async (id) => {             
  return await fetch(`${apiUrl}works/${id}`, { //Chemin de la promesse dans l'API
    method: 'DELETE',                          //Type de requête
    headers: {                                 //En-tête
      'Authorization': `Bearer ${token}`       //Authentification
    }
  })
  .then(res => {                               //Fonction de rappel 
    if (res.status === 204) {                  //Message de statut de l'API
      alert("Le projet est supprimé.")         //Message à l'utilisateur
      updateGallery(id)                        //Mise à jour de la galerie
  }})
  .catch((error) => {                          //Vérification de la présence d'une erreur 
    console.log(error)                         //Visualisation de l'erreur dans la console
  })
}

//Mise à jour de la galerie
const updateGallery = (id) => {                                 
  const workFigure = document.querySelectorAll('.workFigure') //Sélection des figures des galeries
  workFigure.forEach(element => {                             //Sélection des figures
    if (element.id == id) {                                   //comparaison des id
      element.remove()                                        //Retrait des figures
    }
  })
}

//Vérification des champs de formulaire
const validInput = () => {
  const checkList = []                                                               //Création d'un tableau de vérification des champs
  document.querySelectorAll('.formInput').forEach(input => {                         //Récupération des champs
    checkList.push(listenInput(input))                                               //Ajout du résultat de la vérification des champs au tableau
  })
  if (checkList.includes(false) === false) {                                         //Vérification de la présence d'un champ invalide dans le tableau
    document.getElementById('modalValidateButton').classList.remove('invalidButton') //Retrait de la classe invalid au bouton de validation du projet
    document.getElementById('modalValidateButton').classList.add('validButton')      //Ajout de la classe valid au bouton de validation du projet
  } else {                                                                           
    document.getElementById('modalValidateButton').classList.remove('validButton')   //Retrait de la classe valid au bouton de validation du projet
    document.getElementById('modalValidateButton').classList.add('invalidButton')    //Ajout de la classe invalid au bouton de validation du projet
  }
}

//Vérification du champ de formulaire
  const listenInput = (input) => {
    if (input.value === '' || input.selectedIndex === 0) { //Vérification de la complétion du champ
    return false                                            
  } else {                                                  
    return true                                            
  }      
}

//Vérification du formulaire
const validForm = () => {
  const checkList = []                                       //Création d'un tableau de vérification des champs
  document.querySelectorAll('.formInput').forEach(input => { //Récupération des champs
    checkList.push(checkInput(input))                        //Ajout du résultat de la vérification des champs au tableau
  })  
  if (checkList.includes(false) === true) {                  //Vérification de la présence d'un champ invalide dans le tableau
    alert("Formulaire incomplet")                            //Message à l'utilisateur
  } else {                                                                    
    setNewWork()                                             //Edition du projet
  }
}

//Vérification du champ de formulaire
const checkInput = (input) => {
  if (input.value === '' || input.selectedIndex === 0 ) {    //Vérification de la complétion du champ
    input.parentElement.classList.add('invalid')             //Ajout de la classe invalid
    return false                                              
  } if (input.parentElement.classList.contains('invalid')) {  
      input.parentElement.classList.remove('invalid')        //Retrait de la classe invalid, si présente
  } else {                                                    
    return true                                               
  }
}

//Edition du projet
const setNewWork = () => {
  formData = new FormData()                                                                     //Création d'un ensemble de paire clé/valeur
  formData.append('image', document.getElementById('newWorkImage').files[0])                    //
  formData.append('title', document.getElementById('newWorkTitle').value)                       //Champs de formulaire et leurs valeurs
  formData.append('category', document.getElementById('newWorkCategory').selectedOptions[0].id) //
  postNewWork(formData)                                                                         //Envoi du projet
  clearForm()                                                                                   //Nettoyage du formulaire
}

//Envoi du projet
const postNewWork = async (formData) => {
  return await fetch(`${apiUrl}works`, {  //Chemin de la requête dans l'API
    method: 'POST',                       //Type de requête
    headers: {                            //En-tête
        Authorization: `Bearer ${token}`  //Authentification
    },
    body: formData                        //Type de corps
  })
  .then(res => {                          //Fonction de rappel
    if (res.status === 201) {             //Message de statut de l'API
      alert("Le projet est ajouté.")      //Message à l'utilisateur  
  }})
  .catch((error) => {                     //Vérification de la présence d'une erreur
    console.log(error)                    //Visualisation de l'erreur dans la console
  })
}