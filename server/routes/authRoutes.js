const express=require('express')
const router=express.Router()
const cors=require('cors')
const {test,registerUser,loginUser,getProfile} =require('../controllers/authController')

//middleware
router.use(
    cors({
        origin : ["https://shopease-login.vercel.app"],
        methods : ["POST","GET","OPTIONS","PUT","DELETE"],
        allowedHeaders: ['Content-Type','X-Auth-Token','Origin', 'Authorization']
    })
)

router.get('/',test)
router.post('/register',registerUser)
router.post('/login',loginUser)
router.get('/profile',getProfile)
module.exports=router
