const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
//const jwt = require('jsonwebtoken');
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:['user','admin','superadmin'],
        default:'user',
    }
  //ناقصtimestamps  
  //،اقص تشفير كلمات المرور
},
{timestamps:true});
userSchema.pre('save',async function(next){
    if (!this.isModified('password')) {
        return next();
    }
    this.password=await bcrypt.hash(this.password,12);
    next();
});
module.exports=mongoose.model('User',userSchema);