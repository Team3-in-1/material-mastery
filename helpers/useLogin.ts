import { useQuery } from "@tanstack/react-query";
import queryClient from "./client";


const useLogin = (initialData: any = queryClient.getQueryData(['user']) ): any => [
    useQuery({queryKey: ['user'], queryFn: () => {
        if(initialData){
            return initialData;
        }
        const userString = localStorage.getItem('user');
        if(userString){
            return JSON.parse(userString);
        }
        return null;
        
    }}).data,
    (value: any = null) => {
        // when value is null that is logout
        if(!value){
            localStorage.removeItem('user');
            }
        else {
            localStorage.setItem('user', value)
        }
        return queryClient.setQueryData(['user'], value)}
]

export default useLogin;