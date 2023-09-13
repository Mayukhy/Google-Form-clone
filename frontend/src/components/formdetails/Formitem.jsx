import React, { useEffect, useRef, useState } from 'react'
import { useDispatch} from 'react-redux'
import CircularProgress from '@mui/joy/CircularProgress';
import {Button, Card, CardContent, TextField, CardMedia} from '@mui/material'
import { creatResponse} from '../../redux/action/response';
import { Box } from '@mui/joy';
import Alert from '@mui/material/Alert';
import FileBase from 'react-file-base64'
import { useNavigate } from 'react-router-dom';
import Mcqdetails from './mcq/Mcqdetails';
import axios from 'axios';

export default function Formitem({userinfo,id,form}) {
    const fieldRef = useRef()
    const [reqfields,setReqfields] = useState(false)
    const baseURL = 'https://google-form-clonemayukh.onrender.com'
    const navigate = useNavigate()
    //for storing the mcq response
    const [allq,setAllq] = useState([])
    //for storing the mcq question
    const [allque,setAllque] = useState([])
    const [radioquestions,setRadioquestions] = useState([])
    const [isLoggedin, setisloggedin] = useState(true)
    const [file,setFile] = useState()
    const [errorfiletype,setErrorfiletype] = useState(false)
    const [resdata,setResdata] = useState({name:'',address:'',q3:'',q4:'',q5:'',fileQ:'',username:`${userinfo?.name}`,userId:`${userinfo?.sub}`,formId:`${id}`,profileimg:`${userinfo?.picture}`})
    const dispatch = useDispatch()
    
    useEffect(()=>{
        const fetchmcq= async()=>{
            await axios.get(`${baseURL}/mulq`)
            .then(({data})=>setAllque(data))
            }
            fetchmcq()
    },[])
    useEffect(()=>{
    const fetchmcqres= async()=>{
    await axios.get(`${baseURL}/mcqres`)
    .then(({data})=>setAllq(data))
    }
    fetchmcqres()
    },[])


    const submitform=()=>{
        if (userinfo) {
            dispatch(creatResponse(resdata))
            console.log(resdata)
            navigate(`/success/${form?.title}`)
        }
        else{
            navigate('/error')
        }
      }

      setTimeout(() => {
        if (!isLoggedin) {
          setisloggedin(true)
        }
      }, 2000);

      if (reqfields) {
        setTimeout(() => {
            fieldRef?.current?.scrollIntoView( { behavior: "smooth" })
        }, 100);
       
      }
              // for preventing accidental reload
              useEffect(()=>{
                const unloadCallback = (event) => {      
                    const e = event || window.event;
                    //console.log(e)
                   
                    e.preventDefault();
                    if (e) {
                      e.returnValue = ''
                    }
                    return '';
                   
                      
                };
                
                window.addEventListener("beforeunload", unloadCallback);
                return () => {
                  //cleanup function
                  window.removeEventListener("beforeunload", unloadCallback);
                }
                
              },[])
      const headerimage = [
        'https://storage.googleapis.com/gweb-uniblog-publish-prod/images/007-BTS-Assignments-Header-FM.width-1300.png',
        'https://wpimg.pixelied.com/blog/wp-content/uploads/2021/08/30114524/Google-Form-Header-Image-Size-Featured-Image.png',
        'https://hnrcbank.in/images/DigitalForms/form3.jpg',
        'https://blog.bit.ai/wp-content/uploads/2018/06/How-to-Embed-Google-Form-to-Your-Documents-Blog-Banner.png',
        'https://form-publisher.com/blog/content/images/2023/01/How-to-Make-your-own-Google-Form.png',
        'https://storage.googleapis.com/gweb-uniblog-publish-prod/original_images/B2S-BlogHeader-ap_v05-2880x1200.jpg',
        'https://i.pinimg.com/originals/fd/82/6b/fd826bb8fa5ebfde6e2c98a4e7672ca7.png',
        'https://capacity.com/wp-content/uploads/2021/09/Education-Ultimate-Guide-Header.png',
        'https://d2slcw3kip6qmk.cloudfront.net/marketing/blog/2017Q1/lucidchart-edu-lesson-plans-header.png',
        'https://info.ehl.edu/hubfs/Blog-EHL-Insights/Blog-Header-EHL-Insights/e_learning_course.jpg'

      ]
      let banner = headerimage[Math.floor(Math.random()*10)]
      
      // No of questions for a Specific formId
      const qlength =( allque?.filter((q)=> q?.formId ===id)).length
       // No of response for the question
      const allreadyResponed =( allq?.filter((q)=>q?.userId===userinfo?.sub && q?.formId ===id)).length
  return (
    <>
    {!isLoggedin && <Alert className=' mx-auto flex justify-center items-center' sx={{ background: '#ffc9b3', width: { lg: '700px', md: '600px', sm: '500px', xs: '100%' } }} severity="error">Please Lofin First</Alert>}
    {!form?.title ? <Box sx={{ display: 'flex', gap: 2, justifyContent:'center',pt:10, alignItems: 'center', flexWrap: 'wrap',background:'rgb(237 233 254)' }}><CircularProgress size="lg" /> </Box>:
    <div  className=' flex flex-col justify-center items-center mx-auto pt-8 px-5 gap-6 animate-[slideleft_0.3s]'>

<Card className=' transition-all duration-200 hover:scale-105 cursor-pointer' sx={{width:{lg:'700px',md:'600px',sm:'500px',xs:'100%'},transition:'all 0.3s',borderRadius:'10px'}}>
<img className=' object-cover w-full md:h-[200px] lg:h-[300px] h-[150px]' src={banner} alt="" />
        
        </Card>

{ allreadyResponed !== qlength && qlength >0  && <Card className='border-t-[11px] border-t-[#8f38ba] transition-all duration-200 hover:scale-105 cursor-pointer' sx={{width:{lg:'700px',md:'600px',sm:'500px',xs:'100%'},py:2,transition:'all 0.3s',borderRadius:'10px'}}>
        <CardContent>
            <p className=' text-4xl font-medium'>
            {form?.title}
            </p>
        </CardContent>
        </Card>}
        { qlength === 0  && <Card className='border-t-[11px] border-t-[#8f38ba] transition-all duration-200 hover:scale-105 cursor-pointer' sx={{width:{lg:'700px',md:'600px',sm:'500px',xs:'100%'},py:2,transition:'all 0.3s',borderRadius:'10px'}}>
        <CardContent>
            <p className=' text-4xl font-medium'>
            {form?.title}
            </p>
        </CardContent>
        </Card>}

        {reqfields && <Alert ref={fieldRef} className=' mx-auto flex justify-center items-center' sx={{ width: { lg: '700px', md: '600px', sm: '500px', xs: '100%' },mb:3, background:'#fab79b' }} severity="error">Fill The required Fields first</Alert>}
      
    <form onSubmit={submitform} className=' flex flex-col gap-5 w-full items-center justify-center ' action="">
        {/* for when mcqs are present in the form */}
{ allreadyResponed !== qlength && qlength>0  &&  <div className=' flex flex-col gap-5 w-full items-center justify-center'>
    <Card className=' border-l-[5px] border-l-blue-400 transition-all duration-200 hover:scale-105 cursor-pointer' sx={{width:{lg:'700px',md:'600px',sm:'500px',xs:'100%'},py:2,transition:'all 0.3s',borderRadius:'10px'}}>
        <CardContent className=' flex flex-col gap-3'>
        <p className=' text-lg font-semibold  text-indigo-900'>
            {form?.name} *
            </p>
        <TextField 
        value={resdata?.name} onChange={(e)=>setResdata({...resdata,name:e.target.value})}
        sx={{width:'60%'}} required placeholder='type here' id="standard-basic" variant="standard" />
    
        </CardContent>
        </Card>
    {form?.address && <Card className='border-l-[5px] border-l-blue-400 transition-all duration-200 hover:scale-105 cursor-pointer' sx={{width:{lg:'700px',md:'600px',sm:'500px',xs:'100%'},py:2,transition:'all 0.3s',borderRadius:'10px'}}>
        <CardContent className=' flex flex-col gap-3'>
        <p className=' text-lg font-semibold text-indigo-900'>
        {form?.address} *
            </p>
        <TextField 
        value={resdata?.address} onChange={(e)=>setResdata({...resdata,address:e.target.value})}
        sx={{width:'60%'}} required placeholder='type here' id="standard-basic" variant="standard" />
    
        </CardContent>
        </Card>}
    
    { form?.q3 && <Card className='border-l-[5px] border-l-blue-400 transition-all duration-200 hover:scale-105 cursor-pointer' sx={{width:{lg:'700px',md:'600px',sm:'500px',xs:'100%'},py:2,transition:'all 0.3s',borderRadius:'10px'}}>
        <CardContent className=' flex flex-col gap-3'>
        <p className=' text-lg font-semibold text-indigo-900'>
        {form?.q3} *
            </p>
        <TextField 
        value={resdata?.q3} onChange={(e)=>setResdata({...resdata,q3:e.target.value})}
        sx={{width:'60%'}} required placeholder='type here' id="standard-basic" variant="standard" />
    
        </CardContent>
        </Card>}
    
    { form?.q4 && <Card className='border-l-[5px] border-l-blue-400 transition-all duration-200 hover:scale-105 cursor-pointer' sx={{width:{lg:'700px',md:'600px',sm:'500px',xs:'100%'},py:2,transition:'all 0.3s',borderRadius:'10px'}}>
        <CardContent className=' flex flex-col gap-3'>
        <p className=' text-lg font-semibold text-indigo-900'>
        {form?.q4} *
            </p>
        <TextField 
        value={resdata?.q4} onChange={(e)=>setResdata({...resdata,q4:e.target.value})}
        sx={{width:'60%'}} required placeholder='type here' id="standard-basic" variant="standard" />
    
        </CardContent>
        </Card>}
    
    { form?.q5 && <Card className='border-l-[5px] border-l-blue-400 transition-all duration-200 hover:scale-105 cursor-pointer' sx={{width:{lg:'700px',md:'600px',sm:'500px',xs:'100%'},py:2,transition:'all 0.3s',borderRadius:'10px'}}>
        <CardContent className=' flex flex-col gap-3'>
        <p className=' text-lg font-semibold text-indigo-900'>
        {form?.q5} *
            </p>
        <TextField 
        value={resdata?.q5} onChange={(e)=>setResdata({...resdata,q5:e.target.value})}
        sx={{width:'60%'}} required placeholder='type here' id="standard-basic" variant="standard" />
    
        </CardContent>
        </Card>}
    
        { form?.selectedFile && form?.fileQ && <Card className='border-l-[5px] border-l-blue-400 transition-all duration-200  cursor-pointer' sx={{width:{lg:'700px',md:'600px',sm:'500px',xs:'100%'},py:2,transition:'all 0.3s',borderRadius:'10px'}}>
        <CardContent className=' flex flex-col gap-3'>
        <p className=' text-lg font-semibold text-indigo-900'>
        {form?.fileQ} *
            </p>
        <TextField 
        value={resdata?.fileQ} onChange={(e)=>setResdata({...resdata,fileQ:e.target.value})}
        sx={{width:'60%'}} required placeholder='type here' id="standard-basic" variant="standard" />
    
        <img className='mt-2 rounded-md'
                  src={form?.selectedFile}
                  alt="Thumb"
                />
        </CardContent>
        </Card>}

        { form?.link && <Card className='border-l-[5px] border-l-blue-400 transition-all duration-200  cursor-pointer' sx={{width:{lg:'700px',md:'600px',sm:'500px',xs:'100%'},py:2,transition:'all 0.3s',borderRadius:'10px'}}>
        <CardContent className=' flex flex-col gap-3'>
        <p className=' text-lg font-semibold text-indigo-900'>
        {form?.link} *
            </p>
        <TextField 
        value={resdata?.link} onChange={(e)=>setResdata({...resdata,link:e.target.value})}
        sx={{width:'60%'}} required placeholder='Give a valid link' id="standard-basic" variant="standard" />
        </CardContent>
        </Card>}

        { form?.filepdf && <Card className='border-l-[5px] border-l-blue-400 transition-all duration-200  cursor-pointer' sx={{width:{lg:'700px',md:'600px',sm:'500px',xs:'100%'},py:2,transition:'all 0.3s',borderRadius:'10px'}}>
        <CardContent className=' flex flex-col gap-3'>
        <p className=' text-lg font-semibold text-indigo-900'>
        {form?.filepdf}(PDF only) *
            </p>
     <FileBase
     type= 'file'
     multiple={false}

     onChange={(e)=>{
        const allowedTypes = ["application/pdf"];
        if (!allowedTypes.includes(e.target.files[0].type)) {
          setErrorfiletype(true)
          alert('wrong file type')
          return;
        }
     }}
     onDone={({base64})=>{setResdata({...resdata,filepdf:base64})
    setFile(base64)
    console.log(base64.target.files[0])
  }}
    />
        </CardContent>
        </Card>}
        </div> }

        {/* when mcqs are not present in the form */}
        {qlength === 0 &&  <div className=' flex flex-col gap-5 w-full items-center justify-center'>
    <Card className=' border-l-[5px] border-l-blue-400 transition-all duration-200 hover:scale-105 cursor-pointer' sx={{width:{lg:'700px',md:'600px',sm:'500px',xs:'100%'},py:2,transition:'all 0.3s',borderRadius:'10px'}}>
        <CardContent className=' flex flex-col gap-3'>
        <p className=' text-lg font-semibold  text-indigo-900'>
            {form?.name} *
            </p>
        <TextField 
        value={resdata?.name} onChange={(e)=>setResdata({...resdata,name:e.target.value})}
        sx={{width:'60%'}} required placeholder='type here' id="standard-basic" variant="standard" />
    
        </CardContent>
        </Card>
    {form?.address && <Card className='border-l-[5px] border-l-blue-400 transition-all duration-200 hover:scale-105 cursor-pointer' sx={{width:{lg:'700px',md:'600px',sm:'500px',xs:'100%'},py:2,transition:'all 0.3s',borderRadius:'10px'}}>
        <CardContent className=' flex flex-col gap-3'>
        <p className=' text-lg font-semibold text-indigo-900'>
        {form?.address} *
            </p>
        <TextField 
        value={resdata?.address} onChange={(e)=>setResdata({...resdata,address:e.target.value})}
        sx={{width:'60%'}} required placeholder='type here' id="standard-basic" variant="standard" />
    
        </CardContent>
        </Card>}
    
    { form?.q3 && <Card className='border-l-[5px] border-l-blue-400 transition-all duration-200 hover:scale-105 cursor-pointer' sx={{width:{lg:'700px',md:'600px',sm:'500px',xs:'100%'},py:2,transition:'all 0.3s',borderRadius:'10px'}}>
        <CardContent className=' flex flex-col gap-3'>
        <p className=' text-lg font-semibold text-indigo-900'>
        {form?.q3} *
            </p>
        <TextField 
        value={resdata?.q3} onChange={(e)=>setResdata({...resdata,q3:e.target.value})}
        sx={{width:'60%'}} required placeholder='type here' id="standard-basic" variant="standard" />
    
        </CardContent>
        </Card>}
    
    { form?.q4 && <Card className='border-l-[5px] border-l-blue-400 transition-all duration-200 hover:scale-105 cursor-pointer' sx={{width:{lg:'700px',md:'600px',sm:'500px',xs:'100%'},py:2,transition:'all 0.3s',borderRadius:'10px'}}>
        <CardContent className=' flex flex-col gap-3'>
        <p className=' text-lg font-semibold text-indigo-900'>
        {form?.q4} *
            </p>
        <TextField 
        value={resdata?.q4} onChange={(e)=>setResdata({...resdata,q4:e.target.value})}
        sx={{width:'60%'}} required placeholder='type here' id="standard-basic" variant="standard" />
    
        </CardContent>
        </Card>}
    
    { form?.q5 && <Card className='border-l-[5px] border-l-blue-400 transition-all duration-200 hover:scale-105 cursor-pointer' sx={{width:{lg:'700px',md:'600px',sm:'500px',xs:'100%'},py:2,transition:'all 0.3s',borderRadius:'10px'}}>
        <CardContent className=' flex flex-col gap-3'>
        <p className=' text-lg font-semibold text-indigo-900'>
        {form?.q5} *
            </p>
        <TextField 
        value={resdata?.q5} onChange={(e)=>setResdata({...resdata,q5:e.target.value})}
        sx={{width:'60%'}} required placeholder='type here' id="standard-basic" variant="standard" />
    
        </CardContent>
        </Card>}
    
        { form?.selectedFile && form?.fileQ && <Card className='border-l-[5px] border-l-blue-400 transition-all duration-200  cursor-pointer' sx={{width:{lg:'700px',md:'600px',sm:'500px',xs:'100%'},py:2,transition:'all 0.3s',borderRadius:'10px'}}>
        <CardContent className=' flex flex-col gap-3'>
        <p className=' text-lg font-semibold text-indigo-900'>
        {form?.fileQ} *
            </p>
        <TextField 
        value={resdata?.fileQ} onChange={(e)=>setResdata({...resdata,fileQ:e.target.value})}
        sx={{width:'60%'}} required placeholder='type here' id="standard-basic" variant="standard" />
    
        <img className='mt-2 rounded-md'
                  src={form?.selectedFile}
                  alt="Thumb"
                />
        </CardContent>
        </Card>}

        { form?.link && <Card className='border-l-[5px] border-l-blue-400 transition-all duration-200  cursor-pointer' sx={{width:{lg:'700px',md:'600px',sm:'500px',xs:'100%'},py:2,transition:'all 0.3s',borderRadius:'10px'}}>
        <CardContent className=' flex flex-col gap-3'>
        <p className=' text-lg font-semibold text-indigo-900'>
        {form?.link} *
            </p>
        <TextField 
        value={resdata?.link} onChange={(e)=>setResdata({...resdata,link:e.target.value})}
        sx={{width:'60%'}} required placeholder='Give a valid link' id="standard-basic" variant="standard" />
        </CardContent>
        </Card>}

        { form?.filepdf && <Card className='border-l-[5px] border-l-blue-400 transition-all duration-200  cursor-pointer' sx={{width:{lg:'700px',md:'600px',sm:'500px',xs:'100%'},py:2,transition:'all 0.3s',borderRadius:'10px'}}>
        <CardContent className=' flex flex-col gap-3'>
        <p className=' text-lg font-semibold text-indigo-900'>
        {form?.filepdf}(PDF only) *
            </p>
     <FileBase
     type= 'file'
     multiple={false}

     onChange={(e)=>{
        const allowedTypes = ["application/pdf"];
        if (!allowedTypes.includes(e.target.files[0].type)) {
          setErrorfiletype(true)
          alert('wrong file type')
          return;
        }
     }}
     onDone={({base64})=>{setResdata({...resdata,filepdf:base64})
    setFile(base64)
    console.log(base64.target.files[0])
  }}

    />
        </CardContent>
        </Card>}
        </div> }

     { qlength !==0 &&
      <div className='flex flex-col gap-5 w-full items-center justify-center' >  
        { allreadyResponed !== qlength  ? <Mcqdetails reqfields={reqfields} setReqfields={setReqfields} fieldRef={fieldRef} radioquestions={radioquestions} resdata={resdata} setRadioquestions={setRadioquestions} form={form} id={id}/>
       :  <Card className='border-t-[11px] mt-10 border-t-[#8f38ba] h-[200px] transition-all duration-200 hover:scale-105 cursor-pointer' sx={{width:{lg:'700px',md:'600px',sm:'500px',xs:'100%'},py:2,transition:'all 0.3s',borderRadius:'10px'}}>
       <CardContent className=' flex flex-col gap-5'>
           <p className=' text-4xl font-medium'>
           {form?.title}
           </p>
           <p className=' text-lg  text-fuchsia-900 font-medium'>
           Your Response has been Recorded
           </p>
           <p onClick={()=>navigate(-1)} className=' text-md text-red-500 font-normal'>
          Can't Give another response
           </p>
       </CardContent>
       </Card>}
       </div>
       }
        {allreadyResponed !==qlength && qlength>0  && <Button type='submit' onClick={()=>{
            if (userinfo) {
                setisloggedin(true)
            }
            else setisloggedin(false)
        }}  sx={{width:{lg:'700px',md:'600px',sm:'500px',xs:'100%'}}}  className=' w-full'  variant="contained" color='secondary'>
            Submit Response
          </Button>}
          { qlength === 0 && <Button type='submit' onClick={()=>{
            if (userinfo) {
                setisloggedin(true)
            }
            else setisloggedin(false)
        }}  sx={{width:{lg:'700px',md:'600px',sm:'500px',xs:'100%'}}}  className=' w-full'  variant="contained" color='secondary'>
            Submit Response
          </Button>}
          </form>
          <br />
          <br />
          <br />
        </div> }


    </>
  )
}
