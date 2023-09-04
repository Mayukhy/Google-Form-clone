import mongoose from 'mongoose'

const mcqSchema = mongoose.Schema({
 
   questionText:String,
   optionText1:String,
   optionText2:String,
   optionText3:String,
   optionText4:String,
   opAns:String,
 createdAt:{
    type:Date,
    default:new Date()
 },
 username:String,
 userId:String,
 formId:String
})

const mcqData = mongoose.model('McqResponse',mcqSchema)
export default mcqData;