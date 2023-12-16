import axios from "axios";
import { Product } from "@/utils/response";
import { constant } from "@/utils/constant";

const getAllProducts = async (): Promise<Product[]> => {
    return await axios.get(`${constant.BASE_URL}/product`, {
        headers: {
            'x-api-key': constant.API_KEY
        }
    })
    .then(res => res.data.metadata)
    .catch(error => {throw new Error(error.response.data.message)})
}

const getProductById = async (id: string): Promise<Product> => {
    return await axios.get(`${constant.BASE_URL}/product/${id}`, {
        headers: {
            'x-api-key': constant.API_KEY
        }
    })
    .then(res => res.data.metadata)
    .catch(error => {throw new Error(error.response.data.message)})
}

const getAllProductsByCategory = async (id: string, limit = 5, page = 1, sortType = 'product_price', isAscending = true) : Promise<Product[]> => {
    return await axios.get(`${constant.BASE_URL}/product/category/${id}?limit=${limit}&page=${page}&sorted[]=${sortType}&isAscending=${isAscending}`, {
        headers: {
            'x-api-key': constant.API_KEY
        }
    })
    .then(res => res.data.metadata)
    .catch(error => {throw new Error(error.response.data.message)})
}

const search = async(keyWord: string = '') => {
    return await axios.get(`${constant.BASE_URL}/product/search?keySearch=${keyWord}`, 
    { 
        headers: {
            'x-api-key': constant.API_KEY
        }
    })
    .then((res)=>(res.data.metadata))
    .catch((err)=>{console.log(`err: ${err}`);})
}

export const productService = {
    getAllProducts,
    getProductById,
    getAllProductsByCategory,
    search,
}