let modal = null
const focusableSelector = "button, a, input"
let focusables = []
let previouslyFocusedElement = null
const mainOverlay = document.querySelector(".main-container")
const editorBtn = document.querySelector(".editor")
editorBtn.addEventListener("click", (e) => {
    openModal(e)
})

const openModal = (e) => {
    e.preventDefault()
    mainOverlay.getElementsByClassName("overlay")
    modal = document.querySelector(".js-modal")
    focusables = Array.from(modal.querySelectorAll(focusableSelector))
    previouslyFocusedElement = document.querySelector(":focus")
    focusables[0].focus()
    modal.style.display = null
    modal.removeAttribute("aria-hidden")
    modal.setAttribute("aria-modal", "true")
    modal.addEventListener("click", closeModal)
    modal.querySelector(".js-modal-close").addEventListener("click", closeModal)
    modal.querySelector(".js-modal-stop").addEventListener("click", stopPropagation)
}

const closeModal = (e) => {
    if (modal === null) return
    if(previouslyFocusedElement !== null) previouslyFocusedElement.focus()
    e.preventDefault()
    modal.style.display = "none"
    modal.setAttribute("aria-hidden", "true")
    modal.removeAttribute("aria-modal")
    modal.removeEventListener("click", closeModal)
    modal.querySelector(".js-modal-close").removeEventListener("click", closeModal)
    modal.querySelector(".js-modal-stop").removeEventListener("click", stopPropagation)
    modal = null
}

const stopPropagation = (e) => {
    e.stopPropagation()
  }

const focusInModal = (e) => {
    e.preventDefault()
    let index = focusables.findIndex(f => f === modal.querySelector(":focus"))
    if (e.shiftKey === true) {
        index--
    }else {
        index++
    }
    if (index >= focusables.length) {
        index = 0
    }
    if (index < 0) {
        focusables.length - 1
    }
    focusables[index].focus()
}

window.addEventListener("keydown", (e) => {
if (e.key === "Escape" || e.key === "Esc") {
    closeModal(e)
}
if (e.key === "Tab" && modal !== null) {
    focusInModal(e)
}
})