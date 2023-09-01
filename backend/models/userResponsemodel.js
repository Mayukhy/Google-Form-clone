import mongoose from 'mongoose'

const responseSchema = mongoose.Schema({
 name:String,
 address:String,
 selectedFile:String,
 q3:String,
 q4:String,
 q5:String,
 fileQ:String,
 filepdf:String,
 link:String, 
 username:String,
 userId:String,
 formId:String,
 profileimg:String,
 createdAt:{
   type:Date,
   default:new Date()
}
})

const responseData = mongoose.model('ResponseData',responseSchema)
export default responseData;