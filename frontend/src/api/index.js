import axios from 'axios'
const url = 'https://google-form-clonemayukh.onrender.com/form'
const url1 = 'https://google-form-clonemayukh.onrender.com/res'
const url2 = 'https://google-form-clonemayukh.onrender.com/mulq'
//for owners
export const fetchForm =()=> axios.get(url)
export const getSingleform = (id)=> axios.get(`${url}/${id}`)
export const creatForm =(newForm)=> axios.post(url,newForm)
export const updateForm = (id,form)=> axios.patch(`${url}/${id}`,form)
export const deleteForm = (id)=> axios.delete(`${url}/${id}`)
export const searchTerm = (searchterm)=> axios.get(`${url}/search/${searchterm}`)

//for from submitters
export const fetchRes =()=> axios.get(url1)
export const getSingleRes= (id)=> axios.get(`${url1}/${id}`)
export const creatRes =(newRes)=> axios.post(url1,newRes)
export const deleteRes = (id)=> axios.delete(`${url1}/${id}`)

//Multiple question
export const fetchq =()=> axios.get(url2)
export const creatq =(newq)=> axios.post(url2,newq)
export const deleteq = (id)=> axios.delete(`${url2}/${id}`)
