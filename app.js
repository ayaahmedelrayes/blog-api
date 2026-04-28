const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const mongoose = require('mongoose');
const errorHandler = require('./middleware/error.middleware');
const userRoutes = require('./routes/user.routes');
const app=express();
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});
app.use(express.json());
 app.get('/',(req,res)=>{
    res.json({message:'Welcome to the blog API'})
})
const authRoutes=require('./routes/auth.routes');
const postRoutes=require('./routes/post.routes');
const groupRoutes=require('./routes/group.routes');
app.use('/api/posts',postRoutes);
app.use('/api/groups',groupRoutes);

app.use('/api/auth',authRoutes);
app.use('/api/users',userRoutes);
app.use(errorHandler);
module.exports=app;
