const express=require('express');
const auth=require('./routes/auth');
const cors=require('cors');
const app=express();
app.use(express.json())//extract data from body
app.use(cors({
    origin:"*"
}))
app.use('/auth',auth)//middleware=>route auth
app.use("/health",(req,res)=>{
    res.json({status:"OK"})
})
app.listen(4000,()=>{
    console.log("server is running...");
})