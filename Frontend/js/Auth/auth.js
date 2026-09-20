
const saveToken = (token) => {
    localStorage.setItem("token", token);
}

const getToken = () => {
    return localStorage.getItem("token");
}

const deleteToken = ()=> {
    localStorage.removeItem("token");
}

export { saveToken, getToken, deleteToken };