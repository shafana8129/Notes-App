import express from "express";
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const port = 3000;
const app = express();

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})

mongoose.connect(process.env.MONGODB).then(()=> {
    console.log('MongoDb Connected');
}).catch((e) => {
    console.log('MongoDb Connection failed!',e);
})