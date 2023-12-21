const apiUrl = 'http://localhost:5678/api/'
const token = sessionStorage.getItem('token')                 //Url of API

const userConnected = () => {
  if(sessionStorage.getItem('token') !== null) {
    document.getElementById('editMode').style.display = null
    document.getElementById('edit').style.display = null
    document.getElementById('filters').style.visibility = 'hidden'
  }
}
userConnected()

//Category

const getApiCategory = async () => {
  return await fetch (`${apiUrl}categories`)                   //Calling the API for category receipt
    .then(res => res.json())                                   
    .catch (error => {
      console.log(error)
    })
}

const apiCategory = async () => {
  let setApiCategory = new Set(await getApiCategory())
  const categoryList = Array.from(setApiCategory.values())
  categoryList.splice(0,0,{id:0, name:'Tous'})
  console.log('Category : ', categoryList)
  getFilters(categoryList)
}
apiCategory()

const getFilters = (categoryList) => {
  categoryList.forEach(category => {
    filterButton(category)
  })
}

const filterButton = (category) => {
  button = document.createElement('button')                     //Creating the Button
  button.setAttribute('id', category.id)
  button.setAttribute('class', category.name)                  //Assigning an Id
  button.textContent = (category.name)                               //Visible button text
  document.getElementById('filters').appendChild(button) 
 }

 //Works

const getApiWorks = async () => {
  return await fetch (`${apiUrl}works`)                       //Calling the API for works receipt
    .then((res) => res.json())   
    .catch (error => {
      console.log(error)
    })
}

const getWorks = async () => {
  const setWorks = new Set (await getApiWorks())
  const works = Array.from(setWorks.values())
  console.log('Works : ', works)
  addModalGallery(works)
  setGallery(works)
  onload()
} 

getWorks()

const addModalGallery = (works) => {
  works.forEach(work => {
    modalFigureCreation(work)
  })
}

const setGallery = (works) => {
  document.getElementById('filters')
    .addEventListener('click', (event) => {
      const filter = event.target.id
      document.getElementById('gallery').innerHTML = ''
      addGallery(works, filter) 
  })
}

const addGallery = (works, filter) => {
  works.forEach(work => {
    if(filter == work.category.id) {
      figureCreation(work)    
    }else {
      if(filter == 0) {
        figureCreation(work)
    }
    }
  })
}

const figureCreation = (work) => {                    //Creating the Project Figure Element
  image = document.createElement('img')                       //Creating the Project Image Element
  title = document.createElement('p')                         //Creating the Project Title Element
  title.style.marginTop = '0.5em'                             //Changing the Layout of the Title
  image.src = work.imageUrl                                   //Image Element Source
  title.textContent = work.title
  const figure = document.createElement('work')                               //Title Element Source
  figure.appendChild(image)                                   //Added the Image Element in the Figure Element
  figure.appendChild(title)
  figure.setAttribute('id', work.id)
  document.getElementById('gallery').appendChild(figure)                                                  //Added the Title Element in the Figure Element                          //Added the element in the HTML section
}

const modalFigureCreation = (work) => {                   //Creating the Project Figure Element
  image = document.createElement('img')                    //Creating the Project Image Element                                      //Changing the Layout of the Title
  image.src = work.imageUrl
  button = document.createElement('button')
  button.innerHTML = ('value',`<i workId="${work.id}" class="fas fa-trash-can"></i>`)
  button.setAttribute('class', 'trashButton')           //Creating the Button                                  //Image Element Source
  const figure = document.createElement('work')                             //Title Element Source
  figure.appendChild(button)
  figure.appendChild(image)
  figure.setAttribute('id', work.id)                                //Added the Image Element in the Figure Element
  document.getElementById('modalGallery').appendChild(figure)
  button.addEventListener('click', (event) => {
    event.preventDefault()
    const id = event.target.getAttribute('workId')
    deleteWork(id)
  })                                                   //Added the Title Element in the Figure Element                          //Added the element in the HTML section
}

const onload = () => {                                     
  const allBtn = document.getElementById(0)
  allBtn.click()
  allBtn.focus()      //Selecting the "All" button
}

document.getElementById('edit').addEventListener('click', (event) => {
  event.preventDefault();
  openModal()
})

const openModal = () => { 
  modal = document.getElementById('modal');
  modal.style.display = null;
  modal.addEventListener('click', closeModal);
  document.getElementById('modalDeleteWork').style.display = null;
  document.getElementById('modalAddButton').style.display = null;
  document.getElementById('mainContainer').classList.add('modalOpen')
  document.querySelector('.modalStop').addEventListener('click', stopPropagation);
  document.getElementById('modalAddButton').addEventListener('click', modalAddWork)
  document.getElementById('modalCloseButton').addEventListener('click', closeModal); 
  document.getElementById('modalReturnButton').addEventListener('click', returnModalGallery)
  document.getElementById('modalValidateButton').addEventListener('click', setNewWork)
  document.getElementById('addNewWorkImage').addEventListener('change', displayPreview)
}

const modalAddWork = () => {
  document.getElementById('modalReturnButton').style.visibility = 'visible'
  document.getElementById('modalDeleteWork').style.display = 'none';
  document.getElementById('modalAddWork').style.display = null;
  document.getElementById('modalAddButton').style.display = 'none';
  document.getElementById('modalValidateButton').style.display = null;
  document.getElementById('modalCloseButton').addEventListener('click', clearForm); 
  document.getElementById('modalReturnButton').addEventListener('click', clearForm)
}
 
const returnModalGallery = () => {
  document.getElementById('modalReturnButton').style.visibility = 'hidden'
  document.getElementById('modalDeleteWork').style.display = null;
  document.getElementById('modalAddWork').style.display = 'none';
  document.getElementById('modalAddButton').style.display = null;
  document.getElementById('modalValidateButton').style.display = 'none';
}

const closeModal = () => {
  modal.style.display = 'none';
  modal.removeEventListener('click', closeModal);
  document.getElementById('modalReturnButton').style.visibility = 'hidden'
  document.getElementById('modalAddWork').style.display = 'none';
  document.getElementById('modalValidateButton').style.display = 'none';
  document.getElementById('mainContainer').classList.remove('modalOpen');
  document.getElementById('addNewWorkImage').removeEventListener('change', displayPreview);
  document.querySelector('.modalStop').removeEventListener('click', stopPropagation);
  document.getElementById('modalCloseButton').removeEventListener('click', closeModal && clearForm);
  document.getElementById('modalValidateButton').removeEventListener('click', setNewWork && clearForm);
  document.getElementById('modalReturnButton').removeEventListener('click', returnModalGallery && clearForm);
}

const stopPropagation = (event) => {
  event.stopPropagation()
}

const displayPreview = () => {
  const preview = document.getElementById('preview')
  const file = document.getElementById('addNewWorkImage').files[0];
  const image = document.createElement('img')
  image.setAttribute('id', 'imagePreview')
  image.src = URL.createObjectURL(file)
  if (file) {
      document.getElementById('newWorkImageArea').style.display = 'none';
      preview.style.display = null;
      preview.appendChild(image)
  }    
}

const checkForm = () => {
  image = document.getElementById('addNewWorkImage');
  imageArea = document.getElementById('newWorkImageArea');
  title = document.getElementById('newWorkTitle');
  category = document.getElementById('newWorkCategory');
  if (image.value == '') {
    imageArea.focus()
    imageArea.classList.add("incomplete")
    return false
  }
  if (title.value == '') {
    title.focus()
    title.classList.add("incomplete")
    return false
  }  
  if (category.value == '') {
    category.classList.add("incomplete")
    category.focus()
    return false
  }
  // document.getElementsByClassName('formInput').forEach(element => {
  //   if (element.classList.contains('incomplete')) {
  //     element.classList.remove('incomplete')
  //   }
  // })
  return true
}

const clearForm = () => {
  document.getElementById('addNewWorkImage').value = '';
  document.getElementById('preview').innerHTML = '';
  document.getElementById('newWorkImageArea').style.display = null;
  document.getElementById('preview').style.display = 'none';
  document.getElementById('newWorkTitle').value = '';
  document.getElementById('newWorkCategory').selectedIndex = 0;
}

const deleteWork = async (id) => {
  return await fetch(`${apiUrl}works/${id}`, {
    method: 'DELETE',
    headers: { 
      'Authorization': `Bearer ${token}`
    }
  })
  .then((res) => res.json())
  .then((res) => { 
    if (res.status === 200){ 
    alert("Le projet à était supprimé")
    }
  })
  .catch((error) => {
    console.log(error)
  })
}

const setNewWork = () => {
  if (checkForm() === true) {
  formData = new FormData()
  formData.append("image", document.getElementById("addNewWorkImage").files[0])
  formData.append("title", document.getElementById("newWorkTitle").value)
  formData.append("category", document.getElementById('newWorkCategory').selectedOptions[0].id)
  postNewWork(formData)
  clearForm()
  }
}

const postNewWork = async (formData) => {
  return await fetch(`${apiUrl}works`, {
    method: "POST",
    headers: { 
        Authorization: `Bearer ${token}`
    },
    body: formData
  })
  .then((res) => res.json())
  .then((res) => { 
    if (res.status === 201) {
    alert("Le projet à était ajouté")
    }
  })
  .catch((error) => {
    console.log(error)
  })
}