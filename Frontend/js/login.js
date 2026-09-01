const passwordInput = document.querySelector(".login-form__password");
const viewPasswordButton = document.querySelector(".login-form__show-password-button");
const hidePasswordButton = document.querySelector(".login-form__hide-password-button");

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