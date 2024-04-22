const express = require('express')
const dotenv=require('dotenv').config();
const cors=require('cors')
const {mongoose}=require('mongoose')
const cookieParser=require('cookie-parser')

const app=express()

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://shopeasefront.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
  });
  
app.use(cors(
    {
        origin : ["https://shopeasefront.vercel.app"],
        methods : ["POST","GET"],
        credentials:true,
        allowedHeaders: ['Content-Type', 'Authorization'],
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