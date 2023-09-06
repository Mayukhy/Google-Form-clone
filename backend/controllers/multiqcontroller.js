
import mongoose from 'mongoose'
import multiqData from '../models/multiqmodel.js'
export const getq =async(req,res)=>{
    try {
      const ques = await multiqData.find()
      res.json(ques)
    } catch (error) {
        
    }
}

export const creatq= async(req,res)=>{
const ques = req.body  //data comming from frontend
const newQ = multiqData(ques) //pushing the new data to PostMemories array
try {
  await newQ.save() // saving the data to PostMemories array
  res.json(newQ)  
} catch (error) {
   console.log(error) 
}
}

  export const deleteq= async(req,res)=>{
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with id');
    await multiqData.findByIdAndRemove(id) // del card by its id
 
    }
 
