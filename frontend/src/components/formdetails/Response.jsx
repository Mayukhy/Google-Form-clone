import React, { useEffect,useState } from 'react'
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux'
import { Card, CardContent, IconButton, Tooltip,Box } from '@mui/material'
import { deleteRes, getResponse} from '../../redux/action/response';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import List from '@mui/joy/List';
import axios from 'axios';
import moment from 'moment'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CircularProgress from '@mui/joy/CircularProgress';

export default function Response({userinfo,id}) {

    const [form,setForm] = useState([])
    const dispatch = useDispatch()
    const userResponses = useSelector((state)=>state?.responses)
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };
    useEffect(()=>{
        dispatch(getResponse())
      },[])
    useEffect(()=>{
     const fetchdata= async()=>{
    await axios.get(`http://localhost:5000/form/${id}`)
     .then(({data})=>
    {
       setForm(data)
       console.log(data)
      }
     )
     }
     fetchdata()
    },[id])
      const filteredRes =userResponses?.length >0 && userResponses?.filter((res)=>res?.formId === id)
      console.log(userResponses)
console.log("Only user",filteredRes)
  return (
    <div className='flex flex-col justify-center  items-center mx-auto mt-8 px-5 gap-5 animate-[slideright_0.5s]'>
   <Card className='border-t-[11px] border-t-[#8f38ba] flex px-4 justify-between transition-all duration-200 hover:scale-105 cursor-pointer' sx={{width:{lg:'700px',md:'600px',sm:'500px',xs:'100%'},py:2,transition:'all 0.3s',borderRadius:'10px'}}>
 <CardContent>
<p className=' text-3xl font-semibold mt-1'>{filteredRes?.length || 0} {filteredRes?.length>1 ? "Responses":"Response"}</p>
 </CardContent>

          </Card>

          {!userResponses.length && userinfo &&
        <Box sx={{ display: 'flex', gap: 2, justifyContent:'center',mt:10, alignItems: 'center', flexWrap: 'wrap' }}><CircularProgress size="lg" /> </Box>
        }
    {userResponses?.length && filteredRes?.map((res,index)=>(
<>
      {/* Acrdian Starts */}
      <Accordion expanded={expanded === `panel_${index}`} 
       onChange={handleChange(`panel_${index}`)}>
        <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        className='border-l-[5px] flex  justify-between border-l-blue-400 transition-all duration-200  cursor-pointer' sx={{width:{lg:'700px',md:'600px',sm:'500px',xs:'100vw'},py:1,transition:'all 0.3s',borderRadius:'10px',px:3}}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <div className=' flex justify-between w-full'>
          <div className=' flex gap-2'>
 <img className=' w-[50px] h-[50px] mt-2 rounded-full' src={res?.profileimg} alt="" />
 <p className=' text-xl font-semibold mt-4'>{res?.username}</p>
 </div>
 <div className=' flex gap-1'>
 <Tooltip title="Delete">
  <IconButton  onClick={(e)=>{
     e.stopPropagation()
    dispatch(deleteRes(res?._id))}} sx={{mt:'9px',mr:1}} className=' scale-110 h-[40px]' aria-label="">
  <DeleteForeverIcon  className=' text-red-500'/> 
  </IconButton> 
  </Tooltip>
  </div>
  </div>
        </AccordionSummary>
 <AccordionDetails>
        <List className=' animate-[slideright_0.6s]'
            sx={{
              display:'flex',
              justifyContent:'center',
              flexDirection:'column',
              alignItems:'center',
              gap:2,
              pb:5

            }}
          >
            <Card className='border-t-[11px] border-t-[#8f38ba] border-l-[5px] border-l-blue-400 transition-all duration-200 hover:scale-100 cursor-pointer' sx={{ width: { lg: '600px', md: '500px', sm: '400px', xs: '100%' }, py: 2, transition: 'all 0.3s', borderRadius: '10px' }}>
          <CardContent>
          
            <p className=' font-bold lg:text-3xl md:text-2xl text-xl text-violet-950'>This Response is Comming From</p>
            <div className=' flex flex-col'>
            <div className=' flex gap-2 mt-3'>
            <img className=' w-[45px] h-[45px] mt-2 rounded-full' src={res?.profileimg} alt="" />
             <p className=' md:mt-3.5 mt-4 lg:text-xl md:text-lg text-md font-semibold'>{res?.username}</p>
          </div>
          <p className=' flex flex-row-reverse text-sm font-normal mt-1'> {moment(res?.createdAt).fromNow()}</p>
          </div>

          </CardContent>
        </Card>

            <Card className='border-t-[11px] border-t-[#8f38ba] transition-all duration-200 hover:scale-105 cursor-pointer' sx={{width:{lg:'600px',md:'500px',sm:'400px',xs:'100%'},py:2,transition:'all 0.3s',borderRadius:'10px'}}>
    <CardContent>
        <p className=' text-4xl font-medium'>
        {form?.title}
        </p>
    </CardContent>
    </Card>
  
    <Card className=' border-l-[5px] border-l-blue-400 transition-all duration-200 hover:scale-105 cursor-pointer' sx={{width:{lg:'600px',md:'500px',sm:'400px',xs:'100%'},py:2,transition:'all 0.3s',borderRadius:'10px'}}>
    <CardContent className=' flex flex-col gap-3'>
    <p className=' text-lg font-semibold  text-indigo-900'>
        {form?.name} *
        </p>
<p className=' text-base text-gray-600'>{res?.name}</p>
    </CardContent>
    </Card>
{form?.address && <Card className='border-l-[5px] border-l-blue-400 transition-all duration-200 hover:scale-105 cursor-pointer' sx={{width:{lg:'600px',md:'500px',sm:'400px',xs:'100%'},py:2,transition:'all 0.3s',borderRadius:'10px'}}>
    <CardContent className=' flex flex-col gap-3'>
    <p className=' text-lg font-semibold text-indigo-900'>
    {form?.address} *
        </p>
        <p className=' text-base text-gray-600'>{res?.address}</p>

    </CardContent>
    </Card>}

{ form?.q3  && <Card className='border-l-[5px] border-l-blue-400 transition-all duration-200 hover:scale-105 cursor-pointer' sx={{width:{lg:'600px',md:'500px',sm:'400px',xs:'100%'},py:2,transition:'all 0.3s',borderRadius:'10px'}}>
    <CardContent className=' flex flex-col gap-3'>
    <p className=' text-lg font-semibold text-indigo-900'>
    {form?.q3} *
        </p>
        <p className=' text-base text-gray-600'>{res?.q3}</p>

    </CardContent>
    </Card>}

{ form?.q4 && <Card className='border-l-[5px] border-l-blue-400 transition-all duration-200 hover:scale-105 cursor-pointer' sx={{width:{lg:'600px',md:'500px',sm:'400px',xs:'100%'},py:2,transition:'all 0.3s',borderRadius:'10px'}}>
    <CardContent className=' flex flex-col gap-3'>
    <p className=' text-lg font-semibold text-indigo-900'>
    {form?.q4} *
        </p>
        <p className=' text-base text-gray-600'>{res?.q4}</p>

    </CardContent>
    </Card>}

{ form?.q5  && <Card className='border-l-[5px] border-l-blue-400 transition-all duration-200 hover:scale-105 cursor-pointer' sx={{width:{lg:'600px',md:'500px',sm:'400px',xs:'100%'},py:2,transition:'all 0.3s',borderRadius:'10px'}}>
    <CardContent className=' flex flex-col gap-3'>
    <p className=' text-lg font-semibold text-indigo-900'>
    {form?.q5} *
        </p>
        <p className=' text-base text-gray-600'>{res?.q5}</p>

    </CardContent>
    </Card>}
    { form?.link  && <Card className='border-l-[5px] border-l-blue-400 transition-all duration-200 hover:scale-105 cursor-pointer' sx={{width:{lg:'600px',md:'500px',sm:'400px',xs:'100%'},py:2,transition:'all 0.3s',borderRadius:'10px'}}>
    <CardContent className=' flex flex-col gap-3'>
    <p className=' text-lg font-semibold text-indigo-900'>
    {form?.link} *
        </p>
        <a className=' hover:underline transition-all duration-200 text-base text-gray-600' href={res?.link}>{res?.link}</a>

    </CardContent>
    </Card>}

    { form?.filepdf && <Card className='border-l-[5px] border-l-blue-400 transition-all duration-200 hover:scale-100 cursor-pointer' sx={{width:{lg:'600px',md:'500px',sm:'400px',xs:'100%'},py:2,transition:'all 0.3s',borderRadius:'10px'}}>
    <CardContent className=' flex flex-col gap-3'>
    <p className=' text-lg font-semibold text-indigo-900'>
    {form?.filepdf} *
        </p>

<p className=' text-fuchsia-900 text-base flex gap-2'>
<a className=' hover:underline flex gap-1' href={res?.filepdf} target="_blank"  >
  <img className=' w-[50px] h-[50px]' src="https://png.pngtree.com/png-clipart/20220612/original/pngtree-pdf-file-icon-png-png-image_7965915.png" alt="" />
 <p className=' mt-3'>Click Here To open The file</p></a> 
</p>

{/* <a href="http://" target="_blank" rel="noopener noreferrer"></a> */}
    </CardContent>
    </Card>}
    { form?.selectedFile && <Card className='border-l-[5px] border-l-blue-400 transition-all duration-200 hover:scale-100 cursor-pointer' sx={{width:{lg:'600px',md:'500px',sm:'400px',xs:'100%'},py:2,transition:'all 0.3s',borderRadius:'10px'}}>
    <CardContent className=' flex flex-col gap-3'>
    <p className=' text-lg font-semibold text-indigo-900'>
    {form?.fileQ} *
        </p>
        <p className=' text-base text-gray-600'>{res?.fileQ}</p>

{ form?.selectedFile &&  <img className='mt-2 rounded-md'
              src={form?.selectedFile}
              alt="Thumb"
            />}
    </CardContent>
    </Card>}
    <br />
          </List>
        </AccordionDetails>
      </Accordion>
      

       {/* Acordian Ends */}
  </>
    ))}
    <br />
    <br />
    </div>
  )
}

