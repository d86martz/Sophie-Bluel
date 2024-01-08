const apiUrl = 'http://localhost:5678/api/'     //Stockage de l'adresse de l'API
const token = sessionStorage.getItem('token')   //Récupération et stockage de l'identifiant                 

const show = (data) => {          //  
  Array.from(data).forEach(i => { //Fonction pour affichage d'éléments
    i.style.display = 'flex'      //
  })
}
const hide = (data) => {          //
  Array.from(data).forEach(i => { //Fonction pour masquage d'éléments
    i.style.display = 'none'      //
  })
}
hide(document.getElementsByClassName('mask'))

    //Connexion de l'utilisateur
const userConnected = () => {   
  if(sessionStorage.getItem('token') !== null) {                      //Vérification de la présence d'un identifiant           
    show(document.getElementsByClassName('edition'))                  //Affichage du mode édition
    document.getElementById('filters').style.visibility = 'hidden'    //Masquage des boutons filtres
  }
}
userConnected()

    //Category//

//Connexion a l'API
const getApiCategory = async () => {  
  return await fetch (`${apiUrl}categories`)  //Communication avec l'API                  
    .then(res => res.json())                  //Conversion des données                                   
    .catch (error => {                        //Vérification de la présence d'une erreur
      console.log(error)                      //Visualisation de l'erreur dans la console
    })
}
//Création de la liste des categories
const setCategory = async () => {
  let setApiCategory = new Set(await getApiCategory())      //Création d'une liste des categories sans doublons
  const categoryList = Array.from(setApiCategory.values())  //Conversion en tableau
  categoryList.splice(0,0,{id:0, name:'Tous'})              //Ajout de la catégorie "Tous"
  console.log('Category : ', categoryList)                  //Visualisation de la liste dans la console
  setFilters(categoryList)                                  //Création des filtres
}
setCategory()  //Lancement de la fonction

//Création des filtres 
const setFilters = (categoryList) => {
  categoryList.forEach(category => {    //Séléction des categories
    filterButton(category)              //Création du bouton filtre pour chaque categorie   
  })
}

//Création du bouton
const filterButton = (category) => {
  button = document.createElement('button')                      
  button.setAttribute('id', category.id)                  //Attribution dun id identique à celui de la categorie
  button.setAttribute('class', category.name)             //Attribution d'une classe identique au nom de la categorie             
  button.textContent = (category.name)                    //Attribution d'un nom identique à celui de la categorie                                
  document.getElementById('filters').appendChild(button)  //Ajout du bouton dans le document 
 }

    //Works//

//Connexion a l'interface de communication
const getApiWorks = async () => {
  return await fetch (`${apiUrl}works`) //Récupération des données de l'API                       
    .then((res) => res.json())          //Conversion des données   
    .catch (error => {                  //Vérification de la présence d'une erreur
      console.log(error)                //Visualisation de l'erreur dans la console
    })
}

//Création de la liste des projets
const getWorks = async () => {
  const setWorks = new Set (await getApiWorks())  //Création d'une liste des categories sans doublons
  const works = Array.from(setWorks.values())     //Conversion en tableau
  console.log('Works : ', works)                  //Visualisation de la liste dans la console
  filterGallery(works)                            //Filtration de la galerie
  onload()                                        //Affichage de la galerie au chargement de la page
  setModalGallery(works)                          //Création de la galerie de la modale 
} 
getWorks()  //Lancement de la fonction 

//Filtration de la galerie
const filterGallery = (works) => {
  document.getElementById('filters')                    //Sélection de la barre de filtre
    .addEventListener('click', (event) => {             //Ecoute de la selection du bouton
      const filter = event.target.id                    //Récuperation de l'id de catégorie du bouton selectionné
      document.getElementById('gallery').innerHTML = '' //Retrait de la sélection actuelle
      setGallery(works, filter)                         //Création de la galerie selon le filtre
  })
}

//Création de la galerie selon le filtre
const setGallery = (works, filter) => {
  works.forEach(work => { 
    if(filter == work.category.id) { //Sélection des projets selon l'id
      figureCreation(work)           //Création de la figure du projet   
    }else {
      if(filter == 0) {              //Si "Tous" sélectionné
        figureCreation(work)         //Création de la figure du projet
      }
    }
  })
}

//Création de la figure du projet
const figureCreation = (work) => {                    
  image = document.createElement('img')                   //Création d'un élément image                      
  title = document.createElement('p')                     //Création d'un élément titre                         
  // title.style.marginTop = '0.5em'                             
  image.src = work.imageUrl                               //Source de l'image selon le projet                                
  title.textContent = work.title                          //Source du titre identique à celui du projet 
  const figure = document.createElement('work')           //Création d'un élément figure                               
  figure.appendChild(image)                               //Ajout de l'image à la figure                                   
  figure.appendChild(title)                               //Ajout du titre à la figure
  figure.setAttribute('id', work.id)                      //Attribution d'un id identique à celui du projet
  figure.setAttribute('class', "figure")                  //Attribution d'une classe
  document.getElementById('gallery').appendChild(figure)  //Ajout de la figure dans le document                                                  
}

//création de la galerie de la modale
const setModalGallery = (works) => {
  works.forEach(work => {            //Séléction des projets
    modalFigureCreation(work)        //Création de la figure du projet
  })
}

//Création de la figure du projet
const modalFigureCreation = (work) => {                   
  image = document.createElement('img')                                               //Création d'un élément image                                                         
  image.src = work.imageUrl                                                           //Source de l'image selon le projet
  button = document.createElement('button')                                           //Création d'un élément bouton
  button.innerHTML = ('value',`<i workId="${work.id}" class="fas fa-trash-can"></i>`) //Ajout d'un icon au bouton avec un id identique à celui du projet 
  button.setAttribute('class', 'trashButton')                                         //Attribution d'une classe                                             
  const figure = document.createElement('work')                                       //Création d'un élément figure                            
  figure.appendChild(button)                                                          //Ajout du bouton à l'élément figure
  figure.appendChild(image)                                                           //Ajout de l'image à l'élément figure
  figure.setAttribute('id', work.id)                                                  //Attribution d'un id à la figure identique à celui du projet                            
  document.getElementById('modalGallery').appendChild(figure)                         //Ajout de la figure dans le document
  button.addEventListener('click', (event) => {                                       //Ecoute du bouton 
    event.preventDefault()                                                            //Empêche le comportement par défaut
    const id = event.target.getAttribute('workId')                                    //Récupération de l'id du bouton séléctionné
    deleteWork(id)                                                                    //Suppression du projet selon l'id
  })                                                                             
}

//Affichage de la galerie au chargement de la page
const onload = () => {                                     
  const allBtn = document.getElementById(0) //Séléction du bouton "Tous"
  allBtn.click()                            //Click du bouton "Tous"
  allBtn.focus()                            //Focus du bouton "Tous"    
}

document.getElementById('editButton').addEventListener('click', (event) => {  //Ecoute du click sur le bouton modifier en mode édition
  event.preventDefault();                                                     //Empêche le comportement par défaut
  openModal()                                                                 //Lancement de l'ouverture de la modale
})

//Ouverture de la modale
const openModal = () => {
  show(document.getElementsByClassName('modal'))                      //Affichage de la modale
  show(document.getElementsByClassName('delete'));                    //Affichage des éléments de suppression de projet
  document.getElementById('mainContainer').classList.add('overlay');  //Affichage du voile derrière la modale
  const figures = document.getElementsByClassName("figure");          //
  for (i = 0; i < figures.length; i++) {                              //Affichage du voile sur les images derrière la modale
    figures.item(i).classList.add("imageOverlay");                    //
  } 
  document.getElementById('modalAddButton').addEventListener('click', modalAddWork)   //Ecoute de l'entrée de formulaire pour l'apercu de l'image
  document.getElementById('newWorkImage').addEventListener('change', displayPreview)  //Ecoute du champ de formulaire d'ajout d'image du projet          
  document.getElementById('modalCloseButton').addEventListener('click', () => {       //Ecoute du click sur le bouton de fermeture 
    closeModal()                                                                      //Fermeture de la modale
    clearForm()                                                                       //Nettoyage du formulaire
  })           
  document.getElementById('modalReturnButton').addEventListener('click', () => {      //Ecoute du click sur le bouton de retour              
    returnModalGallery()                                                              //Retour a la partie ajout de projet
    clearForm()                                                                       //Nettoyage de la modale
  })      
}

//Partie ajout de projet de la modale 
const modalAddWork = () => {
  document.getElementById('modalReturnButton').style.visibility = 'visible'           //Affichage du bouton de retour 
  hide(document.getElementsByClassName('delete'))                                     //Masquage des éléments de suppression de projet
  show(document.getElementsByClassName('add'))                                        //Affichage des éléments d'ajout de projet
  document.getElementById('modalValidateButton').addEventListener('click', validForm) //Ecoute du bouton de validation du formulaire
  Array.from(document.getElementsByClassName('formInput')).forEach(input => {         //Ecoute des champs de formulaire
    input.addEventListener('input', validInput)                                       //Validation du champ 
  })                                                                                  
   
}

//Retour dans la modale
const returnModalGallery = () => {
  document.getElementById('modalReturnButton').style.visibility = 'hidden'  //Masquage du bouton retour
  hide(document.getElementsByClassName('add'))                              //Masquage de la partie ajout de projet de la modale
  show(document.getElementsByClassName('delete'))                           //Affichage de la partie suppression de projet de la modale
}

//Fermeture de la modale
const closeModal = () => {        
  modal.style.display = 'none';                                            //Masquage de la modale
  document.getElementById('modalReturnButton').style.visibility = 'hidden' //Masquage du bouton retour
  hide(document.getElementsByClassName('add'))                             //Masquage des éléments d'ajout de projet de la modale
  document.getElementById('mainContainer').classList.remove('overlay');    //Masquage des éléments de suppression de projet 
  const figures = document.getElementsByClassName("figure");               //
  for (let i = 0; i < figures.length; i++) {                               //Masquage du voile sur les images derrière la modale
    figures.item(i).classList.remove("imageOverlay");                      //
  }
  document.getElementById('modalAddButton').removeEventListener('click', modalAddWork)    //
  document.getElementById('newWorkImage').removeEventListener('change', displayPreview);  //
  document.getElementById('modalValidateButton').removeEventListener('click', validForm)  //
  document.getElementById('modalCloseButton').removeEventListener('click', () => {        //
    closeModal()                                                                          //
    clearForm()                                                                           //
  })                                                                                      //  
  document.getElementById('modalReturnButton').removeEventListener('click', () => {       //  Retrait des écoutes
  returnModalGallery()                                                                    //
  clearForm()                                                                             //
  })                                                                                      //
  Array.from(document.getElementsByClassName('formInput')).forEach(input => {             //
    input.removeEventListener('input', validInput)                                        //
  })                                                                                      //
}                                                                                         //

//Aperçu de l'image du projet à ajouter
const displayPreview = () => {
  const preview = document.getElementById('preview')                      //Récupération de l'élément dans le document  
  const file = document.getElementById('newWorkImage').files[0];          //Récupération de l'élément de champ dans le formulaire
  const image = document.createElement('img')                             //Création d'un éléments image
  image.setAttribute('id', 'imagePreview')                                //Attribution d'un id
  image.src = URL.createObjectURL(file)                                   //Source de l'image
  if (file) {                                                             //Vérification de la présence d'un fichier
      document.getElementById('setNewWorkImage').style.display = 'none';  //Masquage du champ de formulaire
      preview.style.display = null;                                       //Affichage de la partie aperçu
      preview.appendChild(image)                                          //Ajout de l'aperçu dans le document
  }    
}

//Néttoyage du formulaire d'ajout de projet
const clearForm = () => {
  document.getElementById('setNewWorkImage').style.display = null;            //Affichage du champ d'ajout d'image
  document.getElementById('newWorkImage').value = '';                         //Néttoyage du champ d'ajout d'image
  document.getElementById('preview').style.display = 'none';                  //Masquage du champ d'aperçu
  document.getElementById('preview').innerHTML = '';                          //Néttoyage du champ d'aperçu de l'image
  document.getElementById('newWorkTitle').value = '';                         //Néttoyage du champ titre 
  document.getElementById('newWorkCategory').selectedIndex = 0;               //Néttoyage du champ de séléction de catégorie
  Array.from(document.getElementsByClassName('formInput')).forEach(input => { //
    if (input.parentElement.classList.contains('invalid')) {                  //Retrait de la classe invalid des champs de formulaire si présente
      input.parentElement.classList.remove('invalid')                         //
    }
  })
}

//Suppression d'un projet
const deleteWork = async (id) => {             
  return await fetch(`${apiUrl}works/${id}`, {  //Communication avec l'API
    method: 'DELETE',                           //Type de requète
    headers: {                                  //En-tête
      'Authorization': `Bearer ${token}`        //Authentification
    }
  })
  .then(res => {                                //Fonction de rappel 
    if (res.status === 204) {                   //Message de statut de l'API
      alert("Le projet est supprimé.")          //Message à l'utilisateur
  }})
  .catch((error) => {                           //Vérification de la présence d'une erreur 
    console.log(error)                          //Visualisation de l'erreur dans la console
  })
}

//Vérification des champs de formulaire
const validInput = () => {
  const checkList = []                                                                //Création d'un tableau de vérification des champs
  Array.from(document.getElementsByClassName('formInput')).forEach(input => {         //Récupération des champs
    checkList.push(listenInput(input))                                                //Ajout du résultat de la vérification des champs au tableau
  })
  if (checkList.includes(false) === false) {                                          //Vérification de la présence d'un champ invalide dans le tableau: Si non
    document.getElementById('modalValidateButton').classList.remove('invalidButton')  //Retrait de la classe invalid au bouton de validation du projet
    document.getElementById('modalValidateButton').classList.add('validButton')       //Ajout de la classe valid au bouton de validation du projet
  } else {                                                                            //Sinon
    document.getElementById('modalValidateButton').classList.remove('validButton')    //Retrait de la classe valid au bouton de validation du projet
    document.getElementById('modalValidateButton').classList.add('invalidButton')     //Ajout de la classe invalid au bouton de validation du projet
  }
}

//Vérification du champ
  const listenInput = (input) => {
    if (input.value === '' || input.selectedIndex === 0) {  //Vérification de la complétion du champ
    return false
  } else {
    return true
  }      
}

//Vérification du formulaire
const validForm = () => {
  const checkList = []
  Array.from(document.getElementsByClassName('formInput')).forEach(input => {
    checkList.push(checkInput(input))
  })
  if (checkList.includes(false) === true) {
    alert("Formulaire incomplet") 
  } else { 
    setNewWork()  
  }
}

const checkInput = (input) => {
  if (input.value === '' || input.selectedIndex === 0 ) {
    input.parentElement.classList.add('invalid')
    return false
  } if (input.parentElement.classList.contains('invalid')) {
      input.parentElement.classList.remove('invalid')
  } else {
    return true
  }
}

const setNewWork = () => {
  formData = new FormData()
  formData.append("image", document.getElementById("newWorkImage").files[0])
  formData.append("title", document.getElementById("newWorkTitle").value)
  formData.append("category", document.getElementById('newWorkCategory').selectedOptions[0].id)
  postNewWork(formData)
  clearForm()
}

const postNewWork = async (formData) => {
  return await fetch(`${apiUrl}works`, {
    method: "POST",
    headers: { 
        Authorization: `Bearer ${token}`
    },
    body: formData
  })
  .then(res => {
    if (res.status === 201) {
      alert("Le projet est ajouté.")
  }})
  .catch((error) => {
    console.log(error)
  })
}