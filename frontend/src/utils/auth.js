export const setAuth = (token) => {
localStorage.setItem("access", token.access);
localStorage.setItem("refresh", token.refresh);
};

export const getAccessToken = () =>{
    return localStorage.getItem("access");
}

export const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh"); 
}


