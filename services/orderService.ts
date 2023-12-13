import { constant } from "@/utils/constant";
import axios from "axios";

class OrderService {
    private user: any;
    private hearders : any;
    constructor(user: any){
        this.user = user;
        this.hearders = {
            'x-api-key': constant.API_KEY,
            'x-client-id': this.user.user._id,
            'authorization': this.user.tokenPair.accessToken,
        }
    }
    checkOut = async (orders: any = []) : Promise<any> => {
        return await axios.post(`${constant.BASE_URL}/checkout/review`, {
            'orders': orders,
        }, {headers: this.hearders}).then((res)=>{return res.data.metadata.checkoutOrder}).catch((err)=>{console.log(`Err:::CheckOut::: ${err}`);})
        
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

        }, { headers: this.hearders}).then((res)=>{return res.data.statusCode}).catch((err)=>{return err.response.status});
    }

    getOrders = async(limit: number = 2, page: number = 1, status: string = 'order_status', isAscending: boolean = true ): Promise<any> => {
        return await axios.get(`${constant.BASE_URL}/order?limit=${limit}&page=${page}&sorted[]=${status}&isAscending=${isAscending}`, {headers: this.hearders}).then((res)=>{return res.data.metadata;}).catch((err)=>{
            console.log(err);
        })
    }

    modifyOrderStatus = async (orderId : string, status: string = 'cancelled'): Promise<any> => {
        return await axios.patch(`${constant.BASE_URL}/order/status/${orderId}?status=${status}`, {}, {headers: this.hearders}).then((res)=>{return res.data}).catch((err)=>{err.response.status})
    }
}


export default OrderService;