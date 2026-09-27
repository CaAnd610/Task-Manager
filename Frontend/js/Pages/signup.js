import * as dom from "../Utils/dom.js";
import * as validation from "../Utils/validation.js";
import { signup } from "../API/auth.api.js";

const usernameInput = document.querySelector(".signup-form__username");
const emailInput = document.querySelector(".signup-form__email");
const passwordInput = document.querySelector(".signup-form__password");
const confirmPasswordInput = document.querySelector(".signup-form__confirm-password");

const viewPasswordButtons = document.querySelectorAll(".signup-form__show-password-button");
const hidePasswordButtons = document.querySelectorAll(".signup-form__hide-password-button");

const signupButton = document.querySelector(".signup-form__button");
const errorElement = document.querySelector(".form__error-text");

viewPasswordButtons.forEach((btn) => {
    btn.addEventListener("click", () =>{
        btn.previousElementSibling.type = "text";

        btn.classList.add("hide");
        btn.nextElementSibling.classList.remove("hide");
    })
})

hidePasswordButtons.forEach((btn) => {
    btn.addEventListener("click", () =>{
        let previousElement = btn.previousElementSibling;

        previousElement.previousElementSibling.type = "password";

        btn.classList.add("hide");
        previousElement.classList.remove("hide");
    })
})

signupButton.addEventListener("click", async (e) => {
    e.preventDefault();

    const username = usernameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;
    const passwordConfirmation = confirmPasswordInput.value;

    const usernameValidation = validation.validateUsername(username);
    const emailValidation = validation.validateEmail(email);
    const passwordValidation = validation.validatePassword(password);

    if (!usernameValidation[0]) {
        dom.clearError(errorElement);
        dom.showError(errorElement, usernameValidation[1]);
        return;
    } else {
        dom.clearError(errorElement);
    }

    if (!emailValidation[0]) {
        dom.clearError(errorElement);
        dom.showError(errorElement, emailValidation[1]);
        return;
    } else {
        dom.clearError(errorElement);
    }

    if (!passwordValidation[0]) {
        dom.clearError(errorElement);
        dom.showError(errorElement, passwordValidation[1]);
        return;
    } else {
        dom.clearError(errorElement);
    }

    if (password === passwordConfirmation){
        dom.clearError(errorElement);
    } else {
        dom.clearError(errorElement);
        dom.showError(errorElement, "Las contraseñas no coinciden");
        return;
    }

    try {
        const response = await signup(username, email, password);

        console.log(response);
        window.location.href = "../index.html";
    } catch (error) {
        console.log(error.message);

        dom.showError(errorElement, error.message);
    }
});