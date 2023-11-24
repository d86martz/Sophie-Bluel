    //Récupération des données de l'API.
const worksData = [];
const worksCategory = new Set()
const apiData = async () => {
  await fetch ("http://localhost:5678/api/works/")
  .then((res) => res.json())
  .then((data) => { console.log(data);
    data.forEach(i => {
    worksData.push(i)
    worksCategory.add(i.category.name)
  })})


    //Création des boutons filtre

const sectionFilters = document.querySelector(".filters");  
const filterButton = (name) => {
  button = document.createElement("button");
  button.textContent = (name);
  sectionFilters.appendChild(button)
}
filterButton("Tous");
worksCategory.forEach(i => {
  filterButton(i)
})

    //Création de la figure.

sectionGallery = document.querySelector(".gallery");
const figureCreation = () => {
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
  worksData.forEach((i) => {
    figureCreation(i)
  })
}
    //Préchargement de toutes les figures au chargement de la page.
window.onload = () => {
  figureForAll()    
}

    //Chargement des figures selon le filtre.
sectionFilters.addEventListener("click", (e) => {
  let selection = e.target.textContent
  console.log(selection)
  if (worksCategory.has(selection)) {
    sectionGallery.remove();
    for (i = 0; i < worksData.length; i++) {
      if (i.category.name.value === selection)
        figureCreation(i)
      }
    }  
  else { 
    figureForAll()
  }
})

}
apiData()