import React from "react";
import Heading from "../ui/Heading";
import Input from "../ui/Input";
import Button from "../ui/Button";
import axios from "axios";
type SignUpType = {
    email:string,
    password:string,
    username:string
}
const SignUp = () => {
  const [SignUpInfo,setSignUpInfo] = React.useState<SignUpType>({
    email:'',
    password:'',
    username:''
  })
  async function handleSignUp(){
     try {
        const value = await axios.post('http://localhost:3000/api/v1/user/signup',SignUpInfo);
        alert(value.data.message);
     } catch (error:any) {
        alert(error.response.data.message)
     }  
  }
  return (
    <div className="flex flex-col p-5 items-center border border-b-neutral-700 shadow-2xl" >
       <Heading>SignUp</Heading>
       <Input placeholder="Enter username" onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setSignUpInfo(prev => ({...prev, username:e.target.value}) )}/>
       <Input placeholder="Enter email" onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setSignUpInfo(prev => ({...prev, email:e.target.value}) )}/>
       <Input placeholder="Enter password" onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setSignUpInfo(prev => ({...prev, password:e.target.value}) )}/>
       <Button onClick={handleSignUp}>SignUp</Button>
    </div>
  );
};

export default SignUp;