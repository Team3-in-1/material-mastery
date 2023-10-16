const phoneRegex = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/;
const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;


const checkPasswordFormat = (value: string) : any => {
    if(value.length < 8)
        return "Password must have at least 8 characters";
    if(!/(?=.*[A-Z])/.test(value))
        return "Password must contain uppercase letters";
    if(!/(?=.*[!@#$&*])/.test(value))
        return "Password must contain special characters";
    if(!/(?=.*[0-9])/.test(value))
        return "Password must contain numeric characters";
    if(!/(?=.*[a-z].*[a-z].*[a-z])/.test(value))
        return "Password must contain lowercase letters"
    return null;
}

export {phoneRegex, emailRegex, checkPasswordFormat};