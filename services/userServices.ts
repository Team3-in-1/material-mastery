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
            // publish user to subscribers and store in local storage to stay logged in between page refreshes
            userSubject.next(user);
            localStorage.setItem('user', JSON.stringify(user));

            return user;
        });
}

function logout() {
    // remove user from local storage, publish null to user subscribers and redirect to login page
    localStorage.removeItem('user');
    userSubject.next(null);
    Router.push('/account/login');
}

function register(user: any) {
    return customFetch.post(`${baseUrl}/register`, user);
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
            // update stored user if the logged in user updated their own record
            if (id === userSubject.value.id) {
                // update local storage
                const user = { ...userSubject.value, ...params };
                localStorage.setItem('user', JSON.stringify(user));

                // publish updated user to subscribers
                userSubject.next(user);
            }
            return x;
        });
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id: String) {
    return customFetch.delete(`${baseUrl}/${id}`);
}
