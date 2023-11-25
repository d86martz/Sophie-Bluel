const worksData = [];             //Creating a table for receiving projects
const worksCategory = new Set()   //Creating a Set for Receiving Project Categories Without Duplicates

  //Retrieving API data

const getApiData = async () => { 
  await fetch ("http://localhost:5678/api/works/")                //Calling the API for data receipt
  .then((res) => res.json())                                      //Converting data to JSON format for processing
  .then((data) => { console.log("Projects on dataBase", data);    //Data Report
    data.forEach(element => {
    worksData.push(element);                                      //Data storage 
    worksCategory.add(element.category.name)                      //Data storage
  })})
  console.log("Categories of Project", worksCategory)

    //Creating Filter Buttons
  
const sectionFilters = document.querySelector(".filters");  //Path to HTML section 
const filterButton = (category) => {  
  button = document.createElement("button");                //Creating the Button
  button.setAttribute("id", category);                      //Assigning an Id
  button.textContent = (category);                          //Visible button text
  sectionFilters.appendChild(button)                        //Added button in HTML section
}
filterButton("Tous")
worksCategory.forEach(category => {                         //Creating Buttons for Category List Items
  filterButton(category)
});

    //Creating Project Figures

  sectionGallery = document.querySelector(".gallery");    //Path to HTML section
  const figureCreation = (element) => {
    figure = document.createElement("work");              //Creating the Project Figure Element
    image = document.createElement("img");                //Creating the Project Image Element
    title = document.createElement("p");                  //Creating the Project Title Element
    title.style.marginTop = "0.5em";                      //Changing the Layout of the Title
    image.src = element.imageUrl;                         //Image Element Source
    title.textContent = element.title;                    //Title Element Source
    figure.appendChild(image);                            //Added the Image Element in the Figure Element
    figure.appendChild(title);                            //Added the Title Element in the Figure Element
    sectionGallery.appendChild(figure)                    //Added the element in the HTML section
  };

    //Viewing Figures

sectionFilters.addEventListener("click", (event) => {             //Listen to filter selection buttons
  sectionGallery.innerHTML = "";                                  //Deletion of the present selection                 
  if (worksCategory.has(event.target.textContent)) {              //Comparison of the selection with the list of categories
    worksData.forEach(element => {
      if(element.category.name === event.target.textContent) {    //Creation of figures based on selection
        figureCreation(element)
      }
    })
  }    
  else {
    sectionGallery.innerHTML = ""; 
    worksData.forEach((element) => {    //Creation of figures if the selection is "All"
      figureCreation(element)           
    })
  }
})

//Page load selection

window.onload = () => {                                     
  let filterActived = document.getElementById("Tous");    //Selecting the "All" button
  filterActived.click();                                  //Activating the button
  filterActived.focus();
  sectionGallery.innerHTML = "";                                  //Activating the Pseudo-Class Focus of the Button
  worksData.forEach((element) => {                        //Creating Figures
    figureCreation(element)                               
  })
};   
}
getApiData()    //Launching the Data Recovery Feature 
