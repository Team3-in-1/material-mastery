import { useQuery } from "@tanstack/react-query";
import queryClient from "./client";


const useLogin = () => [
    useQuery({queryKey: ['user'], queryFn: ()=>localStorage.getItem('user')}).data,
    (value: any)=>{localStorage.removeItem('user'); queryClient.setQueryData(['user'], value);}
]


export default useLogin;