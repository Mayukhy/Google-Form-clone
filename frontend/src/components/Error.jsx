import { Card, CardContent } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Error() {
    const navigate = useNavigate()
  return (
    <div className=' bg-violet-100 min-h-screen flex justify-center px-7 animate-[slideright_0.6s] '>
      <Card className='border-t-[11px] mt-10 border-t-[#fa527f] h-[200px] transition-all duration-200 hover:scale-105 cursor-pointer' sx={{width:{lg:'700px',md:'600px',sm:'500px',xs:'100%'},py:2,transition:'all 0.3s',borderRadius:'10px'}}>
    <CardContent className=' flex flex-col gap-5'>
        <p className=' text-4xl font-medium'>
        It seems that you are not logged in
        </p>
        <p className=' text-lg  text-[#9c1203] font-medium'>
        Your Response is not recorded
        </p>
        <p onClick={()=>navigate(-1)} className=' text-md text-blue-600 font-normal'>
        Try Again
        </p>
    </CardContent>
    </Card>
    </div>
  )
}
