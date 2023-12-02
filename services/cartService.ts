import { CartInterface, Product, User } from "@/utils/response";
import axios from "axios";
import { constant } from '@/utils/constant';
import queryClient from "@/helpers/client";



class CartService {
    currentUser: any;
    
    constructor(currentUser: any){
        const userObject = typeof currentUser == 'string' ? JSON.parse(currentUser) : currentUser;
        this.currentUser = userObject;
    }
    async getCart(): Promise<CartInterface> {
        console.log('getting cart')
        return await axios.get(`${constant.BASE_URL}/cart`, {
            headers: {
                'x-api-key': constant.API_KEY,
                'x-client-id': this.currentUser.user._id,
                'authorization': this.currentUser.tokenPair.accessToken,

        }})
        .then(res=> res.data.metadata)
        .catch(error => {throw new Error(error.response.data.message)})
    }

    async addProduct(productId: string, quantity: number | string): Promise<any>{
        console.log('MM:::Add product to cart');
        return await axios.post(`${constant.BASE_URL}/cart`, {
            'productId': productId,
            'quantity': quantity,
        }, {headers: {
            'x-api-key': constant.API_KEY,
            'x-client-id': this.currentUser.user._id,
            'authorization': this.currentUser.tokenPair.accessToken,
        }}).then().catch()
    }

    async deleteProduct(productId: string): Promise<any>{
        console.log('MM:::Delete product');
        return await axios.delete(`${constant.API_KEY}/cart`,{ headers:{
            'x-api-key': constant.API_KEY,
            'x-client-id': this.currentUser.user._idid,
            'authorization': this.currentUser.tokenPair.accessTokenoken,
        },
        data: {
            'productId': productId
        }
        }).then().catch()
    }

    async updateQuantityProduct(productId: string, quantity: number | string, oldQuantity: number | string) : Promise<any>{
        console.log('MM:::Update quantiy');
        return await axios.post(`${constant.API_KEY}/cart/quantity`, {
            'productId': productId,
            'quantity': quantity,
            'oldQuantity': quantity,
        }).then().catch()
    }

}


export default CartService;