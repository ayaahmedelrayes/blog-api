const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
exports.register=async(req,res)=>{
    try{
        const {name,email,password}=req.body;
        const  user = await User.create({name,email,password});
        res.status(201).json({message:'User registered successfully',user});
    }catch(err){
    next(err);
    }
}
exports.login=async(req,res)=>{
    try{
    const {email,password}=req.body;
    const user=await User.findOne({email});
    if (!user){
        return res.status(404).json({message:'User not found'});
    }
    const isCorrectPass= await bcrypt.compare(password,user.password);
    if (!isCorrectPass){
        return res.status(401).json({message:'Invalid credentials'});

    }
    const token =jwt.sign({id:user._id,role:user.role},process.env.JWT_SECRET,{expiresIn:'7d'});
    res.status(200).json({message:'Login successful',token});
}catch(err){
    next(err);
}}