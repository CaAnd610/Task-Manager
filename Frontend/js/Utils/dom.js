export const showError = (element, message) => {
    const container = element.parentElement;

    if (container.querySelector(".error")){
        return;
    }

    const error = document.createElement("span");

    error.classList.add("error");
    error.textContent = message;

    container.appendChild(error);
}

export const clearError = (element) => {
    const error = element.parentElement.querySelector(".error");

    if (error) {
        error.remove();
    }
}
