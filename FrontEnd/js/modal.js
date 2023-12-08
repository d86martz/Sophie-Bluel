const overlay = document.querySelector(".js-overlay");

const editorBtn = document.querySelector(".js-edit");
editorBtn.addEventListener("click", (e) => {
  openModal(e);
});

const openModal = (e) => {
  e.preventDefault();
  modal = document.querySelector(".js-modal");
  modal.style.display = null;
  modal.addEventListener("click", closeModal);
  modal.querySelector(".js-modal-close").addEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-stop")
    .addEventListener("click", stopPropagation);
  overlay.classList.add("js-modal-open");
};

const closeModal = (e) => {
  if (modal === null) return;
  e.preventDefault();
  modal.style.display = "none";
  modal.removeEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-close")
    .removeEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-stop")
    .removeEventListener("click", stopPropagation);
  modal = null;
  overlay.classList.remove("js-modal-open");
};

const stopPropagation = (e) => {
  e.stopPropagation();
};

const Modalfigure = document.querySelector(".js-modalGallery");
Modalfigure.addEventListener("click", (event) => {
  const id = event.target.parentElement.id
  deleteWork(id)
});

const deleteWork = async (id) => {
  const token = localStorage.getItem("token")
  return await fetch(`${apiUrl}works/${id}`, {
    method: "DELETE",
    headers: { 
      "Authorization": `Bearer ${token}`,
    }
  })
  .then((res) => res.json())
  .catch((error) => {
    console.log(error);
  });
};
















// const sendProjectBtn = document.querySelector(".js-modal-wrapper input");
// sendProjectBtn.addEventListener("submit", (event) => {
//   event.preventDefault();
//   postApiProject();
// });

// const formData = new FormData();
//     formData.append("image", document.querySelector("#file.img").files[0]);
//     formData.append("title", document.querySelector("#title.img").value);
//     formData.append("category", document.querySelector("#category").value);
//     console.log(formData);
// const title=document.getElementById("title").value;
// const categorie=document.getElementById("category").value;
// const imageElement = document.createElement("img");
// imageElement.src = document.querySelector(".js-modalGallery").src;
// imageElement.alt = title;
// const titleElement = document.createElement("p");
// titleElement.innerText = title;
// const figure = document.createElement("work");
// figure.setAttribute("id", 12);
// figure.classList.add("category.id"+categorie,"work");
// figure.appendChild(imageElement);
// figure.appendChild(titleElement);
// sectionGallery.appendChild(figure);


// const postApiProject = async () => {
//   return await fetch(`${apiUrl}works`, {
//     method: "POST",
//     body: formData,
//     headers: { 
//         "Authorization": "Bearer token",
//         "Content-Type": "multipart/form-data" },
//   })
    
//   .then((res) => res.json())
//     .catch((error) => {
//       console.log(error);
//     });
// };

    
