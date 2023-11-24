import {Comment} from "@/utils/response"; 
import axios from "axios";
import {constant} from "@/utils/constant";

class CommentService {
    private static _instance: CommentService;
    private constructor(){}
    public static get Instance()
    {
        
        return this._instance || (this._instance = new this());
    }

    async getAllComments(): Promise<Comment[]>{
        return await axios.post(`${constant.BASE_URL}/comment/product`,{
                'productId': "6543acc62a89e59dd2bf8731",
                'parentId': null
            } ,{
            headers: {
                'x-api-key': constant.API_KEY
            },
        })
        .then(res=> res.data.metadata )
        .catch(error => {throw new Error(error.response.data.message)})
    }
}

export default CommentService.Instance;