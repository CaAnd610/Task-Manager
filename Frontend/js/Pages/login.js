import * as utils from "../Utils/validation.js";

const passwordInput = document.querySelector(".login-form__password");
const viewPasswordButton = document.querySelector(".login-form__show-password-button");
const hidePasswordButton = document.querySelector(".login-form__hide-password-button");

const sendButton = document.querySelector(".login-form__button");
const emailInput = document.querySelector(".login-form__user");

viewPasswordButton.addEventListener("click", () =>{
    passwordInput.type = "text";

    viewPasswordButton.classList.add("hide");
    hidePasswordButton.classList.remove("hide");
})

hidePasswordButton.addEventListener("click", () => {
    passwordInput.type = "password";

    hidePasswordButton.classList.add("hide");
    viewPasswordButton.classList.remove("hide");
});

sendButton.addEventListener("click", (e) => {
    e.preventDefault();

    const email = emailInput.value;
    const password = passwordInput.value;

    const isEmailValid = utils.validateEmail(email);
    const isPasswordValid = utils.validatePassword(password);

    if (!isEmailValid) {
        utils.showError(emailInput, "Correo electrónico inválido");
    } else {
        utils.clearError(emailInput);
        console.log(email, password);
    }

    if (!isPasswordValid) {
        utils.showError(passwordInput, "La contraseña debe tener al menos 8 caracteres");
    } else {
        utils.clearError(passwordInput);
    }

})