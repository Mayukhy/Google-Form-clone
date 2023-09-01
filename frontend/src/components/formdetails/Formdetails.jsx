import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { getsingleForm } from '../../redux/action/forms'
import { Box, Button} from '@mui/material'
import Response from './Response';
import Formitem from './Formitem';
import { EmailShareButton, EmailIcon } from 'react-share'
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import Badge from '@mui/material/Badge';
export default function Formdetails() {
const dispatch = useDispatch()
const {id} = useParams()
const userinfo =localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear()
const form = useSelector((state)=>state?.forms) 
const userResponses = useSelector((state)=>state?.responses)
useEffect(()=>{
dispatch(getsingleForm(id))
},[id])
console.log(form)
const filteredRes =userResponses?.length >0 && userResponses?.filter((res)=>res?.formId === id)
  const [value, setValue] =useState('Questions');
  const handleChange = (event, newValue) => {
    setValue(newValue);
    
  };
  const URL =`http://localhost:5173/form/${id}`
  return (
   <div className='bg-violet-100 min-h-screen' sx={{ width: '100%',display:'flex',justifyContent:'center',flexDirection:'column',alignItems:'center' }}>

{userinfo  && (form?.userId === userinfo?.sub || form?._id === userResponses?.formId) &&
  <Box sx={{display:'flex', borderBottom: 1, borderColor: 'divider',width: '100%',justifyContent:'center',background:'white',position:'relative' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        <Tab onClick={()=>window.location.reload()} value="Questions" label="Questions" />
        <Tab value="Response" label="Response" /><Badge className=' mt-3 mr-4' badgeContent={filteredRes?.length} color="secondary"> </Badge>
      </Tabs>
<Button sx={{position:'absolute',right:0,mt:'4px',mr:2}} variant="contained" color="secondary">
<EmailShareButton style={{display:'flex',gap:8}}
          url={URL}
          subject="Google Form"
          body={'Fill up the form'}
          className="Demo__some-network__share-button">
      <p className=' text-sm text-gray-100 mt-1 md:flex hidden '>Share With Mail</p>
          <ForwardToInboxIcon  />
        </EmailShareButton>
</Button>

      </Box>}
      
{  value === 'Questions' ?
(<Formitem userinfo={userinfo} id={id} form={form}/>):
( 
  <Response form={form} id={id} userinfo={userinfo}/>
)}
    </div>


  )
}
