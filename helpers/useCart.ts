import { useQuery } from "@tanstack/react-query";
import queryClient from "./client";
import { convertStringToOject } from "@/utils/array";
import {CartInterface, CartProduct} from '@/utils/response';


const defaultValue: CartInterface = {
    _id: '',
  cart_userId: '',
  __v: 0,
  cart_count_products: 0,
  cart_products: [],
  cart_state: '',
  createdAt: '',
  updatedAt: '',
}

const useCart = (initialData: any = queryClient.getQueryData(['cart'])): any => [
    useQuery(
        {queryKey: ['cart'],
         queryFn: () => {
            if(!initialData && localStorage.getItem('cart'))
                return convertStringToOject(localStorage.getItem('cart'))
            if(initialData)
                localStorage.setItem('cart', JSON.stringify(initialData));
            return initialData
        }}
         ).data,
    (value: CartInterface = defaultValue) => {
        console.log(value);
        localStorage.setItem('cart', JSON.stringify(value));
        return queryClient.setQueryData(['cart'], value);
    }
]

export default useCart;