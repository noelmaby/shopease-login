const User = require('../models/user')
const {hashPassword,comparePassword} = require('../helpers/auth')
const jwt=require('jsonwebtoken');



const test = (req,res)=>{
    res.json('test is working')
}


//register endpoint
const registerUser= async (req,res)=>{
    try{
        const {name,email,password}=req.body
        //check if name was entered
        if(!name){
            return res.json({
                error:'Name Is Required'
            })
        };
        //check password
        if(!password || password.length<6){
            return res.json({
                error:'Password Is Required And Should Be At Least 6 Character Long'
            })
        };
        //check mail
        const exist = await User.findOne({email})
        if(exist){
            return res.json({
                error:'Email Already Exist'
            })
        }

        const hashedPassword=await hashPassword(password)
        //create user in databse
        const user=await User.create({
            name,email,password:hashedPassword
        })

        return res.json(user)
    }
    catch(error){
        console.log(error)
    }
}


//login endpoint
const loginUser= async (req,res)=>{
    try {
        const {email,password}=req.body;
        //check if user exist
        const user=await User.findOne({email});
        if(!user){
            return res.json({
                error:'No User Found'
            })
        }

        //password match
        const match=await comparePassword(password,user.password)
        if(match){
           const accessToken=jwt.sign({email:user.email},"jwt-access-token-secret-key",{expiresIn:'1m'})
           const refreshToken=jwt.sign({email:user.email},
            "jwt-refresh-token-secret-key",{expiresIn:'5m'})

            res.cookie('accesstoken',accessToken,{maxAge:6000,httpOnly:true,secure:true,sameSite:'None'})

            res.cookie('refreshtoken',refreshToken,{maxAge:3000,httpOnly:true,secure:true,sameSite:'None'})
            
            
            res.json({ success: 'Login successful' });
            }
        

        if(!match){
            res.json({
                error:'Password Do Not Match'
            })
        }
    } catch (error) {
            console.log(error)
            
    }
}

const verifyUser=(req,res,next) =>{
    const accesstoken=req.cookies.accessToken;
    if(!accesstoken){
        if(renewToken(req,res)){
            next()
        }
    }
    else{
        jwt.verify(accesstoken,'jwt-access-token-secret-key',(err,user) =>{
            if(err){
                return res.json({valid:false,message:"Invalid Token"})
            }
            else{
                req.email=user.email;
                next()
            }
        })
    }
}

const renewToken=(req,res)=>{
    const refreshtoken=req.cookies.refreshToken;
    let exist=false;
    if(!refreshtoken){
        return res.json({valid:false,message:'No refresh token'})
    }
    else{
        jwt.verify(refreshtoken,'jwt-refresh-token-secret-key',(err,decoded) =>{
            if(err){
                return res.json({valid:false,message:"Invalid Token"})
            }
            else{
                const accessToken=jwt.sign({email:user.email},"jwt-access-token-secret-key",{expiresIn:'1m'})
                res.cookie('accesstoken',accessToken,{maxAge:6000,httpOnly:true,secure:true,sameSite:'None'})
                exist=true;
            }
        })
    }
    return exist
}


const getProfile = (req, res) => {
    return res.json({valid:true,message:"authorized"})
  };
  

module.exports={
    test,registerUser,loginUser,getProfile,verifyUser
}