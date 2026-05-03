import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/userModel.js';

import httpStatus from "http-status";
import crypto from 'crypto';
import { Meeting } from '../models/meetingModel.js';

export const register=async(req,res)=>{
    let {name,userName,password}=req.body
    if(!name || !userName || !password){
        return res.json({success:false,message:"missing details"});
    }
try {
    let existingUser=await User.findOne({userName});
   console.log(existingUser);
    if(existingUser){
        return res.json({success:false,message:"user already exist "});

    }
const hashpassword=await bcrypt.hash(password,10);
const newUser=new User({name,userName,password:hashpassword});
await newUser.save();
res.json({success:true,message:"user register "})
} catch (error) {
    return res.json({success:false,message:error.message});
    
}
}


export const login=async(req,res)=>{
    const {userName,password}=req.body;
    if (!userName || !password){
        return res.status(400).json({success:false,message:"something swongh"});

    }
    try {
        let user=await User.findOne({userName});
        if(!user){
            return res.json({success:false,message:'user not found '});

        }
     const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
        return res.json({success:false,message:"please enter right password"})
    }
    
    let token = crypto.randomBytes(20).toString("hex");
   
        user.token=token;
        await user.save();  
        return res.json({success:true,message:token});

   
        
    } catch (error) {
        return res.json({success:false,message:error.message});
        
    }

}

export const getUserHistory = async (req, res) => {
    const { token } = req.query;

    try {
        const user = await User.findOne({ token: token });
        const meetings = await Meeting.find({ user_id: user.userName })
        res.json(meetings)
    } catch (e) {
        res.json({ message: `Something went wrong ${e}` })
    }
}

 export const addToHistory = async (req, res) => {
    const { token, meeting_code } = req.body;

    try {
        const user = await User.findOne({ token: token });

        const newMeeting = new Meeting({
            user_id: user.userName,
            meetingCode: meeting_code
        })

        await newMeeting.save();

        res.status(httpStatus.CREATED).json({ message: "Added code to history" })
    } catch (e) {
        res.json({ message: `Something went wrong ${e}` })
    }
}

