
import mongoose from 'mongoose'
import responseData from '../models/userResponsemodel.js'
export const getResponse =async(req,res)=>{
    try {
      const response = await responseData.find()
      res.json(response)
    } catch (error) {
        
    }
}

export const getsingleResponse = async(req,res)=>{
  const {id} = req.params
  const response = await responseData.findById(id)
  res.json(response)
}
export const creatResponse= async(req,res)=>{
const response = req.body  //data comming from frontend
const newres = responseData(response) //pushing the new data to PostMemories array
try {
  await newres.save() // saving the data to PostMemories array
  res.json(newres)  
} catch (error) {
    
}
}

  export const deleteResponse= async(req,res)=>{
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with id');
    await responseData.findByIdAndRemove(id) // del card by its id
 
    }
 
