const express=require('express')
const router=express.Router()
const cors=require('cors')
const {test,registerUser,loginUser,getProfile,verifyUser} =require('../controllers/authController')

//middleware
router.use(cors(
    {
        origin : ["http://127.0.0.1:5173"],
        methods : ["POST","GET"],
        credentials:true
    }
));
router.get('/',test)
router.post('/register',registerUser)
router.post('/login',loginUser)
router.get('/profile',getProfile,verifyUser)
module.exports=router
