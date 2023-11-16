//Récupération des projets sur l'API
async function apiData () {
     await fetch ("http://localhost:5678/api/works", {
        method: "GET",
        headers: {
        Accept: "application/json",
        }
    })

    .then((res) => res.json())
    .then((data) => {
        worksList = data;
    })
 
    //Création des catégories
    
setWorks = new Set(worksList);
const setIterator = setWorks.values()
for (let i = 0; i < worksList.length; i++) {
  let name = setIterator.next().value.category.name;
  let btnCat = document.createElement("button");
  btnCat.textContent = name;
  document.querySelector(".filters").appendChild(btnCat)  
}

const buttons = document.querySelectorAll(".filters");
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", (e) => {
    console.log("Filter selected :", e.target.id);
  });
}

const filterWorks = (i) => {
  let work = document.createElement("work");
  let image = document.createElement("img");
  let title = document.createElement("p");
  title.style.marginTop = "0.5em";
  image.src = worksList[i].imageUrl;
  title.textContent = worksList[i].title;
  sectionGallery = document.querySelector(".gallery");
  work.appendChild(image);
  work.appendChild(title);
  sectionGallery.appendChild(work);
};

for (let i = 0; i < worksList.length; i++) {
  filterWorks(i);
}
}
apiData()