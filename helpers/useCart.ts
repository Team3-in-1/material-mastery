import { useQuery } from "@tanstack/react-query";
import queryClient from "./client";
import { convertStringToOject } from "@/utils/array";
import {CartInterface, CartProduct} from '@/utils/response';


const useCart = (initialData: any = queryClient.getQueryData(['cart'])): any => [
    useQuery({queryKey: ['cart'], queryFn: () => initialData}).data,
    (value: CartInterface[] | []) => {
        return queryClient.setQueryData(['cart'], value);
    }
]

export default useCart;