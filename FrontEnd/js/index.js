//Récupération des projets sur l'API
const apiData = async () => {
  await fetch ("http://localhost:5678/api/works", {
    method: "GET",
    headers: {
    Accept: "application/json",
    }
  })

  .then((res) => res.json())
  .then((data) => {
    worksList = data;
    console.log("List of project :",data)
  });

    //Création des filtres

//Création du Set des projets
setWorksList = new Set(worksList);

//Renvoie des valeurs du Set
const worksListIter = setWorksList.values();

//Récupération des noms de filtre à partir des valeurs récupérées
const catWorks = new Set();
catWorks.add("Tous")
for (let i = 0; i < worksList.length; i++) {
  let catName = worksListIter.next().value.category.name;
  catWorks.add(catName)
};
console.log("Category of project :", catWorks)
const catWorksIter = catWorks.values();

//Création des boutons de filtre des projets
for (let i = 0; i < catWorks.size; i++) {
  let btnCat = document.createElement("button");
  btnCat.textContent = catWorksIter.next().value;
  document.querySelector(".filters").appendChild(btnCat)
};

    //Création des listes de projet par filtres

//Création de la base des figures de projet
const creaWork = (i) => {
  let figure = document.createElement("work");
  let image = document.createElement("img");
  let title = document.createElement("p");
  title.style.marginTop = "0.5em";
  image.src = worksList[i].imageUrl;
  title.textContent = worksList[i].title;
  sectionGallery = document.querySelector(".gallery");
  figure.appendChild(image);
  figure.appendChild(title);
  sectionGallery.appendChild(figure);
};

//Incrémentation des listes par filtres

const buttons = document.querySelectorAll(".filters");
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", (e) => {
    console.log("Filter selected :", e.target.textContent);
    for (let i = 0; i < worksList.length; i++) {
      if (catName===e.target.textContent){ 
        creaWork(i)
      }
      else { 
        for (let i = 0; i < worksList.length; i++) {
        creaWork(i)
        }
      }
    }
  })
}

}
apiData()