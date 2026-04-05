const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const mongoose = require('mongoose');
const errorHandler = require('./middleware/error.middleware');
const userRoutes = require('./routes/user.routes');
const app=express();

app.use(express.json());
// app.get('/',(req,res)=>{
//     res.json({message:'Welcome to the blog API'})
// })
const authRoutes=require('./routes/auth.routes');
const postRoutes=require('./routes/post.routes');
const groupRoutes=require('./routes/group.routes');
app.use('/api/posts',postRoutes);
app.use('/api/groups',groupRoutes);

app.use('/api/auth',authRoutes);
app.use('/api/users',userRoutes);
app.use(errorHandler);
module.exports=app;
