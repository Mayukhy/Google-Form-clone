
import mongoose from 'mongoose'
import mcqresData from '../models/mcqresmodel.js'
export const getans =async(req,res)=>{
    try {
      const ans = await mcqresData.find()
      res.json(ans)
    } catch (error) {
        
    }
}

export const creatans= async(req,res)=>{
const ques = req.body  //data comming from frontend
const newans = mcqresData(ques) //pushing the new data to PostMemories array
try {
  await newans.save() // saving the data to PostMemories array
  res.json(newans)  
} catch (error) {
    
}
}

  export const deleteans= async(req,res)=>{
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with id');
    await mcqresData.findByIdAndRemove(id) // del card by its id
 
    }
 
