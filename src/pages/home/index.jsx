import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { Link } from 'react-router-dom'
import MessageModal from '../../components/messageModal';
import MessagePromptModal from '../../components/messagePromt';

import Tablerow from '../../components/tablerow';
import { useGlobalContext } from '../../context/context';



const Home = () => {
    const {setShowMessageModal,showMessageModal} = useGlobalContext()
    
    // to allow us pass the jwt token
    const token = localStorage.getItem('accessToken')

    const headers =  {
    "Authorization":token,
    "Content-Type": 'application/json'
   }



    axios.defaults.withCredentials=true;

    const [contacts,setContacts]= useState([]);
    const [showPromptModal,setShowPromptModal] =useState(false);
    const [deleteUser,setDeleteUser]=useState('');


    const togglePrompt=()=>{
         setShowPromptModal(!showPromptModal)
    }
   
    const deleteContact = async(id)=>{
        try{
            const result =await axios.delete('http://localhost:3001/contacts/delete/'+id,{headers})
            console.log(result.data);
        }catch(e){
            console.log(e.response.data.message)
        }

    }

    const updateContact = async(updatedUser)=>{
     const newUser={ 
            newFullName:updatedUser.modifiedFullName,
            newEmail:updatedUser.modifiedEmail,
            newNumber:updatedUser.modifiedNumber,
            newGender:updatedUser.changeGender,
            id:updatedUser._id,
     }
     try{
         const result = await axios.put('http://localhost:3001/contacts/update',newUser,{headers})
         setContacts(result.data.contacts)
         setShowMessageModal(true)
     }catch(e){
         console.log(e.response.data.message);
         //setError(e.response.data.message)
         //setShowMessageModal(true)
     }
    }

    useEffect(()=>{
        const abortController = new AbortController();
        const signal = abortController.signal;
        const getContacts =  async()=>{
            

            try{
            const contactList = await axios.post("http://localhost:3001/contacts/show",{},{headers},signal)

                console.log(contactList.data.contacts)
                setContacts(contactList.data.contacts)
            }catch(e){
                console.log(e.response.data.message);
            }
        }

        getContacts()
        return ()=> abortController.abort() // to remove the fetch if go to sudden route
    },[])


    return (
        <>
         {contacts.length<1 && <div className='text-white'>
            <h2 className='text-heading-large font-bold'>
                Welcome
            </h2>
            <p className='text-heading-medium leading-tight mb-12 '>
                This is where your contacts will live. Click the button below 
                to add a new contact
            </p>
            <Link to='/home/add' className='text-2xl custom-button' title='Click to Add'>add your first contact</Link>
        </div>}
        {contacts.length>0 &&
        <div>
   
        <div className='flex items-center justify-between mb-10'>
           <h2 className='text-4xl text-white font-bold '>
            Contacts
            </h2>
            <button className='text-lg custom-button'>Add new Contact</button>
         </div>

         <div className='bg-white px-10 py-5 rounded-3xl'>
           <table className='w-full text-greenColor border-separate border-spacing-4'>
              <thead>
                <tr>
                    <th></th>
                    <th>Full Name</th>
                    <th>Gender</th>
                    <th>Email</th>
                    <th>Phone number</th>
                    <th>
                   
                    </th>
                </tr>
              </thead>
              <tbody>
                 {
                    contacts.map((contact)=>{
                        return <Tablerow key={contact._id} 
                                         updateContact={updateContact} 
                                         contact={contact}
                                         showPromptModal={showPromptModal}
                                         togglePrompt={togglePrompt}
                                         setDeleteUser={setDeleteUser}
                                        
                                         />
                    })
                 }
              </tbody>
           </table>
        </div>
        </div>}

        {showMessageModal && <MessageModal message={"Your contact has been saved successfully!"}/>}
        {showPromptModal &&  <MessagePromptModal  deleteContact={deleteContact}  deleteUser={deleteUser} togglePromptModal={togglePrompt} fullName={"Name"}/>}
      </>

    )
}

export default Home
