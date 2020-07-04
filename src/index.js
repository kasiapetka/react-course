import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios'

axios.defaults.baseURL ='https://jsonplaceholder.typicode.com';

axios.interceptors.request.use(request=>{
    console.log(request);
    return request;
},error => {
    //this works if we cant make a request
    console.log('request error');
    return Promise.reject(error);
});

axios.interceptors.response.use(response=>{
    console.log(response);
    return response;
},error =>{
    //if the response has errors
    console.log('response error');
    return Promise.reject(error);
});

ReactDOM.render(<App appTitle="Person Manager"/>, document.getElementById('root'));
registerServiceWorker();
