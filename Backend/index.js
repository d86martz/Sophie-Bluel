const getWorksList = async () => {
    await fetch ("http://localhost:5678/api/works", {
        method: "GET",
        headers: {
        Accept: "application/json"
        }
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
        document.addEventListener('filters', () => {
            let allButton = document.createElement('button');
            button.type = 'button';
            button.innerHTML = 'Tous';
            button.onclick = function () {

            };
            let sectionFilter = document.querySelector(".gallery");
            sectionFilter.appendChild(allButton);
        })
        
        for(let i = 0; i < data.length; i++) {
            let work = document.createElement('work');
            let image = document.createElement('img');
            let title = document.createElement('p');
            title.style.marginTop = "0.5em";
            image.src = `${data[i].imageUrl}`;
            title.textContent = `${data[i].title}`;
            let sectionGallery = document.querySelector(".gallery");
            work.appendChild(image);
            work.appendChild(title);
            sectionGallery.appendChild(work);
        }
    })        
}  
  
getWorksList()
