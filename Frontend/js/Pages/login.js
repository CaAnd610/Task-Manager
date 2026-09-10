import * as validation from "../Utils/validation.js";
import * as domUtils from "../Utils/dom.js";

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

    const emailValidation = validation.validateEmail(email);
    const passwordValidation = validation.validatePassword(password);

    if (!emailValidation[0]) {
        domUtils.showError(emailInput, emailValidation[1]);
    } else {
        domUtils.clearError(emailInput);
        console.log(email, password);
    }

    if (!passwordValidation[0]) {
        domUtils.showError(passwordInput, passwordValidation[1]);
    } else {
        domUtils.clearError(passwordInput);
    }


})