import { useQuery } from "@tanstack/react-query";
import queryClient from "./client";


const useLogin = (initialData: any = null ): any => [
    useQuery({queryKey: ['user'], queryFn: () => initialData || localStorage.getItem('user')}).data,
    (value: any = null) => {
        value == null ? 
        localStorage.removeItem('user') 
        : localStorage.setItem('user', value); 
        return queryClient.setQueryData(['user'], value)}
]

export default useLogin;