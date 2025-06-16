import React from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const MeetingBoard = () => {
    const [displayInput,setDisplayInput] = React.useState<boolean>(false)
    const [meetingId,setMeetingId] = React.useState<string>('')
    const navigate = useNavigate();
    
    async function handleMeetingCreation() {
        try {
            const response = await axios.get('http://localhost:3000/api/v1/connection/create-meeting',{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('AuthToken')}`
                }
            });
            alert(response.data.meetingId);
        } catch (error:any) {
            alert(error.response.data.message)
        }
    }
   async function VerifyMeeating(){
     try {
         await axios.get(`http://localhost:3000/api/v1/connection/validateMeeting/${meetingId}`,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem('AuthToken')}`
            }
        })
         navigate(`/meeting/${meetingId}`)
     } catch (error:any) {
        alert(error.response.data.message)
     }
   }
  return (
    <div className="flex flex-col">
       <Button onClick={handleMeetingCreation}>Create Meeting</Button>
       <Button onClick={()=> setDisplayInput(true)}>Join Meeting</Button>
       {displayInput ?<div className="flex flex-col"> 
        <Input placeholder="Enter Meeting Id" onChange={(e) => setMeetingId(e.target.value)}/> 
        <Button onClick={VerifyMeeating}>Submit</Button>
       </div> : null}
    </div>
  );
};

export default MeetingBoard;