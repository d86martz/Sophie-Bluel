const userConnected = () => {
  const token = sessionStorage.getItem("token")
  if(token !== null) {
    document.querySelector(".js-edit-mode").style.display = null;
    document.querySelector(".js-edit").style.display = null;
    document.querySelector(".js-filters").style.visibility = "hidden";
  }
}
userConnected() 

const apiUrl = "http://localhost:5678/api/"                    //Url of API

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
  const category = Array.from(setApiCategory.values())
  category.splice(0,0,{id:0, name:"Tous"})
  console.log("Category : ", category)
  getFilters(category)
}
apiCategory()

const getFilters = (category) => {
  category.forEach(value => {
    filterButton(value.name)
  })
}

const sectionFilters = document.querySelector(".js-filters")   
const filterButton = (category) => {
  button = document.createElement("button")                     //Creating the Button
  button.setAttribute("id", category)                           //Assigning an Id
  button.textContent = (category)                               //Visible button text
  sectionFilters.appendChild(button) 
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
  console.log("Works : ", works)
  filterGallery(works, "Tous")
  addModalGallery(works)
  addGallery(works)
  onload()
} 
getWorks()

const modalGallery = document.querySelector(".js-modalGallery")
const addModalGallery = (works) => {
  works.forEach(work => {
      modalGallery.appendChild(figureCreation(work))
  })
}

const sectionGallery = document.querySelector(".js-gallery")
const addGallery = (works) => {
  sectionFilters.addEventListener("click", (event) => {
    const filter = event.target.textContent  
    sectionGallery.innerHTML = ""
    filterGallery(works, filter) 
  })
}

const filterGallery = (works, filter) => {
  works.forEach(work => {
    if(filter === work.category.name) {
      sectionGallery.appendChild(figureCreation(work))      
    }else {
      if(filter==="Tous") {
        sectionGallery.appendChild(figureCreation(work))
      }    
    }
  })
}

const figureCreation = (work) => {                    //Creating the Project Figure Element
  image = document.createElement("img")                       //Creating the Project Image Element
  title = document.createElement("p")                         //Creating the Project Title Element
  title.style.marginTop = "0.5em"                             //Changing the Layout of the Title
  image.src = work.imageUrl                                   //Image Element Source
  title.textContent = work.title
  const figure = document.createElement("work")                               //Title Element Source
  figure.appendChild(image)                                   //Added the Image Element in the Figure Element
  figure.appendChild(title)
  return figure                                                  //Added the Title Element in the Figure Element                          //Added the element in the HTML section
}

const onload = () => {                                     
  const allBtn = document.getElementById("Tous")             //Selecting the "All" button
  allBtn.click()                                             //Activating the button
  allBtn.focus()
}




