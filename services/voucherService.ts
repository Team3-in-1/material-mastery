import { constant } from "@/utils/constant";
import { VoucherInterface } from "@/utils/response";
import axios from "axios";

class VoucherService {
    getVoucherOfProduct = async(productId: string = '', limit: number = 5, page: number= 1, sorted: string = 'discount_end_date', isAscending: boolean= true):Promise<VoucherInterface[]> => {
        return await axios.get(`${constant.BASE_URL}/discount?limit=${limit}&page=${page}&sorted[]=${sorted}&productId=${productId}&isAscending=${isAscending}`, {headers:{
            'x-api-key': constant.API_KEY,
        }}).then((res)=> {return res.data.metadata}).catch((err)=>{console.log(err);})
    }
}

export default new VoucherService();