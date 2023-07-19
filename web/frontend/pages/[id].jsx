import {useEffect,useState} from 'react'
import { useNavigate } from '@shopify/app-bridge-react';
import {FormLayout, TextField,LegacyCard, Button} from '@shopify/polaris';
import { useParams} from "react-router-dom";
import {useAuthenticatedFetch } from "../hooks";

const Edituser = () => {
  const [name,setName] = useState();
    const [email,setEmail] = useState();
    const [phone,setPhone] = useState();
    const [city,setCity] = useState();
  const fetch = useAuthenticatedFetch();

  const {id} = useParams();
  console.log(id);

  const navigate = useNavigate();
  
  useEffect(()=>{
    const getUser = async ()=>{
      const response = await fetch("/api/user",{
        method:"POST",
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify({
          "id":id,
        }),
        }).then(res=>res.json());
   
        setName(response?.user?.name);
        setEmail(response?.user?.email);
        setPhone(response?.user?.phone);
        setCity(response?.user?.city);
    }
    getUser();
  },[id]);


  const handleSubmit = async (e) =>{
    e.preventDefault();
    const response = await fetch("/api/edituser",{
        method:"POST",
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify({
          "id":id,
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
      <h3>Edit UserData</h3>
     <LegacyCard>
        <Button onClick={()=>navigate("/")}>Back</Button>
        <div>
    <FormLayout >
      <TextField
        type="text"
        label="Name"
        onChange={(e)=> {
          setName(e);
        }}
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

export default  Edituser