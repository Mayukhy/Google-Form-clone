
import formData from '../models/formmodel.js'
import mongoose from 'mongoose'
export const getForm =async(req,res)=>{
    try {
      const formdata = await formData.find()
      res.json(formdata)
    } catch (error) {
        
    }
}
export const getsingleForm = async(req,res)=>{
  const {id} = req.params
  const form = await formData.findById(id)
  res.json(form)
}
export const creatForm= async(req,res)=>{
const form = req.body  //data comming from frontend
const newForm = formData(form) //pushing the new data to form array
try {
  await newForm.save() // saving the data to form array
  res.json(newForm)  
} catch (error) {
    
}
}

export const updateForm= async(req,res)=>{
  const { id:_id } = req.params;
  const form = req.body  //data comming from frontend
  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with id');
    const updatedForm = await formData.findByIdAndUpdate(_id,{...form,_id},{new:true}) // saving the data to PostMemories array
    res.json(updatedForm)  
  }
 

  export const deleteForm= async(req,res)=>{
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with id');
    await formData.findByIdAndRemove(id) // del card by its id
 
    }
 

    export const searchterm = async(req,res)=>{
      const quarydata= await formData.find(
        {
          "$or":[
              {title:{$regex:req.params.key,$options:"i"}},
              {name:{$regex:req.params.key,$options:"i"}},
              {address:{$regex:req.params.key,$options:"i"}},
              {q3:{$regex:req.params.key,$options:"i"}},
              {q4:{$regex:req.params.key,$options:"i"}},
              {q5:{$regex:req.params.key,$options:"i"}},
              {fileQ:{$regex:req.params.key,$options:"i"}},
              {filepdf:{$regex:req.params.key,$options:"i"}},
              {link:{$regex:req.params.key,$options:"i"}}
          ]
      }
      ) 
      res.json(quarydata)
    }
