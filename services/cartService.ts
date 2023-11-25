import { CartInterface, Product } from "@/utils/response";
import axios from "axios";
import { constant } from '@/utils/constant';



class CartService {
    async getCart(id: string, token: string): Promise<CartInterface> {
        console.log('MM:::Getting user cart.')
        return await axios.get(`${constant.BASE_URL}/cart`, {
            headers: {
                'x-api-key': constant.API_KEY,
                'x-client-id': id,
                'authorization': token,

        }})
        .then(res=>res.data.metadata)
        .catch(error => {throw new Error(error.response.data.message)})
    }

}


export default new CartService();