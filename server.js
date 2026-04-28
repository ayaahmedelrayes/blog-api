const { connect } = require('mongoose');
const app =require('./app');
const connectDB=require('./config/db');
const dotenv=require('dotenv');
dotenv.config();
connectDB();
if (process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}
module.export=app;
