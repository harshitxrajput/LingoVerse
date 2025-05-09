import { axiosInstance } from "./axios";

export const getAuthUser = async() => {
    try{
        const res = await axiosInstance.get('/auth/profile');
        return res.data;
    }
    catch(error){
        console.log("Error in getAuthUser: ", error.message);
        return null;
    }
}

export const signup = async(signupData) => {
    const response = await axiosInstance.post("/auth/signup", signupData);
    return response.data;
}

export const login = async(loginData) => {
    const response = await axiosInstance.post("/auth/login", loginData);
    return response.data;
}

export const completeOnBoarding = async(userData) => {
    const response = await axiosInstance.post("/auth/onboarding", userData);
    return response.data;
}

export const logout = async() => {
    const response = await axiosInstance.post("/auth/logout");
    return response.data;
}