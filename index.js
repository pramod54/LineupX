const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const connectDB = require('./utils/db');
const jobs  = require('./utils/schedule');
connectDB();
jobs();
app.use(express.json({extended : false}));
app.use('/youtube',require('./routes/main'));


const PORT = 5000;

app.listen(PORT,()=>console.log(`Server started on port ${PORT}`));
