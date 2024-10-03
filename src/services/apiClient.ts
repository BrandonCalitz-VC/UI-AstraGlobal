import axios from 'axios';

const axiosClient = axios.create({
    baseURL: `https://localhost:3001/api`,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });

axiosClient.interceptors.request.use(
    function (config) {
      config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
      return config;
    }, 
    function (error) {
      return Promise.reject(error);
    }
);
  
axiosClient.interceptors.response.use(
    function (response) {
      return response;
    }, 
    function (error) {
      const res = error.response;
      if (res.status == 401) {
        window.location.href = "/login";
      }
      console.error("Looks like there was a problem. Status Code:" + res.status);
      return Promise.reject(error);
    }
);


export default axiosClient;
