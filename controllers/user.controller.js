const User=require('../models/User');
const AppError=require('../utils/AppError');
//all users
exports.getAllUsers= async(req,res,next)=>{
    try{
const users =await User.find().select('-password');
res.status(200).json({message:'Users retrieved successfully',users});
}catch(err){
    next(err);
}}
// one user
exports.getUser=async(req,res,next)=>{
    try{
    const user = await User.findById(req.params.id).select('-password');
    if (!user){
        return next(new AppError('User not found',404));
    }
    res.status(200).json({message:'User retrieved successfully',user});
}catch(err){
    next(err);
}
}
//update user
exports.updateUser= async(req,res,next)=>{
    try{

    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password');
    if (!user){
        return next(new AppError('User not found',404));
    }
    res.status(200).json({message:'User updated successfully',user});
}catch(err){
    next(err);
}
}
//delete user
exports.deleteUser= async(req,res,next)=>{
    try{ const user = await User.findByIdAndDelete(req.params.id);
    if (!user){
        return next(new AppError('User not found',404));
    }
    res.status(200).json({message:'User deleted successfully',user});
}catch(err){
    next(err);
}
} 