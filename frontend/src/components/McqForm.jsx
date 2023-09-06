import React, { useEffect, useRef, useState } from 'react'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { creatQ, deleteQ} from '../redux/action/multiQ';
import Alert from '@mui/material/Alert';
import { Card, CardContent, TextField, Button,Tooltip, IconButton,Box } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CircularProgress from '@mui/joy/CircularProgress';
import { getForms } from '../redux/action/forms';
export default function McqForm({ userinfo, currentId }) {
  useEffect(()=>{
  dispatch(getForms())
  },[])
  const forms = useSelector((state)=>state.forms)
  console.log("forms Are",forms)
  const btnref = useRef(null)
  const baseURL = 'https://google-form-clonemayukh.onrender.com'
  const { formid } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isLoggedin,setIsloggedin] = useState(false)
  const [error, setError] = useState(false)
  const [field,setField] = useState(false)
  const [radioquestions, setRadioquestions] = useState([])
  const [mcqarray,setMcqarray] = useState([])
 const [isloading,setIsloading] = useState(false)
  const [questionsData, setquestionsData] = useState(
    {
      questionText: '',
      quesstionType: 'radio',
      optionText1: '',
      optionText2: '',
      optionText3: '',
      optionText4: '',
      open: true,
      required: false,
      username: `${userinfo?.name}`,
      userId: `${userinfo?.sub}`,
      formId: `${formid}`,
      opAns: ''
    }
  )
  useEffect(() => {
    setIsloading(true)
    const fetchdata = async()=>{
      await axios.get(`${baseURL}/mulq`)
      .then(({data})=>{
        setMcqarray(data)
      setIsloading(false)})
  }
  fetchdata()
  }, [])

          useEffect(() => {
            setTimeout(() => {
              btnref.current.scrollIntoView({behavior: 'smooth'})  
            }, 500);
           
          }, []);

  // The questions when user comes to edit the form
  const filteredQarray = mcqarray?.filter((q) => q?.formId === currentId)

   // The questions when user comes to create new form
  const instantQArray = mcqarray?.length > 0  && mcqarray?.filter((q) => q?.formId === formid)

  console.log('array',mcqarray)
  console.log('array1',filteredQarray)
  setTimeout(() => {
    if (error) {
      setError(false)
    }
  }, 2000);
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

  if (isloading) {
    return  <Box sx={{ display: 'flex', gap: 2, justifyContent:'center',mt:10, alignItems: 'center', flexWrap: 'wrap' }}><CircularProgress size="lg" /> </Box>
  }
  return (
    <div className=' md:px-0 px-6  relative flex flex-col justify-center items-center mx-auto mt-8 gap-6 animate-[slideleft_0.3s] '>
      {error && <Alert className=' mx-auto flex justify-center items-center' sx={{ background: '#ffc9b3', width: { lg: '700px', md: '600px', sm: '500px', xs: '100%' } }} severity="error">First Complete a Question</Alert>}
      {isLoggedin && <Alert className=' mx-auto flex justify-center items-center' sx={{ background: '#ffc9b3', width: { lg: '700px', md: '600px', sm: '500px', xs: '100%' } }} severity="error">Login First</Alert>}
      <Card className='border-t-[11px] border-t-[#8f38ba] border-l-[5px] border-l-blue-400 transition-all duration-200 hover:scale-100 cursor-pointer' sx={{ width: { lg: '700px', md: '600px', sm: '500px', xs: '100%' }, py: 2, transition: 'all 0.3s', borderRadius: '10px' }}>
        <CardContent>
          <p className='text-3xl placeholder:text-stone-800 font-bold'>Add MCQ to your form</p>

        </CardContent>
      </Card>
      { currentId ?  filteredQarray?.map((qus, idx) => (
        <Card key={idx} className=' relative mb-4 border-l-[5px] border-l-blue-400 transition-all duration-200 hover:scale-100 cursor-pointer' sx={{ width: { lg: '700px', md: '600px', sm: '500px', xs: '100%' }, py: 2, transition: 'all 0.3s', borderRadius: '10px' }}>
          <p className=' text-2xl ml-4 font-bold'>{idx + 1 + '.'}</p>
          <CardContent>
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">
                <p className=' text-lg font-semibold'>{qus?.questionText}</p>
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"

                name="radio-buttons-group"
              >
                <FormControlLabel value={qus?.optionText1} control={<Radio />} label={qus?.optionText1} />
                <FormControlLabel value={qus?.optionText2} control={<Radio />} label={qus?.optionText2} />
                <FormControlLabel value={qus?.optionText3} control={<Radio />} label={qus?.optionText3} />
                <FormControlLabel value={qus?.optionText4} control={<Radio />} label={qus?.optionText4} />


              </RadioGroup>
            </FormControl>
          </CardContent>
        </Card>

      )) :
(      instantQArray?.length > 0 && instantQArray?.map((qus, idx) => (
        <Card key={idx} className=' relative mb-4 border-l-[5px] border-l-blue-400 transition-all duration-200 hover:scale-100 cursor-pointer' sx={{ width: { lg: '700px', md: '600px', sm: '500px', xs: '100%' }, py: 2, transition: 'all 0.3s', borderRadius: '10px' }}>
          <p className=' text-2xl ml-4 font-bold'>{idx + 1 + '.'}</p>
          <CardContent>
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">
                <p className=' text-lg font-semibold'>{qus?.questionText}</p>
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"

                name="radio-buttons-group"
              >
                <FormControlLabel value={qus?.optionText1} control={<Radio />} label={qus?.optionText1} />
                <FormControlLabel value={qus?.optionText2} control={<Radio />} label={qus?.optionText2} />
                <FormControlLabel value={qus?.optionText3} control={<Radio />} label={qus?.optionText3} />
                <FormControlLabel value={qus?.optionText4} control={<Radio />} label={qus?.optionText4} />


              </RadioGroup>
            </FormControl>
{    formid === forms[mcqarray?.length -1]?._id  && <Tooltip  title="Remove Question">
              <IconButton sx={{position:'absolute',bottom:0,right:0,mb:1,mr:1}}  aria-label="" className=' h-[48px] w-[48px]'
                onClick={() => {
                dispatch(deleteQ(qus?._id))
                window.location.reload()
                }}>
                <DeleteForeverIcon className=' text-red-600' />
              </IconButton>
            </Tooltip>}
          </CardContent>
        </Card>

      )))
}
      
      {radioquestions?.map((qus, idx) => (
        <Card className=' border-l-[5px] border-l-blue-400 transition-all duration-200 hover:scale-100 cursor-pointer' sx={{ width: { lg: '700px', md: '600px', sm: '500px', xs: '100%' }, py: 2, transition: 'all 0.3s', borderRadius: '10px' }}>
          <p className=' text-2xl ml-4 font-bold'>{currentId?filteredQarray?.length+1 +'.':instantQArray?instantQArray?.length+1 +'.': idx + 1 + '.'}</p>
          <CardContent>
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">
                <p className=' text-lg font-semibold'>{qus?.questionText}</p>
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
              >
                <FormControlLabel value={qus?.optionText1} control={<Radio />} label={qus?.optionText1} />
                <FormControlLabel value={qus?.optionText2} control={<Radio />} label={qus?.optionText2} />
                <FormControlLabel value={qus?.optionText3} control={<Radio />} label={qus?.optionText3} />
                <FormControlLabel value={qus?.optionText4} control={<Radio />} label={qus?.optionText4} />


              </RadioGroup>
            </FormControl>

          </CardContent>
        </Card>
      ))}
            {field && <Alert className=' mx-auto flex justify-center items-center' sx={{ width: { lg: '700px', md: '600px', sm: '500px', xs: '100%' } }} severity="warning">Please Fill all the fields</Alert>}
      <Card className=' border-l-[5px] border-l-blue-400 transition-all duration-200 hover:scale-100 cursor-pointer' sx={{ width: { lg: '700px', md: '600px', sm: '500px', xs: '100%' }, py: 2, transition: 'all 0.3s', borderRadius: '10px' }}>
        <CardContent>
          <TextField
            value={questionsData?.questionText} onChange={(e) => setquestionsData({ ...questionsData, questionText: e.target.value })}
            sx={{ width: '60%' }} required placeholder='type here' id="standard-basic" label="Your question" variant="standard" />


          <div className='flex '>
            <FormControlLabel className=' mt-3.5' value='' disabled control={<Radio />} label='' /> <TextField
              value={questionsData?.optionText1} onChange={(e) => setquestionsData({ ...questionsData, optionText1: e.target.value })}
              sx={{ width: '40%' }} placeholder='option title' id="standard-basic" label="option 1" variant="standard" />
          </div>
          <div className='flex '>
            <FormControlLabel className=' mt-3.5' value='' disabled control={<Radio />} label='' /> <TextField
              value={questionsData?.optionText2} onChange={(e) => setquestionsData({ ...questionsData, optionText2: e.target.value })}
              sx={{ width: '40%' }} placeholder='option title' id="standard-basic" label="option 2" variant="standard" />
          </div>

          <div className='flex '>
            <FormControlLabel className=' mt-3.5' value='' disabled control={<Radio />} label='' /> <TextField
              value={questionsData?.optionText3} onChange={(e) => setquestionsData({ ...questionsData, optionText3: e.target.value })}
              sx={{ width: '40%' }} placeholder='option title' id="standard-basic" label="option 3" variant="standard" />
          </div>

          <div className='flex '>
            <FormControlLabel className=' mt-3.5' value='' disabled control={<Radio />} label='' /> <TextField
              value={questionsData?.optionText4} onChange={(e) => setquestionsData({ ...questionsData, optionText4: e.target.value })}
              sx={{ width: '40%' }} placeholder='option title' id="standard-basic" label="option 4" variant="standard" />
          </div>


          <Button ref={btnref} sx={{ mt: 3, mb: '-20px' }} onClick={() => {
            if (questionsData?.questionText && questionsData?.optionText1 && questionsData?.optionText2 && questionsData?.optionText3 && questionsData?.optionText4 && userinfo) {
              setRadioquestions([...radioquestions, questionsData])
              dispatch(creatQ(questionsData))
              setquestionsData(
                {
                  questionText: '',
                  optionText1: '',
                  optionText2: '',
                  optionText3: '',
                  optionText4: '',
                  username: `${userinfo?.name}`,
                  userId: `${userinfo?.sub}`,
                  formId: `${formid}`
                })
                window.location.reload()
                
            }
            else if(!questionsData?.questionText || !questionsData?.optionText1 || !questionsData?.optionText2 || !questionsData?.optionText3 || !questionsData?.optionText4){
             setField(true)
            }
            else setIsloggedin(true)
          }} variant="contained" color="secondary">
            Add Question
          </Button>


        </CardContent>
      </Card>
      <Button
        sx={{ width: { lg: '700px', md: '600px', sm: '500px', xs: '100%' } }}
        onClick={() => {
          if (radioquestions[0]?.questionText !== '' && radioquestions[0]?.optionText1 !== '' && radioquestions[0]?.optionText2 !== '' && radioquestions[0]?.optionText3 !== '' && radioquestions[0]?.optionText4 !== '' && userinfo) {
            navigate('/')
          }
          else if(!userinfo){
             setIsloggedin(true)
          }
          else setError(true)
        }} variant="contained" color="secondary">
       { currentId?'Edit Form':' Create Form'}
      </Button>
      <br />
      <br />
    </div>
  )
}
