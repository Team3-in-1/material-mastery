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

    async getAllComments(productId: string): Promise<Comment[]>{
        console.log('productId: ', productId)
        
        return await axios.post(`${constant.BASE_URL}/comment/product`,{
                'productId': productId,
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