const express=require('express');
const { createUser, loginUser } = require('../controller/auth');
const router=express.Router();
router.post('/signup',async(req,res)=>{    
   const resp=await createUser(req.body)
   res.send(resp)
})
router.post('/login',async(req,res)=>{
    
 const resp=  await loginUser(req.body.email,req.body.password)
   res.send(resp)
})
module.exports=router;