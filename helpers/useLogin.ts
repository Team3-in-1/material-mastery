import { useQuery } from "@tanstack/react-query";
import queryClient from "./client";


const useLogin = (input: any = queryClient.getQueryData(['user'])): any => [
    useQuery({queryKey: ['user'], queryFn: (): Object | null=> {
        // if(input){
        //     if(typeof input == 'string'){
        //         console.log('this is string')
        //         return JSON.parse(input);
        //     }
        //     console.log('this is initialData object')
        //     return input;
        // }
        // const userString = localStorage.getItem('user');
        // if(userString){
        //     console.log('this is localstorage string')
        //     return JSON.parse(userString);
        // }
        // return null;
        const initialData = (input) ? input : localStorage.getItem('user');
        if(!initialData) return null;
        const data = (typeof initialData == 'string') ? JSON.parse(initialData) : initialData;
        return data;

    }}).data,
    (value: any = null) => {
        // when value is null that is logout
        if(!value){
            localStorage.removeItem('user');
            localStorage.removeItem('cart');

            }
        else {
            localStorage.setItem('user', value)
        }
        return queryClient.setQueryData(['user'], value)}
]

export default useLogin;