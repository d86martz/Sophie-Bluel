const apiUrl = 'http://localhost:5678/api/'   //Stockage de l'adresse de l'API
const token = sessionStorage.getItem('token')   //Récupération et stockage de l'identifiant                 

const show = (data) => {
  Array.from(data).forEach(i => {
    i.style.display = 'flex'  
  })
}
const hide = (data) => {
  Array.from(data).forEach(i => {
    i.style.display = 'none'
  })
}
hide(document.getElementsByClassName('mask'))

    //Connexion de l'utilisateur
const userConnected = () => {   
  if(sessionStorage.getItem('token') !== null) {    //Vérification de la présence d'un identifiant           
    show(document.getElementsByClassName('edition'))    //Affichage du mode édition
    document.getElementById('filters').style.visibility = 'hidden'    //Masquage des boutons filtres
  }
}
userConnected()   //Lancement de la fonction

    //Category//

//Connexion a l'API
const getApiCategory = async () => {  
  return await fetch (`${apiUrl}categories`)  //Récupération des données de l'API                  
    .then(res => res.json())  //Conversion des données                                   
    .catch (error => {  //Vérification de la présence d'une erreur
      console.log(error)  //Visualisation de l'erreur dans la console
    })
}
//Création de la liste des categories
const setCategory = async () => {
  let setApiCategory = new Set(await getApiCategory())  //Création d'une liste des categories sans doublons
  const categoryList = Array.from(setApiCategory.values())  //Conversion en tableau
  categoryList.splice(0,0,{id:0, name:'Tous'})   //Ajout de la catégorie "Tous"
  console.log('Category : ', categoryList)  //Visualisation de la liste dans la console
  setFilters(categoryList)  //Lancement de la création des filtres
}
setCategory()  //Lancement de la fonction

//Création des filtres 
const setFilters = (categoryList) => {
  categoryList.forEach(category => {  //Séléction des categories
    filterButton(category)  //Lancement de la création du bouton filtre pour chaque categorie   
  })
}

//Création du bouton
const filterButton = (category) => {
  button = document.createElement('button')                      
  button.setAttribute('id', category.id)  //Attribution dun id identique à celui de la categorie
  button.setAttribute('class', category.name) //Attribution d'une classe identique au nom de la categorie             
  button.textContent = (category.name)  //Attribution d'un nom identique à celui de la categorie                                
  document.getElementById('filters').appendChild(button)  //Ajout du bouton dans le document 
 }

    //Works//

//Connexion a l'interface de communication
const getApiWorks = async () => {
  return await fetch (`${apiUrl}works`) //Récupération des données de l'API                       
    .then((res) => res.json())  //Conversion des données   
    .catch (error => {  //Vérification de la présence d'une erreur
      console.log(error)  //Visualisation de l'erreur dans la console
    })
}

//Création de la liste des projets
const getWorks = async () => {
  const setWorks = new Set (await getApiWorks())  //Création d'une liste des categories sans doublons
  const works = Array.from(setWorks.values())   //Conversion en tableau
  console.log('Works : ', works)  //Visualisation de la liste dans la console
  filterGallery(works) //Lancement de la filtration de la galerie
  onload()  //Lancement l'affichage de la galerie au chargement de la page
  setModalGallery(works)  //Lancement de la création de la galerie de la modale 
} 
getWorks()  //Lancement de la fonction 

//Filtration de la galerie
const filterGallery = (works) => {
  document.getElementById('filters') //Sélection de la barre de filtre
    .addEventListener('click', (event) => { //Ecoute de la selection du bouton
      const filter = event.target.id  //Récuperation de l'id de catégorie du bouton selectionné
      document.getElementById('gallery').innerHTML = '' //Retrait de la sélection actuelle
      setGallery(works, filter) //Lancement de la création de la galerie selon le filtre
  })
}

//Création de la galerie selon le filtre
const setGallery = (works, filter) => {
  works.forEach(work => { 
    if(filter == work.category.id) { //Sélection des projets selon l'id
      figureCreation(work) //Création de la figure du projet   
    }else {
      if(filter == 0) {   //Si "Tous" sélectionné
        figureCreation(work)  //Création de la figure du projet
      }
    }
  })
}

//Création de la figure du projet
const figureCreation = (work) => {                    
  image = document.createElement('img') //Création d'un élément image                      
  title = document.createElement('p') //Création d'un élément titre                         
  // title.style.marginTop = '0.5em'                             
  image.src = work.imageUrl //Source de l'image selon le projet                                
  title.textContent = work.title  //Source du titre identique à celui du projet 
  const figure = document.createElement('work') //Création d'un élément figure                               
  figure.appendChild(image) //Ajout de l'image à la figure                                   
  figure.appendChild(title) //Ajout du titre à la figure
  figure.setAttribute('id', work.id)  //Attribution d'un id identique à celui du projet
  figure.setAttribute('class', "figure")  //Attribution d'une classe
  document.getElementById('gallery').appendChild(figure)  //Ajout de la figure dans le document                                                  
}

//création de la galerie de la modale
const setModalGallery = (works) => {
  works.forEach(work => { //Séléction des projets
    modalFigureCreation(work) //Création de la figure du projet
  })
}

//Création de la figure du projet
const modalFigureCreation = (work) => {                   
  image = document.createElement('img') //Création d'un élément image                                                         
  image.src = work.imageUrl //Source de l'image selon le projet
  button = document.createElement('button') //Création d'un élément bouton
  button.innerHTML = ('value',`<i workId="${work.id}" class="fas fa-trash-can"></i>`) //Ajout d'un icon au bouton avec un id identique à celui du projet 
  button.setAttribute('class', 'trashButton') //Attribution d'une classe                                             
  const figure = document.createElement('work') //Création d'un élément figure                            
  figure.appendChild(button)  //Ajout du bouton à l'élément figure
  figure.appendChild(image) //Ajout de l'image à l'élément figure
  figure.setAttribute('id', work.id)  //Attribution d'un id à la figure identique à celui du projet                            
  document.getElementById('modalGallery').appendChild(figure) //Ajout de la figure dans le document
  button.addEventListener('click', (event) => { //Ecoute du bouton 
    event.preventDefault()  //Empêche le comportement par défaut
    const id = event.target.getAttribute('workId')  //Récupération de l'id du bouton séléctionné
    deleteWork(id)  //Lancement de la suppression du projet selon l'id
  })                                                                             
}

//Affichage de la galerie au chargement de la page
const onload = () => {                                     
  const allBtn = document.getElementById(0) //Séléction du bouton "Tous"
  allBtn.click()  //Click du bouton "Tous"
  allBtn.focus()  //Focus du bouton "Tous"    
}

document.getElementById('editButton').addEventListener('click', (event) => {  //Ecoute du click sur le bouton modifier en mode édition
  event.preventDefault(); //Empêche le comportement par défaut
  openModal() //Lancement de l'ouverture de la modale
})

//Ouverture de la modale
const openModal = () => {
  show(document.getElementsByClassName('modal'))  //Affichage de la modale
  show(document.getElementsByClassName('delete')); //Affichage des éléments de la modale
  document.getElementById('mainContainer').classList.add('overlay');
  const figures = document.getElementsByClassName("figure");
  for (i = 0; i < figures.length; i++) {
    figures.item(i).classList.add("imageOverlay");
  } 
  document.getElementById('modalAddButton').addEventListener('click', modalAddWork)
  document.getElementById('modalCloseButton').addEventListener('click', closeModal);
  document.getElementById('modalReturnButton').addEventListener('click', returnModalGallery)
  document.getElementById('newWorkImage').addEventListener('change', displayPreview)
}

const modalAddWork = () => {
  document.getElementById('modalReturnButton').style.visibility = 'visible'
  hide(document.getElementsByClassName('delete'))
  show(document.getElementsByClassName('add'))
  document.getElementById('modalCloseButton').addEventListener('click', clearForm);
  document.getElementById('modalReturnButton').addEventListener('click', clearForm)
  Array.from(document.getElementsByClassName('formInput')).forEach(input => { 
    input.addEventListener('input', validInput)
  })
  document.getElementById('modalValidateButton').addEventListener('click', validForm)
}
 
const returnModalGallery = () => {
  document.getElementById('modalReturnButton').style.visibility = 'hidden'
  hide(document.getElementsByClassName('add'))
  show(document.getElementsByClassName('delete'))
}

const closeModal = () => {
  modal.style.display = 'none';
  document.getElementById('modalReturnButton').style.visibility = 'hidden'
  hide(document.getElementsByClassName('add'))
  document.getElementById('mainContainer').classList.remove('overlay');
  const figures = document.getElementsByClassName("figure");
  for (let i = 0; i < figures.length; i++) {
    figures.item(i).classList.remove("imageOverlay");
  }
  document.getElementById('newWorkImage').removeEventListener('change', displayPreview);
  document.getElementById('modalCloseButton').removeEventListener('click', closeModal );
  document.getElementById('modalValidateButton').removeEventListener('click', validForm );
  document.getElementById('modalReturnButton').removeEventListener('click', returnModalGallery );
  document.getElementById('modalCloseButton').removeEventListener('click', clearForm);
  document.getElementById('modalValidateButton').removeEventListener('click', clearForm);
  document.getElementById('modalReturnButton').removeEventListener('click', clearForm);
  Array.from(document.getElementsByClassName('formInput')).forEach(input => { 
    input.removeEventListener('input', validInput)
  })
  document.getElementById('modalValidateButton').removeEventListener('click', validForm)
}

const displayPreview = () => {
  const preview = document.getElementById('preview')
  const file = document.getElementById('newWorkImage').files[0];
  const image = document.createElement('img')
  image.setAttribute('id', 'imagePreview')
  image.src = URL.createObjectURL(file)
  if (file) {
      document.getElementById('setNewWorkImage').style.display = 'none';
      preview.style.display = null;
      preview.appendChild(image)
  }    
}

const clearForm = () => {
  document.getElementById('newWorkImage').value = '';
  document.getElementById('preview').innerHTML = '';
  document.getElementById('setNewWorkImage').style.display = null;
  document.getElementById('preview').style.display = 'none';
  document.getElementById('newWorkTitle').value = '';
  document.getElementById('newWorkCategory').selectedIndex = 0;
  Array.from(document.getElementsByClassName('formInput')).forEach(input => {
    if (input.parentElement.classList.contains('invalid')) {
      input.parentElement.classList.remove('invalid')
    }
  })
}

const deleteWork = async (id) => {
  return await fetch(`${apiUrl}works/${id}`, {
    method: 'DELETE',
    headers: { 
      'Authorization': `Bearer ${token}`
    }
  })
  .then(res => {
    if (res.status === 204) {
      alert("Le projet est supprimé.")
  }})
  .catch((error) => {
    console.log(error)
  })
}

const validInput = () => {
  const checkList = []
  Array.from(document.getElementsByClassName('formInput')).forEach(input => {
    checkList.push(listenInput(input))
  })
  if (checkList.includes(false) === false) {
    document.getElementById('modalValidateButton').classList.remove('invalidButton')
    document.getElementById('modalValidateButton').classList.add('validButton')
  } else {
    document.getElementById('modalValidateButton').classList.remove('validButton')
    document.getElementById('modalValidateButton').classList.add('invalidButton')
  }
}

const listenInput = (input) => {
  if (input.value === '' || input.selectedIndex === 0) {
    return false
  } else {
    return true
  }      
}

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

