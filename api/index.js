import express from "express";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js'

dotenv.config();
const port = 3000;
const app = express();
app.use(express.json());

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})

app.use('/api', userRoutes);

mongoose.connect(process.env.MONGODB).then(()=> {
    console.log('MongoDb Connected');
}).catch((e) => {
    console.log('MongoDb Connection failed!',e);
})