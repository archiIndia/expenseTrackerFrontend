import axios from "axios";

const baseURL = "http://localhost:5005/users";
const signUp= async({email,password})=>{
    try{
        const json_body={
            name: email,
            email: email,
            password: password,
        }
        const response= await axios.post(baseURL ,json_body);
         return response.data
    }
    catch(error){
        throw new Error("Can not Create...")
    }
}
const signIn= async({email,password})=>{
    try{
        const json_body={
            email: email,
            password: password,
        }
        const response= await axios.post(baseURL+"/signIn" ,json_body);
         return response.data
    }
    catch(error){
        console.log(error);
        throw new Error(error.response.data.msg ?? "Can not LogIn...")       
    }
}

export { signUp,signIn };