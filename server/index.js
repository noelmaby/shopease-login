const express = require('express')
const dotenv=require('dotenv').config();
const cors=require('cors')
const {mongoose}=require('mongoose')
const cookieParser=require('cookie-parser')

const app=express()
app.use(cors(
    {
        origin : ["https://shopease-login.vercel.app"],
        methods : ["POST","GET"],
        credentials:true
    }
));


//database connection
mongoose.connect("mongodb+srv://noelmanjayilaby:RKP2OXsrLO2kC7Os@cluster0.vderxq8.mongodb.net/Shopease ")
.then(() => console.log('database connected'))
.catch((err)=> console.log('databse not connected',err))

//middleware
app.use(express.json())
app.use(cookieParser());
app.use(express.urlencoded({extended:false}))



app.use('/',require('./routes/authRoutes'))




app.listen(3001,()=>{
    console.log("server is running")
})