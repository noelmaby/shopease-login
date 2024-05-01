const express=require('express')
const router=express.Router()
const cors=require('cors')
const {test,getAdmin,deleteUser,locationShop,getUsers,registerUser,loginUser,getProfile,varifyUser,addShop,getShop,photocontroller,deleteShop,updateshop,getSingleproduct} =require('../controllers/authController')
const formidable =require( 'express-formidable')

//middleware
router.use(cors(
    {
        origin : ["http://127.0.0.1:5173"],
        methods : ["POST","GET","DELETE"],
        credentials:true
    }
));
router.get('/',test)
router.post('/register',registerUser)
router.post('/login',loginUser)
router.get('/profile',varifyUser,getProfile)
router.get('/getadmin',getAdmin)
router.post('/create-shop',formidable(),addShop)
router.get('/get-shop',getShop)
router.post('/get-locationshop',locationShop)
router.get('/get-users',getUsers)
router.get("/getphoto/:pid",photocontroller);
router.delete("/deleteshop/:pid",deleteShop);
router.delete("/deleteuser/:pid",deleteUser);

module.exports=router
