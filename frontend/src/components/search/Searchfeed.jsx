import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { search } from '../../redux/action/forms'
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import moment from 'moment'
import { Box } from '@mui/joy';
import CircularProgress from '@mui/joy/CircularProgress';
import Moreicon from '../Moreicon';
import template from '../../assets/images/img1.png'


export default function Searchfeed({userinfo,currentId,setCurrentId}) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [stoploading,setStoploading] = useState(false)
    const {searchTerm} = useParams()
    const searchedform = useSelector((state)=>state.forms)
    useEffect(()=>{
    dispatch(search(searchTerm))
    console.log(searchedform)
    },[searchTerm,currentId])

    if (!searchedform?.length) {
      setTimeout(() => {
        setStoploading(true)
      }, 10000);
    }
    const filteredterms = searchedform?.length >0 && searchedform?.filter((form)=>form?.userId === userinfo?.sub)
    const colorArray = ['#ece3fa', '#e3fae5', '#e3f2fa', '#e3faec', '#effae3', 
    '#faf1e3', '#e3faf0', '#e3faf0', '#e3effa', '#fae3fa','#ece3fa', '#e3fae5', '#e3f2fa', '#e3faec', '#effae3', 
    '#faf1e3', '#e3faf0', '#e3faf0', '#e3effa', '#fae3fa','#ece3fa', '#e3fae5', '#e3f2fa', '#e3faec', '#effae3', 
    '#faf1e3', '#e3faf0', '#e3faf0', '#e3effa', '#fae3fa','#ece3fa', '#e3fae5', '#e3f2fa', '#e3faec', '#effae3', 
    '#faf1e3', '#e3faf0', '#e3faf0', '#e3effa', '#fae3fa','#ece3fa', '#e3fae5', '#e3f2fa', '#e3faec', '#effae3', 
    '#faf1e3', '#e3faf0', '#e3faf0', '#e3effa', '#fae3fa','#ece3fa', '#e3fae5', '#e3f2fa', '#e3faec', '#effae3', 
    '#faf1e3', '#e3faf0', '#e3faf0', '#e3effa', '#fae3fa'
];
  return (
    <div className='bg-[#fcf0f0] min-h-screen'>
              {!filteredterms?.length && userinfo && !stoploading &&
        <Box sx={{ display: 'flex', gap: 2, justifyContent:'center',pt:10, alignItems: 'center', flexWrap: 'wrap' }}><CircularProgress size="lg" /> </Box> }
        {!filteredterms?.length && stoploading && userinfo &&
        <div className=' flex flex-col pt-10 gap-3 lg:px-10 px-4 justify-center items-center py-3'>
           <h1 className=' text-2xl font-bold' >No Forms are found</h1>
          <img  className=' rounded-xl animate-slideup w-[400px]'  src="https://img.freepik.com/premium-vector/no-data-concept-illustration_86047-486.jpg" alt="" /></div>}
{ userinfo && <div  className=' flex flex-col'>
{userinfo && filteredterms?.length > 0 && <h1 className='lg:px-[100px] px-4 lg:text-left text-center mt-7 text-gray-900 font-bold lg:text-4xl text-2xl'>Search Results for " {searchTerm} "</h1>}
            <div className='flex md:gap-3 gap-9 lg:px-[100px] md:px-[70px] px-10 lg:justify-start justify-center py-3 flex-wrap'>
            { searchedform?.length > 0 && filteredterms?.map((item,id)=>(
                <>
                      { item?.title !==''&& item?.name !==''&&
                      <Card className='card animate-[slideup_0.5s]' key={id} sx={{backgroundColor:`${colorArray[id]}`,width:{md:'230px',xs:'100%',sm:'500px'},height:{md:'300px',xs:'auto'},minHeight:'300px',position:'relative',p:0,m:1}}>
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
        </div>}
        {!userinfo && 
        <div className=' flex flex-col pt-8 gap-3 lg:px-10 px-4 justify-center items-center py-3'>
          <h1 className=' text-2xl font-bold' >Login First to see Created Forms</h1>
          <img className=' animate-slideup w-[300px]' src="https://cdn-icons-png.flaticon.com/512/4260/4260239.png" alt="" />
          </div>}
    </div>
  )
}
