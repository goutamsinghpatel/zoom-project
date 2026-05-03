import mongoose, { Schema} from "mongoose";
const userSchema=new Schema({
    name:{type:String,
        require:true,

    },
     userName:{type:String,
        require:true,
        unique:true

    },
   
    password:{
        type:String,
        require:true
    },
    token:{
        type:String,

    }
})
const User=mongoose.model("zoomUser",userSchema);
export {User};