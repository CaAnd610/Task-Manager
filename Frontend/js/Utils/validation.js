
export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(email);
};

export const validatePassword = (password) => {
    
    return password.length >= 8;
}

export const showError = (input, message) => {
    const container = input.parentElement;

    if (container.querySelector(".input-error")){
        return;
    }

    const error = document.createElement("span");

    error.classList.add("input-error");
    error.textContent = message;

    container.appendChild(error);
}

export const clearError = (input) => {
    const error = input.parentElement.querySelector(".input-error");

    if (error) {
        error.remove();
    }
}
