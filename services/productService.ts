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



export const productService = {
    getAllProducts
}