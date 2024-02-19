import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button.jsx";
import { useNavigate } from "react-router-dom";
import { signIn } from "./Services/user.service";
import { useState } from "react";

function LoginPage() {
  const navi = useNavigate(); //useNavigate Function return another Function which we store in navi variable.

  const [email,setEmail]= useState();
  const [password,setPassword]= useState();
  const handleLogin = async () => {
    try{
    // Todo: call API to Login using Password and Email
    const login= await signIn({email: email,password: password})
    navi("/app");
    }
    catch(error){
      alert(error.message ?? "Can not LogIn...")
    }
  };

  return (
    <div className={"h-screen flex "}>
      <div className={"hidden md:block md:w-2/3 bg-primary p-5"}>
        <div className={"text-4xl text-primary-foreground"}>Small Book</div>
      </div>
      <div className={"p-5 flex items-center justify-center w-full md:w-1/3"}>
        <div className={"mi-w-80 -mt-20"}>
          <div>
            <div className={"text-2xl font-semibold"}>
              Welcome to Small Book
            </div>
            <div className={"text-gray-500"}>Please login to continue</div>
          </div>
          <div>
            <label htmlFor="email" className={"block mt-5 text-gray-500"}>
              Email
            </label>
            <Input type="text" id="email" className={"mt-1"} onChange={(ev)=> setEmail(ev.target.value)} />
          </div>
          <div>
            <label htmlFor="password" className={"block mt-2 text-gray-500"}>
              Password
            </label>
            <Input type="password" id="password" className={"mt-1"} onChange={(ev)=> setPassword(ev.target.value)} />
          </div>

          <div>
            <Button className={"mt-5 w-full"} onClick={handleLogin}>
              Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
