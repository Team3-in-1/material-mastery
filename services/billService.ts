import { constant } from "@/utils/constant";
import { Bill_Export_Request } from "@/utils/request";
import { Bill_Export, NumOfBill, UserInterface } from "@/utils/response";
import axios from "axios";

class BillService {
    private user: UserInterface;
    private hearders: any;

    constructor(user: any) {
        this.user = user;
        this.hearders = {
            'x-api-key': constant.API_KEY,
            'x-client-id': this.user.userId,
            'authorization': this.user.accessToken,
        }
    }

    createExportBill = async (body: Bill_Export_Request): Promise<any> => {
        return await axios.post(`${constant.BASE_URL}/bill/export/`, {
            body
        }, { headers: this.hearders })
            .then((res) => { return res.data.statusCode; })
            .catch((err) => { console.log(err); })
    }

    getExportById = async (id: string): Promise<Bill_Export> => {
        return await axios.get(`${constant.BASE_URL}/bill/export/${id}`, { headers: this.hearders })
            .then((res) => { return res.data.metadata; })
            .catch((err) => { console.log(err); })
    }

    getAllExportBill = async (limit: number = 10, page: number = 1, sortBy: string = 'bill_date', isAscending: boolean = false): Promise<Bill_Export[]> => {
        return await axios.get(`${constant.BASE_URL}/bill/export/?limit=${limit}&page=${page}&sorted[]=${sortBy}&isAscending=${isAscending}`, { headers: this.hearders })
            .then((res) => { return res.data.metadata; })
            .catch((err) => { console.log(err); })
    }

    getNumberOfBill = async (): Promise<NumOfBill> => {
        return await axios.get(`${constant.BASE_URL}/bill/number`, { headers: this.hearders })
            .then((res) => { return res.data.metadata; })
            .catch((err) => { console.log(err); })
    }
}

export default BillService;