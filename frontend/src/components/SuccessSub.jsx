import { Card, CardContent } from '@mui/material'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function SuccessSub() {
    const {formtitle} = useParams()
    const navigate = useNavigate()
  return (
    <div className=' bg-violet-100 min-h-screen flex justify-center px-7 animate-[slideleft_0.6s]'>
      <Card className='border-t-[11px] mt-10 border-t-[#8f38ba] h-[200px] transition-all duration-200 hover:scale-105 cursor-pointer' sx={{width:{lg:'700px',md:'600px',sm:'500px',xs:'100%'},py:2,transition:'all 0.3s',borderRadius:'10px'}}>
    <CardContent className=' flex flex-col gap-5'>
        <p className=' text-4xl font-medium'>
        {formtitle}
        </p>
        <p className=' text-lg  text-fuchsia-900 font-medium'>
        Your Response has been Recorded
        </p>
        <p onClick={()=>{
          navigate(-1)
          setTimeout(() => {
            window.location.reload() 
          }, 100);
         }} className=' text-md text-blue-600 font-normal'>
        Give another response if option available
        </p>
    </CardContent>
    </Card>
    </div>
  )
}
