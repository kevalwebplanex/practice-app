import React, { useState } from 'react'
import Table from 'react-bootstrap/Table';
import {Page, LegacyCard} from '@shopify/polaris';
import { useAppQuery, useAuthenticatedFetch } from "../hooks";
import Button from 'react-bootstrap/Button';
import Loading from './Loading';
const Users = () => {

    const [isLoading, setIsLoading] = useState(true);
    const fetch = useAuthenticatedFetch();
   
    
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
       const handleEdit = (id)=>{
        console.log("edit", id);
       }
    const handleDelete = (id)=>{
        console.log("delete",id);
    }
    //   console.log(data?.users);
    if(jjj){
     return <Loading/>
    }
    if(!data?.users?.length){
        return "No data found.."
    }
  return (
   
    <>
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
          <th>Delete</th>
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
                <td><Button variant="primary" onClick={()=>handleEdit(user.id)}>Edit</Button></td>
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

    // {/* {data?.users?.map((user,key)=>{
    //         const {id,name,email,phone} = user
    //       return (<tr  key={key}>
    //         <td>{id}</td>
    //         <td>{name}</td>
    //         <td>{email}</td>
    //         <td>{phone}</td>
    //         <td>{city}</td>
    //         {/* <td>{city}</td> */}
    //         </tr>) 
            
        
    //     })} */}