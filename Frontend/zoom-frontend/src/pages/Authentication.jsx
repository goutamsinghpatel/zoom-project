import React, { useContext, useState } from 'react';
import './Authentication.css';
import { Appcontext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from "react-toastify";


const Authentication = () => {
  const [isSignup, setIsSignup] = useState(false);
 const [name,setName]=useState('');
 const [userName,setUserName]=useState('');
 const [password,setPassword]=useState('');


const navigate=useNavigate();
const {backendUrl}=useContext(Appcontext);

const signIn=async()=>{
  axios.defaults.withCredentials=true;
  try {
    const {data}=await axios.post(backendUrl+"/api/v1/users/login",{userName,password});
    if(data.success){
     
      console.log(data.message)
     localStorage.setItem("token",data.message);


      navigate("/home");
      toast.success("Login");
     


    }
    else{
      console.log(data.message);
      toast.error(data.message);
    }

  } catch (error) {
    console.log(error);
    toast.error(error.message)

    
  }
}

const signUp=async()=>{
  axios.defaults.withCredentials=true;
  try {
    const {data}=await axios.post(backendUrl+"/api/v1/users/register",{name,userName,password});
    if(data.success){
    
     console.log(data.message)
     setIsSignup(false);
      toast.success(data.message);

    }
    else{
      console.log(data.message);
      toast.error(data.message);
    }

  } catch (error) {
    console.log(error);
    toast.error(error.message)
    
  }
}
 

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!isSignup){

  signIn();
    }
    else{
       signUp();
        
    }

 setName('');
 setUserName('');
 setPassword('')
 
 console.log(name,userName,password);
    


  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-toggle">
          <button 
            className={!isSignup ? 'active' : ''} 
            onClick={() => setIsSignup(false)}
          >
            Sign In
          </button>
          <button 
            className={isSignup ? 'active' : ''} 
            onClick={() => setIsSignup(true)}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <h2>{isSignup ? 'Create Account' : 'Welcome Back'}</h2>
          
          {isSignup && (
            <div className="input-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
         
                value={name}
                onChange={(e)=>setName(e.target.value)}
                required
              />
            </div>
          )}

          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              name="userName"
           
              value={userName}
              onChange={(e)=>setUserName(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
            
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            {isSignup ? 'Register' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Authentication;