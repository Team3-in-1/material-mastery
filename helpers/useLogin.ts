import { useQuery } from "@tanstack/react-query";
import queryClient from "./client";

let user: any = null;
if (typeof window !== 'undefined') {
    user = localStorage.getItem('user')
}
const useLogin = (initialData: any = user ): any => [
    useQuery({queryKey: ['user'], queryFn: ()=> initialData}).data,
    (value: any = null) => {
        value == null ? 
        localStorage.removeItem('user') 
        : localStorage.setItem('user', value); 
        return queryClient.setQueryData(['user'], value)}
]

export default useLogin;