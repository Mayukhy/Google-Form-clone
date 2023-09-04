import React, { useEffect, useState } from 'react'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import {  Card, CardContent } from '@mui/material'

// import { useDispatch} from 'react-redux';
// import { deleteQ } from '../../redux/action/multiQ';
import axios from 'axios';
export default function McqRes({id,user}) {
  const baseURL = 'http://localhost:5000'
    const [radioquestions,setRadioquestions] = useState([])
    useEffect(()=>{
    const fetchdata = async()=>{
    await axios.get(`${baseURL}/mcqres`)
    .then(({data})=>{
        
        setRadioquestions(data)})
    }
    fetchdata()
    },[])
    const filteredq =radioquestions?.length && radioquestions?.filter((q)=>q?.formId ===id && q?.userId === user  )
    console.log('all mcq',radioquestions)
    console.log(filteredq)
  return (
    <div>
                    { radioquestions?.length && filteredq?.map((qus,idx)=>(
        <Card key={idx} className=' mb-4 border-l-[5px] border-l-blue-400 transition-all duration-200 hover:scale-100 cursor-pointer' sx={{ width: { lg: '600px', md: '500px', sm: '400px', xs: '100%' }, py: 2, transition: 'all 0.3s', borderRadius: '10px' }}>
        <p className=' text-2xl ml-4 font-bold'>{idx+1+'.'}</p>
        <CardContent>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">
           <p className=' text-lg font-semibold'>{qus?.questionText}</p>
           </FormLabel>
            <RadioGroup onChange={(e)=>console.log(e.target.value)}
              aria-labelledby="demo-radio-buttons-group-label"
             
              name="radio-buttons-group"
            >
                <FormControlLabel  checked={qus?.optionText1 === qus?.opAns?true:false} value={qus?.optionText1} disabled ={qus?.optionText1 === qus?.opAns?true:false} control={<Radio />} label={qus?.optionText1} />
                <FormControlLabel  checked={qus?.optionText2 === qus?.opAns?true:false} value={qus?.optionText2} disabled ={qus?.optionText2 === qus?.opAns?true:false} control={<Radio />} label={qus?.optionText2} />
                <FormControlLabel checked={qus?.optionText3 === qus?.opAns?true:false} value={qus?.optionText3} disabled ={qus?.optionText3 === qus?.opAns?true:false} control={<Radio />} label={qus?.optionText3} />
                <FormControlLabel checked={qus?.optionText4 === qus?.opAns?true:false} value={qus?.optionText4} disabled ={qus?.optionText4 === qus?.opAns?true:false} control={<Radio />} label={qus?.optionText4} />
          
              
            </RadioGroup>
          </FormControl>

        </CardContent>
      </Card>
        ))}
    </div>
  )
}
