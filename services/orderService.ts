import { constant } from "@/utils/constant";
import { UserInterface } from "@/utils/response";
import axios from "axios";


const DEFAULT_NUMBER = {
                pending: 0,
                confirmed: 0,
                cancelled: 0,
                shipping: 0,
                shipped: 0,
                delivered: 0,
                failed: 0
            };
class OrderService {
    private user: UserInterface;
    private hearders : any;
    private currentTime : string;
    private startTime: string;

    constructor(user: any){
        this.user = user;
        this.hearders = {
            'x-api-key': constant.API_KEY,
            'x-client-id': this.user.userId,
            'authorization': this.user.accessToken,
        }
        const time = new Date();

        this.currentTime = `${time.getDate()}/${time.getMonth() + 1}/${time.getFullYear()}`;
        this.startTime = `1/${time.getMonth() + 1}/${time.getFullYear()}`;
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

        }, { headers: this.hearders}).then(async(res)=>{return res.data.statusCode}).catch((err)=>{return err.response.status});
    }

    getOrders = async(limit: number = 2, page: number = 1, status: string = 'order_status', isAscending: boolean = true ): Promise<any> => {
        return await axios.get(`${constant.BASE_URL}/order?limit=${limit}&page=${page}&sorted[]=${status}&isAscending=${isAscending}`, {headers: this.hearders}).then((res)=>{return res.data.metadata;}).catch((err)=>{
            console.log(err);
        })
    }

    cancelOrder = async (orderId : string): Promise<any> => {
        return await axios.patch(`${constant.BASE_URL}/order/cancel/${orderId}`, {}, {headers: this.hearders}).then((res)=>{return res.data}).catch((err)=>{err.response.status})
    }

    getNumberOfOrder = async(start: string = this.startTime, end: string= this.currentTime) => {
        return await axios.get(`${constant.BASE_URL}/order/number?start=${start}&end=${end}`, {headers: this.hearders})
        .then((res)=>{
            return res.data.metadata;
        })
        .catch((err: any)=>{
            console.log('err', err);
            return DEFAULT_NUMBER;
        })
    }

    getOrderById = async (id: string = '') => {
        
        return await axios.get(`${constant.BASE_URL}/order/find/${id}`, {headers: this.hearders})
        .then((res)=>{
            return res.data.metadata;
        })
        .catch((err: any)=>{
            console.log('err', err);
        })
    }

}


export default OrderService;