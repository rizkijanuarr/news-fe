//import axios
import axios from 'axios'

//import js cookie
import Cookies from 'js-cookie';

const Api = axios.create({
    
    //set endpoint API
    baseURL: 'http://localhost:8081/',

    //set header axios
    headers: {
        "Content-Type": "application/json",
    }
});

// Add a request interceptor
Api.interceptors.request.use(function (config) {
    // Get token from cookies
    const token = Cookies.get('token');
    
    // If token exists, add it to headers
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
        console.log('Token being sent:', token);
        console.log('Request headers:', config.headers);
    } else {
        console.log('No token found in cookies');
    }

    if (!config.headers['Content-Type']) {
        config.headers['Content-Type'] = 'application/json';
    }
    
    return config;
}, function (error) {
    return Promise.reject(error);
});

//handle unathenticated
Api.interceptors.response.use(function (response) {

    //return response
    return response;
}, ((error) => {
    console.log('Response error:', error.response);
    
    //check if response unauthenticated
    if (401 === error.response.status) {

        //remove token
        Cookies.remove('token');

        //remove user
        Cookies.remove('user');

        //redirect "/"
        window.location = '/';
        
    } else if(403 === error.response.status) {
    
        //redirect "/forbidden"
        window.location = '/forbidden';

    }else {

        //reject promise error
        return Promise.reject(error);
    }
}));


export default Api