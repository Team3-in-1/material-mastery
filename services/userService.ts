import { BehaviorSubject } from 'rxjs';
import axios from 'axios';
import { constant } from '@/utils/constant';



const login = async (request: FormData) => {
    await axios.post(`${constant.BASE_URL}/signIn`, request, {
        headers: {
            'x-api-key': constant.API_KEY
        }
    })
    .then(res => {
        localStorage.setItem('user', JSON.stringify(res.data.metadata))
        return res.data
    })
    .catch(error => {throw new Error(error.response.data.message)})
}

// const logout = () => {
//     //const router = useRouter();
//     const [isLogin, setIsLogin] = useLogin();
//     console.log('1')
//     console.log(setIsLogin);
//     // setIsLogin(isLogin);
//     // localStorage.removeItem('user');
//     //router.replace('/sign-in');
// }

// function register(formData: any) {
//     return customFetch.post(`${baseUrl}/register`, formData);
// }

// function getAll() {
//     return customFetch.get(baseUrl);
// }

// function getById(id: String) {
//     return customFetch.get(`${baseUrl}/${id}`);
// }

// function update(id: String, params: String) {
//     return customFetch.put(`${baseUrl}/${id}`, params)
//         .then(x => {

//             if (id === userSubject.value.id) {

//                 const user = { ...userSubject.value, ...params };
//                 localStorage.setItem('user', JSON.stringify(user));


//                 userSubject.next(user);
//             }
//             return x;
//         });
// }


// function _delete(id: String) {
//     return customFetch.delete(`${baseUrl}/${id}`);
// }

export const userService = {
    login,
    // logout,
    // register,
    // getAll,
    // getById,
    // update,
    // delete: _delete
};
