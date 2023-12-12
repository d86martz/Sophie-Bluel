document.getElementById('js-edit').addEventListener('click', (event) => {
  event.preventDefault();
  openModal(event)
})
const openModal = (event) => {
  modal = document.getElementById('js-modal');
  modal.style.display = null;
  modal.addEventListener('click', closeModal);
  document.getElementById('js-modalClose').addEventListener('click', closeModal);
  document
    .querySelector('.js-modalStop')
    .addEventListener('click', stopPropagation);
  document.getElementById('js-mainContainer').classList.add('js-modalOpen')
  document.getElementById('js-addNewWork').addEventListener('click', (event) => {
    event.preventDefault()
    newWorkModal()
  document.getElementById('js-modalReturn').addEventListener('click', (event) => {
    event.preventDefault()
    returnModal()
    })
  })
}
const newWorkModal = () => {
  document.getElementById('js-modalReturn').style.visibility = 'visible'
  document.getElementById('js-modalReturn').addEventListener('click', returnModal);
  document.getElementById('js-deleteModal').style.display = 'none';
  document.getElementById('js-addModal').style.display = null;
  document.getElementById('workCategory')
  document.getElementById('js-validateNewWork').addEventListener('click', (event) => {
    event.preventDefault()
    setNewWork()
  })
}
const returnModal = () => {
  document.getElementById('js-modalReturn').style.visibility = 'hidden'
  document.getElementById('js-deleteModal').style.display = null;
  document.getElementById('js-addModal').style.display = 'none';
}
const closeModal = (event) => {
  if (modal === null) return;
  event.preventDefault();
  modal.style.display = 'none';
  modal.removeEventListener('click', closeModal);
  document
    .getElementById('js-modalClose')
    .removeEventListener('click', closeModal);
  document
    .querySelector('.js-modalStop')
    .removeEventListener('click', stopPropagation);
  modal = null;
  document.getElementById('js-mainContainer').classList.remove('js-modalOpen');
};
const stopPropagation = (event) => {
  event.stopPropagation()
}
const deleteWork = async (id) => {
  const token = sessionStorage.getItem('token')
  return await fetch(`${apiUrl}works/${id}`, {
    method: 'DELETE',
    headers: { 
      'Authorization': `Bearer ${token}`
    }
  })
  .then((res) => res.json())
  .catch((error) => {
    console.log(error);
  });
};
const setNewWork = () => {
  const formData = new FormData();
  formData.append("imageUrl", document.getElementById("newWorkPicture").files);
  formData.append("title", document.getElementById("newWorkTitle").value);
  formData.append("category", document.getElementById("newWorkCategory").value);
  postNewWork(formData)
}
const postNewWork = async (formData) => {
  const token = sessionStorage.getItem('token')
  return await fetch(`${apiUrl}works`, {
    method: "POST",
    body: multipart/form-data,
    headers: { 
        "Authorization": `Bearer ${token}`,
    }
  })
  .then((res) => res.json())
  .catch((error) => {
    console.log(error);
  });
};

    
