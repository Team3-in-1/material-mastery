import axios from 'axios';
import { constant } from '@/utils/constant';
import { UserAttributesRequest, UserRequest } from '@/utils/request';
import queryClient from '@/helpers/client';
import { metadata } from '@/app/layout';
import { UserInterface } from '@/utils/response';



const login = async (request: FormData): Promise<any> => {
    return await axios.post(`${constant.BASE_URL}/signIn`, request, {
        headers: {
            'x-api-key': constant.API_KEY
        }
    })
    .then((res) => {
        if(!res.data.metadata.user._id || !res.data.metadata.user.roles || !res.data.metadata.tokenPair.accessToken){
            throw new Error('Đăng nhập thất bại.');
        }
        const data = {userId: res.data.metadata.user._id, roles: res.data.metadata.user.roles , accessToken:  res.data.metadata.tokenPair.accessToken}
        return data;
    })
    .catch((error) => {throw new Error(error.response.data.message)})
}


const register = async (formData: any): Promise<any> => {

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

    return await axios.post(`${constant.BASE_URL}/signUp`, user, {
        headers: {
            'x-api-key': constant.API_KEY
        }
    })
    .then(res => {
        if(!res.data.metadata.user._id || !res.data.metadata.user.roles || !res.data.metadata.tokenPair.accessToken){
            throw new Error('Đăng ký thất bại.');
        }
        const data = {userId: res.data.metadata.user._id, roles: res.data.metadata.user.roles , accessToken:  res.data.metadata.tokenPair.accessToken}
        return data;
    })
    .catch(error => {throw new Error(error.response.data.message)})
}



const getUserById = async (user: UserInterface) : Promise<any> => {
    return axios.get(`${constant.BASE_URL}/user/`, {headers: {
        'x-api-key': constant.API_KEY,
        'x-client-id': user.userId,
        'authorization': user.accessToken,}}).then((res)=>{return res.data.metadata;}).catch((err)=>{console.log(err);})
}

const updateUser = async(user_id: string, token:string, name: string, phone: string, address: string, avatar: string | null): Promise<any> => {
    return await axios.patch(`${constant.BASE_URL}/user/${user_id}`, {
        'display_name': name,
        'phone': phone,
        "user_attributes": {
            "address": address,
            "avatar": avatar,
        }
    }, {
        headers: {
            'x-api-key': constant.API_KEY,
            'x-client-id': user_id,
            'authorization': token,
        }

    }).then(res=>{
        console.log('res.data.metadata: ', res.data.metadata)
        return res.data.metadata}).catch((error)=>error)
}

const signOut = async (user: UserInterface) => {
    return await axios.post(`${constant.BASE_URL}/user/signOut`, {userId:user.userId, accessToken: user.accessToken}).then((res)=>{return res.data}).catch((err)=>{console.log(err)})
}



export const userService = {
    login,
    register,
    updateUser,
    getUserById,
    signOut,
};
