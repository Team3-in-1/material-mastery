import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import Router from 'next/router';

import { customFetch } from '../helpers/customFetch';
import { stringify } from 'querystring';

// const { publicRuntimeConfig } = getConfig();

const  publicRuntimeConfig = {
      apiUrl:
        process.env.NODE_ENV === "development"
          ? "https://reqres.in/api" // development api
          : "https://reqres.in/api", // production api
    };
const baseUrl = `${publicRuntimeConfig.apiUrl}`;
const userSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('user') || 'null'));

export const userService = {
    user: userSubject.asObservable(),
    get userValue () { return userSubject.value },
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    delete: _delete
};

function login(formData: FormData) {
    console.log("==> Login data:" + JSON.stringify(formData));
    return customFetch.post(`${baseUrl}/login`, formData)
        .then(user => {
            userSubject.next(user);
            localStorage.setItem('user', JSON.stringify(user));

            return user;
        });
}

function logout() {
    localStorage.removeItem('user');
    userSubject.next(null);
    Router.push('/account/login');
}

function register(formData: any) {
    return customFetch.post(`${baseUrl}/register`, formData);
}

function getAll() {
    return customFetch.get(baseUrl);
}

function getById(id: String) {
    return customFetch.get(`${baseUrl}/${id}`);
}

function update(id: String, params: String) {
    return customFetch.put(`${baseUrl}/${id}`, params)
        .then(x => {
            
            if (id === userSubject.value.id) {
                
                const user = { ...userSubject.value, ...params };
                localStorage.setItem('user', JSON.stringify(user));

                
                userSubject.next(user);
            }
            return x;
        });
}


function _delete(id: String) {
    return customFetch.delete(`${baseUrl}/${id}`);
}
