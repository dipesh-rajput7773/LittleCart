import axios from 'axios';


const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000', 
  headers: {
    'Content-Type': 'application/json',
  },
//   timeout: 10000, // Timeout after 10 seconds
});


axiosInstance.interceptors.request.use(
  (config) => {

    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
   
    return response;
  },
  (error) => {
    
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access (e.g., redirect to login)
      console.log('Unauthorized, please log in again');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
