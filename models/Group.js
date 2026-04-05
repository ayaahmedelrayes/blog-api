
const mongoose=require('mongoose');
const groupSchema = new mongoose.Schema({
    name:{type:String,required:true},
    admins:[{type :mongoose.Schema.Types.ObjectId,ref:'User', required:true}], //array of ids
    members:[{type :mongoose.Schema.Types.ObjectId,ref:'User'}],
    allowedToPost:[{type :mongoose.Schema.Types.ObjectId,ref:'User'}],
},{timestamps:true});
module.exports=mongoose.model('Group',groupSchema);