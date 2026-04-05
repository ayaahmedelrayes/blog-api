const Group =require('../models/Group');
const AppError=require('../utils/AppError');
exports.createGroup=async(req,res,next)=>{
    try{
        const {name}=req.body;
        const group= await Group.create({
            name,
            admins:[req.user._id],
            members:[req.user._id]
        })
res.status(201).json({message:'Group created successfully',group});
    }catch(err){
        next(err);
    }
}
//add member controller
exports.addMember= async(req,res,next)=>{
    try{
 const group = await Group.findById(req.params.id);
        if (!group) return next(new AppError('Group not found', 404));

        const isAdmin = group.admins.some(
            (admin) => admin.toString() === req.user._id.toString()
        );
        if (!isAdmin) return next(new AppError('Only admins can add members', 403));

        group.members.push(req.body.userId);
        await group.save();

        res.status(200).json({ message: 'Member added successfully', group });
    }catch(err){
        next(err);
    }

}
exports.removeMember = async (req, res, next) => {
    try {
        const group = await Group.findById(req.params.id);
        if (!group) return next(new AppError('Group not found', 404));

        const isAdmin = group.admins.some(
            (admin) => admin.toString() === req.user._id.toString()
        );
        if (!isAdmin) return next(new AppError('Only admins can remove members', 403));

        group.members = group.members.filter(
            (member) => member.toString() !== req.body.userId
        );
        await group.save();

        res.status(200).json({ message: 'Member removed successfully', group });
    } catch (err) {
        next(err);
    }
};

exports.givePostPermission = async (req, res, next) => {
    try {
        const group = await Group.findById(req.params.id);
        if (!group) return next(new AppError('Group not found', 404));

        const isAdmin = group.admins.some(
            (admin) => admin.toString() === req.user._id.toString()
        );
        if (!isAdmin) return next(new AppError('Only admins can manage permissions', 403));

        group.allowedToPost.push(req.body.userId);
        await group.save();

        res.status(200).json({ message: 'Permission granted successfully', group });
    } catch (err) {
        next(err);
    }
};

