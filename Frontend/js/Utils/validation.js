
export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
        return [false, "Correo electrónico requerido"];
    } else if (!emailRegex.test(email)) {
        return [false, "Correo electrónico inválido"];
    } else {
        return [true, ""];
    }
};

export const validatePassword = (password) => {
    if (!password) {
        return [false, "Contraseña requerida"];   
    } else if (password.length < 8) {
        return [false, "La contraseña debe tener al menos 8 caracteres"];
    } else {
        return [true, ""];
    }
}

export const validateUsername = (username) => {
    if (!username) {
        return [false, "Nombre de usuario requerido"];
    } else if (username.length < 5) {
        return [false, "El nombre de usuario debe tener mínimo 5 caracteres"];
    } else {
        return [true, ""];
    }
}