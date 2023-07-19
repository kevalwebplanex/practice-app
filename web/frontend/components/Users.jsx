import React, { useState } from 'react'
import Table from 'react-bootstrap/Table';
import {Page, LegacyCard} from '@shopify/polaris';
import { useAppQuery, useAuthenticatedFetch } from "../hooks";
import Button from 'react-bootstrap/Button';
import Loading from './Loading';
import { useNavigate } from '@shopify/app-bridge-react';
import Adduser from './Adduser';

const Users = () => {

    const [isLoading, setIsLoading] = useState(true);
    const fetch = useAuthenticatedFetch();
   const navigate = useNavigate();
    
    const {
        data,
        refetch ,
        isLoading:jjj,
        isRefetching
      } = useAppQuery({
        url: "/api/userdata/",
        reactQueryOptions: {
          onSuccess: () => {
            setIsLoading(false);
          },
        },
      });
     
    const handleDelete = async(id)=>{
        const response = await fetch("/api/deleteUser",{
            method:"POST",
            headers: {
              "Content-Type": "application/json",
            },
            body:JSON.stringify({
              "id":id
            }),
            }).then(res=>res.json());
        console.log("delete",id);
      
        if(response.status){
          console.log(response.message);
          refetch();
        }
    }

    if(jjj){
     return <Loading/>
    }
    if(!data?.users?.length){
        return "No data found.."
    }
  return (
   
    <>
     <Button onClick={()=>navigate("/AddUser")}>Add User</Button>
    <Page title='Users Data'>
    <LegacyCard>
        <Table striped bordered hover variant="dark" style={{overflow:"scroll"}} >
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>City</th>
          <th>Edit</th>
          <th>Remove</th>
        </tr>
      </thead>
      <tbody>
    
        {data?.users?.map((user,key)=>(
            <tr key={key}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.city}</td>
                <td><Button variant="primary" onClick={()=>navigate(`/${user.id}`)}>Edit</Button></td>
                <td><Button variant="danger" onClick={()=>handleDelete(user.id)}>Delete</Button></td>
            </tr>
        ))}
        </tbody>
    </Table>
    </LegacyCard>
    </Page>
   
    </>
  )
}

export default Users