import { useState } from 'react'
import { BrowserRouter, Routes, Route, useNavigate} from "react-router-dom";
import Navber from './components/Navber';
import Home from './components/Home';
import Form from './components/Form';
import Formdetails from './components/formdetails/Formdetails';
import SuccessSub from './components/SuccessSub';
import Error from './components/Error';
import Searchfeed from './components/search/Searchfeed';
import McqForm from './components/McqForm';

function App() {
  //google auth users
const userinfo =localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear()
const [formdata,setFormdata] = useState({title:'',name:'',address:'',q3:'',q4:'',q5:'',fileQ:'',selectedFile:'',username:`${userinfo?.name}`,userId:`${userinfo?.sub}`})
const [currentId,setCurrentId]=useState()
const [documentarray,setDocumentarray] = useState([{title:'',name:'',address:''}])
const [searchturm,setSearchterm] = useState(null)
  return (
    <>
    <BrowserRouter>
    <Navber searchTerm={searchturm} setSearchterm={setSearchterm}/>
    <Routes>
    <Route path='/' element={<Home setFormdata={setFormdata} userinfo={userinfo} currentId={currentId} setCurrentId={setCurrentId} />}/>
    <Route path='/form/:id' element={<Formdetails setFormdata={setFormdata} userinfo={userinfo} currentId={currentId} setCurrentId={setCurrentId} />}/>
    <Route path='/form/mcq/:formid' element={<McqForm setFormdata={setFormdata} userinfo={userinfo} currentId={currentId} setCurrentId={setCurrentId} />}/>
    <Route path='/form' element={<Form userinfo={userinfo} currentId={currentId} setCurrentId={setCurrentId} formdata={formdata} setFormdata={setFormdata} documentarray={documentarray} setDocumentarray={setDocumentarray}/>}/>
    <Route path='/search/:searchTerm' element={<Searchfeed userinfo={userinfo} currentId={currentId} setCurrentId={setCurrentId} formdata={formdata} setFormdata={setFormdata} />}/>
    <Route path='/success/:formtitle' element={<SuccessSub/>}/>
    <Route path='/error' element={<Error/>}/>
    </Routes>
</BrowserRouter>

    </>
  )
}

export default App
