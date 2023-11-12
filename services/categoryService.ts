import axios from 'axios';
import { constant } from '@/utils/constant';

const getAllCategories = async (token: String) => {
    return await axios.get(`${constant.BASE_URL}/category`, {
        headers: {
            'x-api-key': constant.API_KEY,
            'Authorization': `Bearer ${token}`
        }
    })
    .then(res => res.data.metadata )
    .catch(error => {throw new Error(error.response.data.message)})
}

export const categoryService = {
    getAllCategories
}