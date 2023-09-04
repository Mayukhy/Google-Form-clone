import mongoose from 'mongoose'

const multiqSchema = mongoose.Schema({
    questionText:String,
    optionText1:String,
    optionText2:String,
    optionText3:String,
    optionText4:String,
 createdAt:{
    type:Date,
    default:new Date()
 },
 username:String,
 image:String,
 userId:String,
 formId:String
})

const multiqData = mongoose.model('MultipleQ',multiqSchema)
export default multiqData;