import { constant } from "@/utils/constant";
import axios from "axios";

class OrderService {
    user: any;
    constructor(user: any){
        this.user = user;
    }
    checkOut = async (orders: any = []) : Promise<any> => {
        return await axios.post(`${constant.BASE_URL}/checkout/review`, {
            'orders': orders,
        }, {headers: {
            'x-api-key': constant.API_KEY,
            'x-client-id': this.user.user._id,
            'authorization': this.user.tokenPair.accessToken,
        }}).then((res)=>{return res.data.metadata.checkoutOrder}).catch((err)=>{console.log(`Err:::CheckOut::: ${err}`);})
        
    }
    order = async(address: string = '', status: string = "pending", method: string = "upon receipt", note: string = '', orders: any = []):Promise<any> => {
        return await axios.post(`${constant.BASE_URL}/checkout/order`, {
            'order_address': {
                'city': address,
            },
             'order_payment': {
                'status': status,
                'method': method,
            },
            'order_note': note,
            'orders': orders,

        }, { headers: {
                'x-api-key': constant.API_KEY,
                'x-client-id': this.user.user._id,
                'authorization': this.user.tokenPair.accessToken,
            }}).then((res)=>{return res.data.statusCode}).catch((err)=>{return err.response.status});
    }
}


export default OrderService;