import express from 'express';
import  'dotenv/config';
import cors from 'cors';
import  {createServer} from "node:http";
import {Server} from 'socket.io';
import cookieParser from "cookie-parser";
import connectToSocket from './config/SocketManager.js';
import userRouter from './routes/users.routes.js';

import connectDb from './config/mongodb.js';
const app=express();
const server=createServer(app);
const io=connectToSocket(server);



const port =3000;
app.use(express.json({limit:"40kb"}));
app.use(express.urlencoded({limit:"40kb",extended:true}))
app.use(cookieParser());
const allowdOrigin=["https://v-call-six.vercel.app","http://localhost:5173"]
app.use(cors({origin:allowdOrigin,credentials:true}));
app.use("/api/v1/users",userRouter);
app.get("/",(req,res)=>{
     res.send("Hello world ");

})
app.set("port",process.env.PORT || 3000);
connectDb();
const start=async()=>{
server.listen(app.get("port"),()=>{
    console.log(`server Stated in port ${port}`);

})

}
start();

