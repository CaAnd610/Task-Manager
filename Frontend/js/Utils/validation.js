
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