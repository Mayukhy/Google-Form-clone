import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import moment from 'moment'
import template from '../assets/images/img1.png'
import Moreicon from './Moreicon';
import CircularProgress from '@mui/joy/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';
import { getForms } from '../redux/action/forms';
import { Box } from '@mui/joy';
import IconButton from '@mui/material/IconButton'
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import Tooltip from '@mui/material/Tooltip'

export default function Home({currentId,setCurrentId,userinfo,setFormdata}) {
  const scrollRef = useRef()
   const dispatch = useDispatch()
  useEffect(()=>{
   dispatch(getForms())
  },[dispatch,currentId])
    const navigate = useNavigate()
    const forms = useSelector((state)=>state.forms)
    const userForms =forms?.length >0 && forms?.filter((form)=>form?.userId === userinfo?.sub)
    const colorArray = ['#ece3fa', '#e3fae5', '#e3f2fa', '#e3faec', '#effae3', 
    '#faf1e3', '#e3faf0', '#e3faf0', '#e3effa', '#fae3fa','#ece3fa', '#e3fae5', '#e3f2fa', '#e3faec', '#effae3', 
    '#faf1e3', '#e3faf0', '#e3faf0', '#e3effa', '#fae3fa','#ece3fa', '#e3fae5', '#e3f2fa', '#e3faec', '#effae3', 
    '#faf1e3', '#e3faf0', '#e3faf0', '#e3effa', '#fae3fa','#ece3fa', '#e3fae5', '#e3f2fa', '#e3faec', '#effae3', 
    '#faf1e3', '#e3faf0', '#e3faf0', '#e3effa', '#fae3fa','#ece3fa', '#e3fae5', '#e3f2fa', '#e3faec', '#effae3', 
    '#faf1e3', '#e3faf0', '#e3faf0', '#e3effa', '#fae3fa','#ece3fa', '#e3fae5', '#e3f2fa', '#e3faec', '#effae3', 
    '#faf1e3', '#e3faf0', '#e3faf0', '#e3effa', '#fae3fa'
];

  return (
    <div>
        <div  className=' bg-slate-100 flex flex-col justify-center items-center pb-16 pt-8 animate-slideright'>
            <h1 className=' font-semibold text-lg mb-2 text-zinc-600 text-left'>Start a new form</h1>
        <img onClick={()=>{
          setCurrentId(null)
          setFormdata({title:'',name:'',address:'',username:`${userinfo?.name}`,userId:`${userinfo?.sub}`})
          navigate('/form')
      }} className=' w-[200px] border-zinc-300 transition-all duration-200 border-2 border-solid hover:border-violet-700 hover:border-4 rounded-xl cursor-pointer  h-[150px]' src="https://ssl.gstatic.com/docs/templates/thumbnails/forms-blank-googlecolors.png" alt=""></img>
        </div>
        {!forms?.length && userinfo && 
        <Box sx={{ display: 'flex', gap: 2, justifyContent:'center',mt:10, alignItems: 'center', flexWrap: 'wrap' }}><CircularProgress size="lg" /> </Box> }

        {userForms?.length ===0 && userinfo &&
        <div className=' flex flex-col mt-8 gap-3 lg:px-10 px-4 justify-center items-center py-3'>
           <h1 className=' text-2xl font-semibold' >You Have not Created any forms yet</h1>
          <img  className=' animate-slideup w-[400px]'  src="https://img.freepik.com/premium-vector/no-data-concept-illustration_86047-486.jpg" alt="" /></div>}
{ userinfo &&

 <div  className=' flex md:mt-6 mt-0 flex-col'>
{userForms?.length &&  <div className=' animate-[slideright_0.6s] md:flex hidden lg:flex xl:hidden md:pr-[40px] lg:pr-[50px] mb-[-70px] gap-1 flex-row-reverse'>
  <Tooltip title="Forward">
  <IconButton  className=' w-[50px] h-[50px]' aria-label="" onClick={()=>{
 scrollRef.current.scrollLeft += 650
  }}>
    <ArrowCircleRightIcon className=' text-sky-600 hover:text-lime-700 transition-all duration-200 scale-150'/>
    
    </IconButton> 
  </Tooltip>

    <Tooltip title="Backward">
    <IconButton className=' w-[50px] h-[50px]' aria-label="" onClick={()=>{
  scrollRef.current.scrollLeft -= 650
  }}>
    <ArrowCircleLeftIcon className='text-purple-700 hover:text-pink-800 scale-150 duration-200 transition-all'/>
  </IconButton>   
    </Tooltip>
    </div>}
{userinfo && userForms?.length > 0 && <h1 className='lg:px-[80px] px-4 lg:text-left text-center mt-7 text-gray-900 font-bold lg:text-4xl text-2xl'>Created Forms</h1>}
<div ref={scrollRef} className=' flex md:w-[90%] lg:[90%] xl:w-full relative w-full m-auto md:overflow-x-scroll lg:overflow-x-scroll xl:overflow-hidden overflow-hidden  scroll-smooth'>


            <div className='flex  md:gap-3 gap-9 lg:px-[10px] xl:px-[80px] md:px-[10px] px-5 lg:justify-start justify-center py-3 md:flex-nowrap lg:flex-nowrap xl:flex-wrap flex-wrap'>
            { forms?.length > 0 && userForms?.map((item,id)=>(
                <>
                      { item?.title !==''&& item?.name !==''&&
                      <Card className='card animate-[slideup_0.5s] md:w-[240px] w-[350px] md:h-[300px] h-auto' key={id} sx={{backgroundColor:`${colorArray[id]}`,minHeight:'300px',position:'relative',p:0,m:1}}>
                        <div onClick={()=>navigate(`/form/${item?._id}`)} className=' px-7 py-4 rounded-sm h-[100%]'><img src={template} className='w-full' alt="" />
                        
                        <div className=' flex flex-col gap-3 mt-4'>

        <Card className=' border-l-[5px] border-l-blue-400 transition-all duration-200 hover:scale-105 cursor-pointer' sx={{width:'100%',py:2,transition:'all 0.3s',borderRadius:'5px'}}>
        <CardContent>
        
        <p className=' text-xs font-normal'>{item?.name}</p>

        </CardContent>
        </Card>

{ item?.address && <Card className=' border-l-[5px] border-l-blue-400 transition-all duration-200 hover:scale-105 cursor-pointer' sx={{width:'100%',py:2,transition:'all 0.3s',borderRadius:'5px'}}>
        <CardContent>
         <p className=' font-normal text-xs'>{item?.address}</p>
        </CardContent>
        </Card>}
      </div>
                        
                        </div>
                      <div className=' flex flex-row-reverse absolute right-0 bottom-0 py-1 mb-1 mr-1 px-2  '><Moreicon form={item} currentId={currentId} setCurrentId={setCurrentId}/></div>
                      <CardContent sx={{background:'#f6edfa',borderTop:'#c9becc solid 1px',p:1,borderBottomLeftRadius:'6px',borderBottomRightRadius:'6px'}} >
                      <p className=' md:pl-3 lg:pl-0 pl-5 w-[160px] mb-1 truncate text-md font-semibold text-yellow-950'>{item?.title}</p>
                      <div className='  flex gap-2 md:pl-3 lg:pl-0 pl-5 '>
                        <img className=' w-[20px] h-[20px] ' src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Antu_google-forms.svg/768px-Antu_google-forms.svg.png?20160706105123" alt="" />
                        <p className=' text-sm font-normal mb-[2px]'> {moment(item?.createdAt).fromNow()}</p>
                        </div>
                      
                      </CardContent>
                    </Card>}
                    </>
            ))}
            </div>
        </div>
 </div>      
}
        {!userinfo && 
        <div className=' flex flex-col mt-8 gap-3 lg:px-10 px-4 justify-center items-center py-3'>
          <h1 className=' text-2xl font-bold' >Login First to see Created Forms</h1>
          <img className=' animate-slideup w-[300px]' src="https://cdn-icons-png.flaticon.com/512/4260/4260239.png" alt="" />
          </div>}
          <br />
          <br />
          <br />
          <br />
        
    </div>
  )
}
