import { useQuery } from "@tanstack/react-query";
import queryClient from "./client";

export interface CardInterface {
    id: string,
    price: number,
    quantity: number,
}

const useCard = (initialData: CardInterface[] | [] = [] ): any => [
    useQuery({queryKey: ['card'], queryFn: () => initialData}).data,
    (value: CardInterface[] | [] = []) => {
        sessionStorage.setItem('card', JSON.stringify(value))
        return queryClient.setQueryData(['card'], value);
    }
]

export default useCard;