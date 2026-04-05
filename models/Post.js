const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },  
    images: [String],// Array of image URLs
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true},
        group:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Group',
            
        }
}, { timestamps: true });
module.exports = mongoose.model('Post', postSchema);
        
    

