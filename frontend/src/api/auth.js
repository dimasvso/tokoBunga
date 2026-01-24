import api from "./axios";


export const login = async (data) => {
    const res = await api.post("api/token/",data);
    return res.data;
};


export const register = async (data) => {
    const res = await api.post("account/register/",data);
    return res.data;
};

export const GetMe = async () => {
    const res = await api.get("account/me/");
    return res.data;
}

export const updateUserApi = async (data) =>{
    const formData = new FormData()

    Object.keys(data).forEach((key) =>{
        if (data[key] !== null && data[key] !== ""){
            formData.append(key, data[key]);
        }
    })
    
    const res = await api.put("account/updateuser/", formData, );
    return res.data;
}

export const updatePasswordApi = async (data) => {
    const res = await api.put("account/updatepassword/", data)
    return res.data;
}