const getWorksList = async () => {
    await fetch ("http://localhost:5678/api/works", {
        method: "GET",
        headers: {
        Accept: "application/json",
        },
    })
    .then(res => res.json())
    .then(data => {
        for( i=0; i < data.length; i++) {
            let image = document.createElement('img');
            image.src = `${data.imageUrl}`;
            image.alt = `${data.title}`;
            let sectionGallery = document.querySelector(".gallery");
            sectionGallery.appendChild(image);
        }
    })
}
    
getWorksList()



