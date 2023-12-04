   
const apiUrl = "http://localhost:5678/api/"                    //Url of API

              //Category

const getApiCategory = async () => {
  return await fetch (`${apiUrl}categories`)                   //Calling the API for category receipt
    .then((res) => res.json())                                 
};
const apiCategory = async () => {
  let setApiCategory = new Set(await getApiCategory());
  const category = Array.from(setApiCategory.values());
  category.splice(0,0,{id:0, name:"Tous"});
  console.log("Category : ", category)
  getFilters(category)
};
apiCategory();

const getFilters = (category) => {
  category.forEach(value => {
    filterButton(value.name)
  })
};

const sectionFilters = document.querySelector(".filters");    
const filterButton = (category) => {
  button = document.createElement("button");                  //Creating the Button
  button.setAttribute("id", category);                        //Assigning an Id
  button.textContent = (category);                            //Visible button text
  sectionFilters.appendChild(button) 
 };
              //Works

const getApiWorks = async () => {
  return await fetch (`${apiUrl}works`)                       //Calling the API for works receipt
    .then((res) => res.json())   
};

const getWorks = async () => {
  const setWorks = new Set (await getApiWorks());
  const works = Array.from(setWorks.values());
  console.log("Works : ", works)
  onload(works)
  getGallery(works)
  fullGallery(works)
}
getWorks()

const onload = () => {                                     
  const allBtn = document.getElementById("Tous");             //Selecting the "All" button
  allBtn.click();                                             //Activating the button
  allBtn.focus();
}
const fullGallery = (works) => {
  works.forEach(work => {
    figureCreation(work)
  })
}

const sectionGallery = document.querySelector(".gallery");
const getGallery = (works) => {
  sectionFilters.addEventListener("click", (event) => {
    const filter = event.target.textContent;
    sectionGallery.innerHTML = "";
    if (filter === "Tous"){
      fullGallery(works)     
    }
    else {
      works.forEach(work => {
        if(filter === work.category.name)
          figureCreation(work)
      })
    }  
  })   
}

const figureCreation = (work) => {
  figure = document.createElement("work");                     //Creating the Project Figure Element
  image = document.createElement("img");                       //Creating the Project Image Element
  title = document.createElement("p");                         //Creating the Project Title Element
  title.style.marginTop = "0.5em";                             //Changing the Layout of the Title
  image.src = work.imageUrl;                                   //Image Element Source
  title.textContent = work.title;                              //Title Element Source
  figure.appendChild(image);                                   //Added the Image Element in the Figure Element
  figure.appendChild(title);                                   //Added the Title Element in the Figure Element
  sectionGallery.appendChild(figure)                           //Added the element in the HTML section
};



