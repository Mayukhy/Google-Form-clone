import React, { useEffect, useState } from 'react'

// import { useDispatch} from 'react-redux';
// import { deleteQ } from '../../redux/action/multiQ';
import axios from 'axios';
import SingleMcq from './SingleMcq';
export default function Mcqdetails({id,radioquestions,setRadioquestions}) {
    const [mcqresponse,setMcqresponse] = useState(null)

    useEffect(()=>{
    const fetchdata = async()=>{
    await axios.get('https://google-form-clonemayukh.onrender.com/mulq')
    .then(({data})=>{
        setRadioquestions(data)
      })
    }
    fetchdata()
    },[])

    const filteredq =radioquestions?.length && radioquestions?.filter((q)=>q?.formId ===id)
    console.log('all mcq',radioquestions)
    console.log(filteredq)
  return (
    <div className='flex flex-col gap-5 w-full items-center justify-center'>
                    { radioquestions?.length > 0  && filteredq?.map((qus,idx)=>(
                      <SingleMcq setMcqresponse={setMcqresponse} id={id} qus={qus} idx={idx}/>

        ))}
    </div>
  )
}
