import React, { useEffect, useState } from 'react'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import {  Card, CardContent, Button } from '@mui/material'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import axios from 'axios';
import Alert from '@mui/material/Alert';

export default function SingleMcq({qus,idx,id,setMcqresponse}) {
   
  const baseURL = 'http://localhost:5000'
  const[mcqdata,setMcqdata] = useState([])
    const userinfo =localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear()
    const [mcqRes,setMcqres] = useState({
    questionText:`${qus?.questionText}`,
     optionText1:`${qus?.optionText1}`,
     optionText2:`${qus?.optionText2}`,
     optionText3:`${qus?.optionText3}`,
     optionText4:`${qus?.optionText4}`,
     opAns:'',
     username:`${userinfo?.name}`,
     userId:`${userinfo?.sub}`,
     formId:`${id}`
    })
    useEffect(()=>{
    const fetchRes = async()=>{
        await axios.get(`${baseURL}/mcqres`)
        .then(({data})=>setMcqdata(data))
    }
    fetchRes()
    })
    const [isLoggedin,setIsloggedin] = useState(false)
    const [field,setField] = useState(false)
    const alreadyanswered = (mcqdata?.filter((ans)=>ans?.userId ===userinfo?.sub && ans?.questionText ===mcqRes?.questionText)).length
    const [issaved,setIssaved] = useState(false)
    const [ansed,setAnsed] = useState(false)
    const saveAns =()=>{
        const creatans =async()=>{
        await axios.post(`${baseURL}/mcqres`,mcqRes)
        .then(({data})=>{
          setMcqresponse(data)
        })
        }
        if (alreadyanswered ===0 && mcqRes?.opAns && !issaved && userinfo) {
          creatans() 
          setIssaved(true)
        }
        else if(!userinfo){
          setIsloggedin(true)
        }
        else if(alreadyanswered){
         setAnsed(true)
        }
        else setField(true)
        
      }

      setTimeout(() => {
        if (isLoggedin) {
          setIsloggedin(false)
        }
      }, 2000);
      setTimeout(() => {
        if (field) {
          setField(false)
        }
      }, 2000);

      setTimeout(() => {
        if (ansed) {
          setAnsed(false)
        }
      }, 2000);

  return (
    <div className='flex flex-col gap-5 w-full items-center justify-center'>
       {field && <Alert className=' mx-auto flex justify-center items-center' sx={{ width: { lg: '700px', md: '600px', sm: '500px', xs: '100%' },mb:3 }} severity="warning">Answer First</Alert>}
       {ansed && <Alert className=' mx-auto flex justify-center items-center' sx={{ width: { lg: '700px', md: '600px', sm: '500px', xs: '100%' },mb:3 }} severity="success">Already Saved</Alert>}
      {isLoggedin && <Alert className=' mx-auto flex justify-center items-center' sx={{ background: '#ffc9b3', width: { lg: '700px', md: '600px', sm: '500px', xs: '100%' },mb:3 }} severity="error">Login First</Alert>}
              <Card key={idx} className=' mb-4 border-l-[5px] border-l-blue-400 transition-all duration-200 hover:scale-100 cursor-pointer' sx={{ width: { lg: '700px', md: '600px', sm: '500px', xs: '100%' }, py: 2, transition: 'all 0.3s', borderRadius: '10px' }}>
        <p className=' text-2xl ml-4 font-bold'>{idx+1+'.'}</p>
        <CardContent>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">
           <p className=' text-lg font-semibold'>{qus?.questionText}</p>
           </FormLabel>
            <RadioGroup  onChange={(e)=>{
              
              setMcqres({...mcqRes,opAns:e.target.value })
              console.log(mcqRes)
            
            }}
              aria-labelledby="demo-radio-buttons-group-label"
             
              name="radio-buttons-group"
            >
                <FormControlLabel disabled={issaved || alreadyanswered?true:false} value={qus?.optionText1} control={<Radio />} label={qus?.optionText1} />
                <FormControlLabel disabled={issaved || alreadyanswered?true:false} value={qus?.optionText2} control={<Radio />} label={qus?.optionText2} />
                <FormControlLabel disabled={issaved || alreadyanswered?true:false} value={qus?.optionText3} control={<Radio />} label={qus?.optionText3} />
                <FormControlLabel disabled={issaved || alreadyanswered?true:false} value={qus?.optionText4} control={<Radio />} label={qus?.optionText4} />
          
              
            </RadioGroup>
          </FormControl>

        </CardContent>
        <Button onClick={saveAns}  endIcon={<BookmarkBorderIcon/>} sx={{display:'flex',gap:1,ml:2,background:alreadyanswered?'#b3adb8':'#8f44b3' }} variant="contained" color="primary">
              {!issaved && alreadyanswered === 0 ? 'Save':'Saved'}
            </Button>
      </Card>
    </div>
  )
}
