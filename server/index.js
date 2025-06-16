import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import { connectDB } from './DB/db.js';
import authRouter from './routes/auth.route.js';
import cors from 'cors'



const app= express();
dotenv.config();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    methods:['GET','PUT','POST','DELETE'],
    credentials: true,
}))
app.use(cookieParser());

app.use('/auth', authRouter)


const PORT=process.env.PORT || 3000;


app.listen(PORT, ()=>{
    console.log(`server started at http://localhost:${PORT}`);
    connectDB()
})
