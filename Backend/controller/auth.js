const { createUser, findUser } = require("../model/users");
const bcrypt = require('bcrypt');
exports.createUser=async(data)=>{
const uid=Date.now();

const resp=await createUser(data,uid)
return resp
}

exports.loginUser=async(email,password)=>{

const user=await findUser(email);//null
 const encPass=await bcrypt.compare(password,user.password)
if(!!user && encPass){
   
    return "Login Success"
}else{
    return "Invalid email or password"
}
}