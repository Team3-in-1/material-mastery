import { useQuery } from "@tanstack/react-query";
import queryClient from "./client";
import { convertStringToOject } from "@/utils/array";

export interface CardInterface {
    id: string,
    price: number,
    quantity: number,
}

const useCard = (initialData: CardInterface[] | [] = [] ): any => [
    useQuery({queryKey: ['card'], queryFn: () => (initialData.length != 0) ? initialData : convertStringToOject(localStorage.getItem('card')) }).data,
    (value: CardInterface[] | [] = []) => {
        localStorage.setItem('card', JSON.stringify(value))
        return queryClient.setQueryData(['card'], value);
    }
]

export default useCard;