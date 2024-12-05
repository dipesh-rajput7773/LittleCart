import axiosInstance from "./axiosInstance";

export const CreateAdmin = (payload) => {
    return axiosInstance
      .post('/user/register', payload) 
      .then((response) => {
        console.log('Admin created successfully:', response.data);
        return response.data; 
      })
      .catch((error) => {
        console.error('There was an error creating the admin:', error);
        throw error; 
      });
  };


export const LoginAdmin = (payload) => {
    return axiosInstance
      .post('/user/login', payload) 
      .then((response) => {
        console.log('Admin Login successfully:', response.data);
        return response.data; 
      })
      .catch((error) => {
        console.error('There was an error Login the admin:', error);
        throw error; 
      });
  };