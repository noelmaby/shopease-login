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

            res.cookie('accessToken',accessToken,{maxAge:60000,httpOnly:true,secure:true,sameSite:'None'})

            res.cookie('refreshToken',refreshToken,{maxAge:30000,httpOnly:true,secure:true,sameSite:'None'})
            
            
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

const varifyUser = (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
        if (renewToken(req, res, next)) {
            next(); // Call next middleware or route handler
        } else {
            return res.json({ valid: false, message: "no access token" });
        }
    } else {
        jwt.verify(accessToken, 'jwt-access-token-secret-key', (err, user) => {
            if (err) {
                return res.json({ valid: false, message: "invalid token" });
            } else {
                req.email = user.email;
                next(); // Call next middleware or route handler
            }
        });
    }
};

const renewToken = (req, res, next) => {
    const refreshtoken = req.cookies.refreshToken;
    if (!refreshtoken) {
        return false; // No refresh token found
    } else {
        jwt.verify(refreshtoken, 'jwt-refresh-token-secret-key', (err, user) => {
            if (err) {
                return false; // Invalid refresh token
            } else {
                const accessToken = jwt.sign({ email: user.email }, "jwt-access-token-secret-key", { expiresIn: '1m' });
                res.cookie('accesstoken', accessToken, { maxAge: 60000, httpOnly: true, secure: true, sameSite: 'None' });
                next(); // Call next middleware or route handler
                return true; // Token renewed successfully
            }
        });
    }
};



  const getProfile = (req, res) => {
    return res.json({valid:true,message:'authorized'})
  };
  
  


  module.exports={
    test,registerUser,loginUser,getProfile,varifyUser
}