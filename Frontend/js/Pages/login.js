import * as validation from "../Utils/validation.js";
import * as domUtils from "../Utils/dom.js";
import { login } from "../API/auth.api.js";
import { saveToken } from "../Auth/auth.js";

const signupModal = document.querySelector(".signup-modal");
const signupModalBtn = document.querySelector(".signup-modal__btn");

const viewPasswordButton = document.querySelector(".login-form__show-password-button");
const hidePasswordButton = document.querySelector(".login-form__hide-password-button");

const emailInput = document.querySelector(".login-form__user");
const passwordInput = document.querySelector(".login-form__password");

const formError = document.querySelector(".form_error-text");
const loginButton = document.querySelector(".login-form__button");

if (document.referrer.includes("signup")) signupModal.showModal();

signupModalBtn.addEventListener("click", ()=> { signupModal.close(); })

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

loginButton.addEventListener("click", async (e) => {

    e.preventDefault();

    const email = emailInput.value;
    const password = passwordInput.value;

    const emailValidation = validation.validateEmail(email);
    const passwordValidation = validation.validatePassword(password);

    if (!emailValidation[0]) {
        domUtils.showError(emailInput, emailValidation[1]);
        domUtils.clearError(formError);
    } else {
        domUtils.clearError(emailInput);
    }

    if (!passwordValidation[0]) {
        domUtils.showError(passwordInput, passwordValidation[1]);
        domUtils.clearError(formError);
    } else {
        domUtils.clearError(passwordInput);
    }

    if (emailValidation[0] && passwordValidation[0]) {
        domUtils.clearError(formError);

        try {
            const response = await login(email, password);

            saveToken(response.token);
            
            console.log(response);
        } catch (error) {
            console.log("error: ", error);

            domUtils.showError(formError, error.message);
        }
    }
})