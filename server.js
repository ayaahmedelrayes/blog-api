const { connect } = require('mongoose');
const app =require('./app');
const connectDB=require('./config/db');
const dotenv=require('dotenv');
dotenv.config();
const port =process.env.PORT || 5000;
connectDB();
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})