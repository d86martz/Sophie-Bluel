const body = document.querySelector("body")
// document.querySelector(".js-editor").style.display = null
const editorBtn = document.querySelector(".js-editor")
editorBtn.addEventListener("click", (e) => {
    openModal(e)  
})

const openModal = (e) => {
    e.preventDefault()
    modal = document.querySelector(".js-modal")
    modal.style.display = null
    modal.addEventListener("click", closeModal)
    modal.querySelector(".js-modal-close").addEventListener("click", closeModal)
    modal.querySelector(".js-modal-stop").addEventListener("click", stopPropagation)
    body.classList.add("modal-open")
}
    
const closeModal = (e) => {
    if (modal === null) return
    e.preventDefault()
    modal.style.display = "none"
    modal.removeEventListener("click", closeModal)
    modal.querySelector(".js-modal-close").removeEventListener("click", closeModal)
    modal.querySelector(".js-modal-stop").removeEventListener("click", stopPropagation)
    modal = null
    body.classList.remove("modal-open") 
}

const stopPropagation = (e) => {
    e.stopPropagation()
  }
