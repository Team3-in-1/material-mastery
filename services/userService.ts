import axios from 'axios';
import { constant } from '@/utils/constant';
import { UserAttributesRequest, UserRequest } from '@/utils/request';
import queryClient from '@/helpers/client';



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

const register =async (formData: any) => {

    //  name: (value) => checkNameFormat(value),
    //   phone: (value) => checkPhoneFormat(value),
    //   email: (value) => checkEmailFormat(value),
    //   password: (value) => checkPasswordFormat(value),

    const user: UserRequest = {
        username: formData.name,
        password: formData.password,
        email: formData.email,
        display_name: formData.name,
        phone: formData.phone,
        roles: ['customer'],
        user_attributes: {address: 'Thu duc'},
    }

    await axios.post(`${constant.BASE_URL}/signUp`, user, {
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

export const userService = {
    login,
    register,
 
};
