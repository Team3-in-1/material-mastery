import getConfig from 'next/config';

import { userService } from '../services/userServices';
// import { publicRuntimeConfig } from '../next.config.js';


  const  publicRuntimeConfig = {
      apiUrl:
        process.env.NODE_ENV === "development"
          ? "https://reqres.in/api" // development api
          : "https://reqres.in/api", // production api
    };
export const customFetch = {
    get,
    post,
    put,
    delete: _delete
};

function get(url: any) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(url)
    };
    return fetch(url, requestOptions).then(handleResponse);
}

function post(url: any, body: any) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeader(url) },
        
        body: JSON.stringify(body)
    };
    console.log(JSON.stringify(requestOptions));
    return fetch(url, requestOptions).then(handleResponse);
}


function put(url: any, body: any) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...authHeader(url) },
        body: JSON.stringify(body)
    };
    return fetch(url, requestOptions).then(handleResponse);    
}


function _delete(url: any) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader(url)
    };
    return fetch(url, requestOptions).then(handleResponse);
}



function authHeader(url: any): any {
    const user = userService.userValue;
    const isLoggedIn = user && user.token;
    const isApiUrl = url.startsWith(publicRuntimeConfig.apiUrl);
    if (isLoggedIn && isApiUrl) {
        return { Authorization: `Bearer ${user.token}` };
    } else {
        return {};
    }
}

function handleResponse(response: any) {
    return response.text().then((text: any) => {
        const data = text && JSON.parse(text);
        
        if (!response.ok) {
            if ([401, 403].includes(response.status) && userService.userValue) {
                userService.logout();
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}