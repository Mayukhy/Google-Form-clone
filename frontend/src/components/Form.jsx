import { Box, Card, CardContent, TextField, IconButton, Tooltip, Snackbar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { useDispatch, useSelector } from 'react-redux';
import { creatForm, getForms, updateForm } from '../redux/action/forms';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditNoteIcon from '@mui/icons-material/EditNote';
import ImageIcon from '@mui/icons-material/Image';
import FileBase from 'react-file-base64'
import HideImageIcon from '@mui/icons-material/HideImage';
import AddLinkIcon from '@mui/icons-material/AddLink';
import LinkOffIcon from '@mui/icons-material/LinkOff';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import FolderOffIcon from '@mui/icons-material/FolderOff';
import DatasetLinkedIcon from '@mui/icons-material/DatasetLinked';
import SourceIcon from '@mui/icons-material/Source';
import NextPlanIcon from '@mui/icons-material/NextPlan';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';

export default function Form({ formdata, setFormdata, currentId, setCurrentId, userinfo }) {
  const dispatch = useDispatch()
  const form = useSelector((state) => currentId ? state?.forms?.find((form) => form?._id === currentId) : null)
  const forms = useSelector((state) => state.forms)
  const navigate = useNavigate()
  const [isLoggedin, setisloggedin] = useState(true)
  const [isFilled, setIsfilled] = useState(false)
  const [file, setFile] = useState()
  const [isSaved, setIssaved] = useState(false)
  const [notsaved,setNotsaved] = useState(true)


  useEffect(() => {
    if (form) {
      setFormdata(form)
    }
  }, [form])

  const [mobilemenu, setMobilemenu] = useState(false)

  const [open, setOpen] = React.useState(false);


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handelsubmit = (e) => {
    e.preventDefault()
    console.log(formdata)
    if (userinfo && formdata?.title !== '' && formdata?.name !== '') {
      if (currentId) {
        dispatch(updateForm(currentId, formdata))
        navigate('/')
      }
      else {
        dispatch(creatForm({title:`${formdata?.title?formdata?.title:''}`,name:`${formdata?.name?formdata?.name:''}`,address:`${formdata?.address?formdata?.address:''}`,q3:`${formdata?.q3?formdata?.q3:''}`,q4:`${formdata?.q4?formdata?.q4:''}`,q5:`${formdata?.q5?formdata?.q5:''}`,fileQ:`${formdata?.fileQ? formdata?.fileQ:''}`,filepdf:`${formdata?.filepdf? formdata?.filepdf:''}`,selectedFile:`${formdata?.selectedFile? formdata?.selectedFile:''}`,username:`${userinfo?.name}`,userId:`${userinfo?.sub}`}))
        navigate('/')
      }
    }
    else if (!userinfo)
      setisloggedin(false)
    else setIsfilled(true)
  }

  const handelsave = (e) => {
    e.preventDefault()
    if (userinfo && formdata?.title !== '' && formdata?.name !== '') {
      if (currentId) {
        dispatch(updateForm(currentId, formdata))
        setOpen(true);
        setIssaved(true)
      }
      else {
        dispatch(creatForm(formdata))
        setOpen(true);
        setIssaved(true)
        setFormdata({title:'',name:'',address:'',q3:'',q4:'',q5:'',fileQ:'',link:''})
      }
    }

    else if (!userinfo)
      setisloggedin(false)
    else setIsfilled(true)
  }

  setTimeout(() => {
    if (!isLoggedin) {
      setisloggedin(true)
    }
  }, 2000);


  setTimeout(() => {
    if (isFilled) {
      setIsfilled(false)
    }
  }, 2000);


  useEffect(() => {
    dispatch(getForms())
    console.log(forms)
  }, [])

  setTimeout(() => {
    if (!notsaved) {
      setNotsaved(true)
    }
  }, 2000);

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

  const [addq2, setAddq2] = useState(false)
  const [addq3, setAddq3] = useState(false)
  const [addq4, setAddq4] = useState(false)
  const [addq5, setAddq5] = useState(false)
  const [addimg, setAddimg] = useState(false)
  const [addfile, setAddfile] = useState(false)
  const [addlink, setAddlink] = useState(false)

  return (
    <div onClick={() => setMobilemenu(false)} className=' flex flex-col bg-violet-100 w-[100%] min-h-screen'>
      {!isLoggedin && <Alert className=' mx-auto flex justify-center items-center' sx={{ background: '#ffc9b3', width: { lg: '700px', md: '600px', sm: '500px', xs: '100%' } }} severity="error">Please Login First</Alert>}
      {isFilled && <Alert className=' mx-auto flex justify-center items-center' sx={{ width: { lg: '700px', md: '600px', sm: '500px', xs: '100%' } }} severity="warning">Please Fill the Tile & atleast one field</Alert>}
      {!notsaved && <Alert className=' mx-auto flex justify-center items-center' sx={{ background: '#ffc9b3', width: { lg: '700px', md: '600px', sm: '500px', xs: '100%' } }} severity="error">First click on Save</Alert>}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert severity="success">Saved Successfully</Alert></Snackbar>
      <div className=' flex flex-row-reverse'>
        <Tooltip title="Add More">
          <IconButton sx={{ m: 1, display: { md: 'none', xs: 'flex' }, mb: '-30px' }} className=' scale-110 w-[50px] h-[50px] flex  ' aria-label=""
            onClick={(e) => {
              e.stopPropagation()
              setMobilemenu(!mobilemenu)
            }}>
            <ExpandCircleDownIcon />
          </IconButton>
        </Tooltip>
      </div>

      {/* mobilemenu */}
      {mobilemenu && <Box sx={{ left: { sm: '80%', xs: '75%' }, top: { sm: '75px', xs: '65px' }, background: 'linear-gradient(90deg, rgba(219,231,250,0.5243347338935574) 0%, rgba(219,231,250,0.5439425770308124) 100%)' }} className=' backdrop-blur-lg animate-[slideright_0.6s] absolute top-[75px] bg-slate-400  z-50'>
        {!addq2 && <Card onClick={() => setAddq2(true)} sx={{ transition: 'all 0.3s' }} className='text-center pt-1 absolute top-0 w-[50px] h-[50px] right-[-60px] transition-all duration-200 hover:scale-110 cursor-pointer'>
          {!currentId ? <Tooltip title="Add Question">
            <IconButton aria-label="">
              <AddCircleOutlineIcon />
            </IconButton>
          </Tooltip> :
            <Tooltip title="Edit and Show Question">
              <IconButton aria-label="">
                <EditNoteIcon />
              </IconButton>
            </Tooltip>
          }
        </Card>}
        {addq2 && <Card onClick={() => setAddq3(true)} sx={{ transition: 'all 0.3s' }} className='text-center pt-1 absolute top-0 w-[50px] h-[50px] right-[-60px] transition-all duration-200 hover:scale-110 cursor-pointer'>
          {!currentId ? <Tooltip title="Add Question">
            <IconButton aria-label="">
              <AddCircleOutlineIcon />
            </IconButton>
          </Tooltip> :
            <Tooltip title="Edit and Show Question">
              <IconButton aria-label="">
                <EditNoteIcon />
              </IconButton>
            </Tooltip>
          }
        </Card>}
        {addq2 && addq3 && <Card onClick={() => setAddq4(true)} sx={{ transition: 'all 0.3s' }} className='text-center pt-1 absolute top-0 w-[50px] h-[50px] right-[-60px] transition-all duration-200 hover:scale-110 cursor-pointer'>
          {!currentId ? <Tooltip title="Add Question">
            <IconButton aria-label="">
              <AddCircleOutlineIcon />
            </IconButton>
          </Tooltip> :
            <Tooltip title="Edit and Show Question">
              <IconButton aria-label="">
                <EditNoteIcon />
              </IconButton>
            </Tooltip>
          }
        </Card>}
        {addq2 && addq3 && addq4 && !addq5 && <Card onClick={() => setAddq5(true)} sx={{ transition: 'all 0.3s' }} className='text-center pt-1 absolute top-0 w-[50px] h-[50px] right-[-60px] transition-all duration-200 hover:scale-110 cursor-pointer'>
          {!currentId ? <Tooltip title="Add Question">
            <IconButton aria-label="">
              <AddCircleOutlineIcon />
            </IconButton>
          </Tooltip> :
            <Tooltip title="Edit and Show Question">
              <IconButton aria-label="">
                <EditNoteIcon />
              </IconButton>
            </Tooltip>
          }
        </Card>}
        {!addimg ? <Card onClick={() => setAddimg(true)} sx={{ transition: 'all 0.3s' }} className='text-center pt-1 absolute top-[60px] w-[50px] h-[50px] right-[-60px] transition-all duration-200 hover:scale-110 cursor-pointer'>
          <Tooltip title="Add Image">
            <IconButton aria-label="">
              <ImageIcon />
            </IconButton>
          </Tooltip>
        </Card> :
          <Card onClick={() => {
            setAddimg(false)
            setFile(null)
            setFormdata({ ...formdata, fileQ: '' })
          }} sx={{ transition: 'all 0.3s' }} className='text-center pt-1 absolute top-[60px] w-[50px] h-[50px] right-[-60px] transition-all duration-200 hover:scale-110 cursor-pointer'>
            <Tooltip title="Remove Image">
              <IconButton aria-label="">
                <HideImageIcon />
              </IconButton>
            </Tooltip>
          </Card>}
        {!addlink ? <Card onClick={() => setAddlink(true)} sx={{ transition: 'all 0.3s' }} className='text-center pt-1 absolute top-[120px] w-[50px] h-[50px] right-[-60px] transition-all duration-200 hover:scale-110 cursor-pointer'>
          <Tooltip title="Allow user to add Link">
            <IconButton aria-label="">
              <AddLinkIcon />
            </IconButton>
          </Tooltip>
        </Card> :
          <Card onClick={() => {
            setAddlink(false)
            setFormdata({ ...formdata, link: '' })
          }} sx={{ transition: 'all 0.3s' }} className='text-center pt-1 absolute top-[120px] w-[50px] h-[50px] right-[-60px] transition-all duration-200 hover:scale-110 cursor-pointer'>
            <Tooltip title="Remove field">
              <IconButton aria-label="">
                <LinkOffIcon />
              </IconButton>
            </Tooltip>
          </Card>}
        {!addfile ? <Card onClick={() => setAddfile(true)} sx={{ transition: 'all 0.3s' }} className='text-center pt-1 absolute top-[180px] w-[50px] h-[50px] right-[-60px] transition-all duration-200 hover:scale-110 cursor-pointer'>
          <Tooltip title="Allow user to upload file">
            <IconButton aria-label="">
              <PictureAsPdfIcon />
            </IconButton>
          </Tooltip>
        </Card> :
          <Card onClick={() => {
            setAddfile(false)
            setFormdata({ ...formdata, filepdf: '' })
          }} sx={{ transition: 'all 0.3s' }} className='text-center pt-1 absolute top-[180px] w-[50px] h-[50px] right-[-60px] transition-all duration-200 hover:scale-110 cursor-pointer'>
            <Tooltip title="Remove field">
              <IconButton aria-label="">
                <FolderOffIcon />
              </IconButton>
            </Tooltip>
          </Card>}
      </Box>}


      {/* mobilemenu */}


      <div className=' md:px-0 px-6  relative flex flex-col justify-center mx-auto mt-8 gap-6 animate-[slideleft_0.3s] '>

        <Box sx={{ display: { md: 'flex', xs: 'none' } }} className=' absolute top-0 right-0 z-50'>
          {!addq2 && <Card onClick={() => setAddq2(true)} sx={{ transition: 'all 0.3s' }} className='text-center pt-1 absolute top-0 w-[50px] h-[50px] right-[-60px] transition-all duration-200 hover:scale-110 cursor-pointer'>
            {!currentId ? <Tooltip title="Add Question">
              <IconButton aria-label="">
                <AddCircleOutlineIcon />
              </IconButton>
            </Tooltip> :
              <Tooltip title="Edit and Show Question">
                <IconButton aria-label="">
                  <EditNoteIcon />
                </IconButton>
              </Tooltip>
            }
          </Card>}
          {addq2 && <Card onClick={() => setAddq3(true)} sx={{ transition: 'all 0.3s' }} className='text-center pt-1 absolute top-0 w-[50px] h-[50px] right-[-60px] transition-all duration-200 hover:scale-110 cursor-pointer'>
            {!currentId ? <Tooltip title="Add Question">
              <IconButton aria-label="">
                <AddCircleOutlineIcon />
              </IconButton>
            </Tooltip> :
              <Tooltip title="Edit and Show Question">
                <IconButton aria-label="">
                  <EditNoteIcon />
                </IconButton>
              </Tooltip>
            }
          </Card>}
          {addq2 && addq3 && <Card onClick={() => setAddq4(true)} sx={{ transition: 'all 0.3s' }} className='text-center pt-1 absolute top-0 w-[50px] h-[50px] right-[-60px] transition-all duration-200 hover:scale-110 cursor-pointer'>
            {!currentId ? <Tooltip title="Add Question">
              <IconButton aria-label="">
                <AddCircleOutlineIcon />
              </IconButton>
            </Tooltip> :
              <Tooltip title="Edit and Show Question">
                <IconButton aria-label="">
                  <EditNoteIcon />
                </IconButton>
              </Tooltip>
            }
          </Card>}
          {addq2 && addq3 && addq4 && !addq5 && <Card onClick={() => setAddq5(true)} sx={{ transition: 'all 0.3s' }} className='text-center pt-1 absolute top-0 w-[50px] h-[50px] right-[-60px] transition-all duration-200 hover:scale-110 cursor-pointer'>
            {!currentId ? <Tooltip title="Add Question">
              <IconButton aria-label="">
                <AddCircleOutlineIcon />
              </IconButton>
            </Tooltip> :
              <Tooltip title="Edit and Show Question">
                <IconButton aria-label="">
                  <EditNoteIcon />
                </IconButton>
              </Tooltip>
            }
          </Card>}

          {!addimg ? <Card onClick={() => setAddimg(true)} sx={{ transition: 'all 0.3s' }} className='text-center pt-1 absolute top-[60px] w-[50px] h-[50px] right-[-60px] transition-all duration-200 hover:scale-110 cursor-pointer'>
            <Tooltip title="Add Image">
              <IconButton aria-label="">
                <ImageIcon />
              </IconButton>
            </Tooltip>
          </Card> :
            <Card onClick={() => {
              setAddimg(false)
              setFile(null)
              setFormdata({ ...formdata, fileQ: '' })
            }} sx={{ transition: 'all 0.3s' }} className='text-center pt-1 absolute top-[60px] w-[50px] h-[50px] right-[-60px] transition-all duration-200 hover:scale-110 cursor-pointer'>
              <Tooltip title="Remove Image">
                <IconButton aria-label="">
                  <HideImageIcon />
                </IconButton>
              </Tooltip>
            </Card>}

          {!addlink ? <Card onClick={() => setAddlink(true)} sx={{ transition: 'all 0.3s' }} className='text-center pt-1 absolute top-[120px] w-[50px] h-[50px] right-[-60px] transition-all duration-200 hover:scale-110 cursor-pointer'>
            <Tooltip title="Allow user to add Link">
              <IconButton aria-label="">
                <AddLinkIcon />
              </IconButton>
            </Tooltip>
          </Card> :
            <Card onClick={() => {
              setAddlink(false)
              setFormdata({ ...formdata, link: '' })
            }} sx={{ transition: 'all 0.3s' }} className='text-center pt-1 absolute top-[120px] w-[50px] h-[50px] right-[-60px] transition-all duration-200 hover:scale-110 cursor-pointer'>
              <Tooltip title="Remove field">
                <IconButton aria-label="">
                  <LinkOffIcon />
                </IconButton>
              </Tooltip>
            </Card>}
          {!addfile ? <Card onClick={() => setAddfile(true)} sx={{ transition: 'all 0.3s' }} className='text-center pt-1 absolute top-[180px] w-[50px] h-[50px] right-[-60px] transition-all duration-200 hover:scale-110 cursor-pointer'>
            <Tooltip title="Allow user to upload file">
              <IconButton aria-label="">
                <PictureAsPdfIcon />
              </IconButton>
            </Tooltip>
          </Card> :
            <Card onClick={() => {
              setAddfile(false)
              setFormdata({ ...formdata, filepdf: '' })
            }} sx={{ transition: 'all 0.3s' }} className='text-center pt-1 absolute top-[180px] w-[50px] h-[50px] right-[-60px] transition-all duration-200 hover:scale-110 cursor-pointer'>
              <Tooltip title="Remove field">
                <IconButton aria-label="">
                  <FolderOffIcon />
                </IconButton>
              </Tooltip>
            </Card>}
        </Box>


        <Card className='border-t-[11px] border-t-[#8f38ba] border-l-[5px] border-l-blue-400 transition-all duration-200 hover:scale-100 cursor-pointer' sx={{ width: { lg: '700px', md: '600px', sm: '500px', xs: '100%' }, py: 2, transition: 'all 0.3s', borderRadius: '10px' }}>
          <CardContent>
            <input className=' placeholder:text-4xl font-medium h-[40px]  text-3xl placeholder:text-stone-800' value={formdata?.title} onChange={(e) => setFormdata({ ...formdata, title: e.target.value })}
              style={{ width: '100%', outline: 'none', border: 'none' }}
              placeholder='Title is Here'
            />

          </CardContent>
        </Card>

        <Card className=' border-l-[5px] border-l-blue-400 transition-all duration-200 hover:scale-100 cursor-pointer' sx={{ width: { lg: '700px', md: '600px', sm: '500px', xs: '100%' }, py: 2, transition: 'all 0.3s', borderRadius: '10px' }}>
          <CardContent>
            <TextField
              value={formdata?.name} onChange={(e) => setFormdata({ ...formdata, name: e.target.value })}
              sx={{ width: '60%' }} required placeholder='type here' id="standard-basic" label="1st Question" variant="standard" />

          </CardContent>
        </Card>



        {addq2 && <Card className=' border-l-[5px] border-l-blue-400 transition-all duration-200 hover:scale-105 cursor-pointer' sx={{ width: { lg: '700px', md: '600px', sm: '500px', xs: '100%' }, py: 2, transition: 'all 0.3s', borderRadius: '10px' }}>
          <CardContent className=' flex justify-between'>
            <TextField
              value={formdata?.address} onChange={(e) => setFormdata({ ...formdata, address: e.target.value })}
              sx={{ width: '60%' }} required placeholder='type here' id="standard-basic" label="2nd Question" variant="standard" />
            {!addq3 && <Tooltip title="Delete">
              <IconButton aria-label="" className=' w-[48px]'
                onClick={() => {
                  setAddq2(false)
                  setFormdata({ ...formdata, address: '' })
                }}>
                <DeleteForeverIcon className=' text-red-600' />
              </IconButton>
            </Tooltip>}
          </CardContent>
        </Card>}
        {addq3 && <Card className=' border-l-[5px] border-l-blue-400 transition-all duration-200 hover:scale-105 cursor-pointer' sx={{ width: { lg: '700px', md: '600px', sm: '500px', xs: '100%' }, py: 2, transition: 'all 0.3s', borderRadius: '10px' }}>
          <CardContent className=' flex justify-between'>
            <TextField
              value={formdata?.q3} onChange={(e) => setFormdata({ ...formdata, q3: e.target.value })}
              sx={{ width: '60%' }} required placeholder='type here' id="standard-basic" label="3rd Question" variant="standard" />
            {!addq4 && <Tooltip title="Delete">
              <IconButton aria-label="" className=' w-[48px]'
                onClick={() => {
                  setAddq3(false)
                  setFormdata({ ...formdata, q3: '' })
                }}>
                <DeleteForeverIcon className=' text-red-600' />
              </IconButton>
            </Tooltip>}
          </CardContent>
        </Card>}
        {addq4 && <Card className=' border-l-[5px] border-l-blue-400 transition-all duration-200 hover:scale-105 cursor-pointer' sx={{ width: { lg: '700px', md: '600px', sm: '500px', xs: '100%' }, py: 2, transition: 'all 0.3s', borderRadius: '10px' }}>
          <CardContent className=' flex justify-between'>
            <TextField
              value={formdata?.q4} onChange={(e) => setFormdata({ ...formdata, q4: e.target.value })}
              sx={{ width: '60%' }} required placeholder='type here' id="standard-basic" label="4th Question" variant="standard" />
            {!addq5 && <Tooltip title="Delete">
              <IconButton aria-label="" className=' w-[48px]'
                onClick={() => {
                  setAddq4(false)
                  setFormdata({ ...formdata, q4: '' })
                }}>
                <DeleteForeverIcon className=' text-red-600' />
              </IconButton>
            </Tooltip>}
          </CardContent>
        </Card>}
        {addq5 && <Card className=' border-l-[5px] border-l-blue-400 transition-all duration-200 hover:scale-105 cursor-pointer' sx={{ width: { lg: '700px', md: '600px', sm: '500px', xs: '100%' }, py: 2, transition: 'all 0.3s', borderRadius: '10px' }}>
          <CardContent className=' flex justify-between'>
            <TextField
              value={formdata?.q5} onChange={(e) => setFormdata({ ...formdata, q5: e.target.value })}
              sx={{ width: '60%' }} required placeholder='type here' id="standard-basic" label="Last Question" variant="standard" />
            <Tooltip title="Delete">
              <IconButton aria-label="" className=' w-[48px]'
                onClick={() => {
                  setAddq5(false)
                  setFormdata({ ...formdata, q5: '' })
                }}>
                <DeleteForeverIcon className=' text-red-600' />
              </IconButton>
            </Tooltip>
          </CardContent>
        </Card>}

        {addimg && <Card className=' border-l-[5px] border-l-blue-400 transition-all duration-200 hover:scale-105 cursor-pointer' sx={{ width: { lg: '700px', md: '600px', sm: '500px', xs: '100%' }, py: 2, transition: 'all 0.3s', borderRadius: '10px' }}>
          <CardContent className=' flex flex-col'>
            <TextField
              value={formdata?.fileQ} onChange={(e) => setFormdata({ ...formdata, fileQ: e.target.value })}
              sx={{ width: '60%' }} required placeholder='type here' id="standard-basic" label="Question for the image" variant="standard" />

            <br />
            <FileBase
              type='file'
              multiple={false}
              onDone={({ base64 }) => {
                setFormdata({ ...formdata, selectedFile: base64 })
                setFile(base64)
              }}
            />
            {file &&
              <div className=' relative'>
                <img className='mt-2 rounded-md'
                  src={file}
                  alt="Thumb"
                />
                <div style={{ background: 'linear-gradient(90deg, rgba(219,231,250,0.4010854341736695) 0%, rgba(219,231,250,0.40948879551820727) 100%)' }} className='del absolute backdrop-blur-md right-2 bottom-2 rounded-full p-1'>
                  <Tooltip title="Delete">
                    <IconButton aria-label="" className=' w-[40px]'
                      onClick={() => {
                        setFile(null)
                      }}>
                      <DeleteForeverIcon className=' text-red-600' />
                    </IconButton>
                  </Tooltip>
                </div>

              </div>}
          </CardContent>
        </Card>}

        {addlink && <Card className=' border-l-[5px] border-l-blue-400 transition-all duration-200 hover:scale-105 cursor-pointer' sx={{ width: { lg: '700px', md: '600px', sm: '500px', xs: '100%' }, py: 2, transition: 'all 0.3s', borderRadius: '10px' }}>
          <CardContent className=' flex justify-between'>
            <TextField
              value={formdata?.link} onChange={(e) => setFormdata({ ...formdata, link: e.target.value })}
              sx={{ width: '60%' }} required placeholder='Allow user to share link' id="standard-basic" label="Raise your query" variant="standard" />
            <Tooltip title="Link">
              <IconButton aria-label="" sx={{ mt: 1 }} className=' w-[48px] h-[48px] '>
                <DatasetLinkedIcon className=' text-fuchsia-700' />
              </IconButton>
            </Tooltip>
          </CardContent>
        </Card>}

        {addfile && <Card className=' border-l-[5px] border-l-blue-400 transition-all duration-200 hover:scale-105 cursor-pointer' sx={{ width: { lg: '700px', md: '600px', sm: '500px', xs: '100%' }, py: 2, transition: 'all 0.3s', borderRadius: '10px' }}>
          <CardContent className=' flex justify-between'>
            <TextField
              value={formdata?.filepdf} onChange={(e) => setFormdata({ ...formdata, filepdf: e.target.value })}
              sx={{ width: '60%' }} required placeholder='Allow user to upload file(.pdf only)' id="standard-basic" label="Raise your query" variant="standard" />
            <Tooltip title="File">
              <IconButton aria-label="" sx={{ mt: 1 }} className=' w-[48px] h-[48px] '>
                <SourceIcon className=' text-fuchsia-600' />
              </IconButton>
            </Tooltip>
          </CardContent>
        </Card>}
        <div className=' flex md:flex-row flex-col justify-between '>

          <Button sx={{mb:{xs:1,md:0}}} onClick={handelsubmit} variant="contained" color='secondary' endIcon={<SendIcon />}>
           {currentId ? 'Edit Your Form' : 'Create Your Form'}
          </Button>
          <div className=' flex md:flex-row flex-col gap-2'>
            <Tooltip title="Save For Next">
            <Button sx={{height:'37px'}} onClick={handelsave} variant="contained" color='success' endIcon={<TurnedInNotIcon />}>
             Save
            </Button> 
            </Tooltip>
<Tooltip title="Go to MCQ section">
<Button sx={{height:'37px'}} onClick={() => {
              if (isSaved || currentId) {
                navigate(`/form/mcq/${currentId ? currentId : forms[forms?.length - 1]?._id}`)
              }
              else if (!userinfo)
              setisloggedin(false)
            else if(formdata?.title ==='') setIsfilled(true)
            else setNotsaved(false)
            }
            } variant="contained" color='primary' endIcon={<NextPlanIcon />}>
              Next
            </Button>
</Tooltip>
          </div>
        </div>
        <br />
        <br />
      </div>
    </div>
  )
}
