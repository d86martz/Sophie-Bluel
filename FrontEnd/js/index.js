const userConnected = () => {
  if(sessionStorage.getItem('token') !== null) {
    document.querySelector('.js-edit-mode').style.display = null;
    document.querySelector('.js-edit').style.display = null;
    document.querySelector('.js-filters').style.visibility = 'hidden';
  }
}
userConnected() 

const apiUrl = 'http://localhost:5678/api/'                   //Url of API

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
  button.setAttribute('id', category.id)                  //Assigning an Id
  button.textContent = (category.name)                               //Visible button text
  document.querySelector('.js-filters').appendChild(button) 
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
  document.querySelector('.js-filters')
    .addEventListener('click', (event) => {
      const filter = event.target.id
      document.querySelector('.js-gallery').innerHTML = ''
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
  document.querySelector('.js-gallery').appendChild(figure)                                                  //Added the Title Element in the Figure Element                          //Added the element in the HTML section
}
const modalFigureCreation = (work) => {                   //Creating the Project Figure Element
  image = document.createElement('img')                    //Creating the Project Image Element                                      //Changing the Layout of the Title
  image.src = work.imageUrl
  button = document.createElement('button')
  button.innerHTML = ('value','<i class="fas fa-trash-can"></i>')
  button.setAttribute('class', 'js-trashButton')
  button.setAttribute('id', work.id)              //Creating the Button                                  //Image Element Source
  const figure = document.createElement('work')                               //Title Element Source
  figure.appendChild(button)
  figure.appendChild(image)
  figure.setAttribute('id', work.id)                                //Added the Image Element in the Figure Element
  document.querySelector('.js-modalGallery').appendChild(figure)
  button.addEventListener('click', (event) => {
  })                                                   //Added the Title Element in the Figure Element                          //Added the element in the HTML section
}
const onload = () => {                                     
  const allBtn = document.getElementById(0)
  allBtn.click()
  allBtn.focus()      //Selecting the "All" button
}
