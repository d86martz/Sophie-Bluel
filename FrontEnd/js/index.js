    //Récupération des données de l'API.
const worksData = []
const worksCategory = new Set ()
fetch ("http://localhost:5678/api/works/")
  .then((res) => res.json())
  .then(data => data.forEach((value) => {
    value.imageUrl, value.title, value.category.name
    worksData.push(value)
    worksCategory.add(value.category.name)
  }))
  .then(console.log(worksData))
    
    //Création des boutons filtre.

//const worksCategoryIter = worksCategory.values()                   soit       creation d'un tableau itere pour utiliser les valeurs
//console.log(worksCategoryIter.next().value)

//const category = Array.from(worksCategoryIter)                     
//console.log(category)                                              soit       tableau depuis itere pour utiliser les valeurs

sectionFilters = document.querySelector(".filters");  
const filterButton = (name) => {
  button = document.createElement("button");
  button.textContent = (name);
  sectionFilters.appendChild(button)
}
filterButton("Tous");

    //Création de la figure.
sectionGallery = document.querySelector(".gallery");
const figureCreation = (i) => {
  figure = document.createElement("work");
  image = document.createElement("img");
  title = document.createElement("p");
  title.style.marginTop = "0.5em";
  image.src = worksData[i].imageUrl;
  title.textContent = worksData[i].title;                                 
  figure.appendChild(image);
  figure.appendChild(title);
  sectionGallery.appendChild(figure)
}

    //Fonction pour Création des figures de tous les projets à la fois.
const figureForAll = () => {
  sectionGallery.remove();
  worksData.forEach((i) => figureCreation(i))
}

    //Préchargement de toutes les figures au chargement de la page.
window.onload = () => {
  figureForAll()    
}

    //Chargement des figures selon le filtre.
sectionFilters.addEventListener("click", (e) => {
  let selection = e.target.textContent
  console.log(selection)
  if (worksCategory.has(selection) = true) {
    sectionGallery.remove();
    for (i = 0; i < worksData.length; i++) {
      if (selection = worksCategory)
        figureCreation(i)
      }
    }  
  else { 
    figureForAll()
  }
})



