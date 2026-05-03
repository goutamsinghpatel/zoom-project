 import mongoose from 'mongoose';
  const connectDb=async()=>{
await mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected!'))
  .catch((err)=>{
    console.log(err);
  })
  }

  export default connectDb;