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
            return res,json({
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
            jwt.sign({ email: user.email, name: user.name }, process.env.JWT_SECRET, { expiresIn: '10s' }, (err, token) => {
                if (err) {
                    console.error('Error signing JWT token:', err);
                    return res.status(500).json({ error: 'Internal Server Error' });
                }
                // Set the JWT token as a cookie
                res.cookie('token', token, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'none'
                }).json(user);
            });
            
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

const getProfile = (req, res) => {
    
  };
  

module.exports={
    test,registerUser,loginUser,getProfile
}