import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import formRouts from './routes/formrout.js'
import responseRouts from './routes/responserout.js'
import dotenv from 'dotenv'
const app = express();
dotenv.config()
app.use(cors())
//for properly sending requests from the frontend
app.use(bodyParser.json({limit:"30mb",extended:true}))
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}))
app.use('/form',formRouts)
app.use('/res',responseRouts)


app.get('/',(req,res)=>{
    res.json('Hello this is google form')
    })

const PORT = 5000;

//for connecting mongodb database with the app
const URL = 'mongodb+srv://dasmayukh2000:936eIP2SWazsX5Pp@cluster0.93aiybh.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(process.env.CONNECTION_URL)
.then(()=>app.listen(PORT,()=>console.log('server is running at http://localhost:5000')))