import mongoose from 'mongoose'

const formSchema = mongoose.Schema({
 title:String,
 name:String,
 address:String,
 q3:String,
 q4:String,
 q5:String,
 fileQ:String,
 filepdf:String,
 link:String,
 selectedFile:String,
 createdAt:{
    type:Date,
    default:new Date()
 },
 username:String,
 image:String,
 userId:String,
 formId:String
})

const formData = mongoose.model('FormData',formSchema)
export default formData;