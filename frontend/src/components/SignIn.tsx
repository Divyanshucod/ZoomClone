import React from "react";
import Heading from "../ui/Heading";
import Input from "../ui/Input";
import Button from "../ui/Button";
import axios from "axios";
type SignInType = {
    email:string,
    password:string,
}
const SignIn = () => {
  const [SignInInfo,setSignInInfo] = React.useState<SignInType>({
    email:'',
    password:'',
  })
  async function handleSignIn(){
     try {
        const value = await axios.post('http://localhost:3000/api/v1/user/signin',SignInInfo);
        alert(value.data.message);
        localStorage.setItem('AuthToken',value.data.token);
     } catch (error:any) {
        alert(error.response.data.message)
     }  
  }
  return (
    <div className="flex flex-col p-5 items-center border border-b-neutral-700 " >
       <Heading>SignIn</Heading>
       <Input placeholder="Enter email" onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setSignInInfo(prev => ({...prev, email:e.target.value}) )}/>
       <Input placeholder="Enter password" onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setSignInInfo(prev => ({...prev, password:e.target.value}) )}/>
       <Button onClick={handleSignIn}>SignIn</Button>
    </div>
  );
};

export default SignIn;