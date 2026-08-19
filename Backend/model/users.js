const fs = require('fs')
const path = require('path');
const bcrypt = require('bcrypt');
const filePath = path.join(process.cwd(), 'data', 'user.json')
const readData = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, (err, fileData) => {
            if (err) {
                reject()
            } else {
                resolve(JSON.parse(fileData.toString()))//buffer (binary raw)
            }
        })
    })


}
const writeData = (data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, JSON.stringify(data), (err) => {
            if (err) {
                reject()
            } else {
                resolve()
            }
        })
    })


}

exports.createUser=async(data,uid)=>{
const users=await readData(); 
const matched=users.find(u=>u.email===data.email)
if(matched){
    return "user already exists!"
}else{
const encPass=await bcrypt.hash(data.password,12)//salt round
   await writeData([...users,{email:data.email,password:encPass,uid:uid,fullName:data.fullName,username:data.username,day:data.day,month:data.month,year:data.year}])
   return "user created!"
}
}
exports.findUser=async(email)=>{
const users=await readData(); 
const matched=users.find(u=>u.email===email)
return matched;
}