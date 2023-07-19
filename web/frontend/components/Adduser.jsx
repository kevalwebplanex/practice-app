import React,{useState} from 'react'
import { useNavigate } from '@shopify/app-bridge-react';
import {FormLayout, TextField,LegacyCard, Button} from '@shopify/polaris';
import {useAuthenticatedFetch } from "../hooks";
const Adduser = () => {
   
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [phone,setPhone] = useState("");
    const [city,setCity] = useState("");
    const fetch = useAuthenticatedFetch();
    const navigate = useNavigate();
   
const handleSubmit = async (e) =>{
    e.preventDefault();
    const response = await fetch("/api/addUser",{
        method:"POST",
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify({
          "name":name,
          "email":email,
          "phone":phone,
          "city":city,
        }),
        }).then(res=>res.json());
    console.log(response);
    if(response.status){
      console.log(response.message);
      navigate("/");
      setName("");
      setEmail("");
      setPhone("");
      setCity("");
    }
}
  return (
    <>
    <LegacyCard>
        <Button onClick={()=>navigate("/")}>Back</Button>
        <div>
    <FormLayout >
    
      <TextField
        type="text"
        label="Name"
        onChange={(e)=>setName(e)}
        value={name}
        autoComplete="Name"
        name="name"
      />
      <TextField
        type="email"
        label="Email address"
        onChange={(e)=>setEmail(e)}
        autoComplete="email"
        value={email}
        name="email"
      />
      <TextField
        type="text"
        label="phone Number"
        onChange={(e) => setPhone(e)}
    
        name="phone"
        value={phone}
      />
      <TextField
        type="text"
        label="City"
        onChange={(e) => setCity(e)}
      
        name="city"
        value={city}
      />
      <Button type="submit" onClick={(e)=>handleSubmit(e)}>Submit</Button>
    </FormLayout>
    </div>
    </LegacyCard>
    </>
  )
}

export default Adduser