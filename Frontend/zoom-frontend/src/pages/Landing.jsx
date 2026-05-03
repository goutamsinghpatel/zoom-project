import { NavLink, useNavigate } from 'react-router-dom'
import '../App.css'
export default function Landing(){
  const navigate=useNavigate()
    return(
        <>
        <div className='ladingpagecontainer'>
            <nav >
              <div className='navHeader'>
                <h2>V-Call </h2>

              </div>
              <div className='navlist'>
                 <p onClick={()=>{
                 navigate("/2537cs")
                 }}>Join as Guest </p>
                <p onClick={()=>{
                  navigate("/auth")
                }}>Register</p>
              <div onClick={()=>{
                navigate("/auth")
              }} role='button'>
                <p>Login</p>
              </div>
              </div>
               
            </nav>

            <div className="landingmaincontainer">
                            <div>
                    <h1><span style={{color:"#FF9839"}}>Connect</span> With Your  Loved Ones</h1>
                    <br>
                    </br>
                    <p>cover a distance by apna video call </p>
                    <div role='button'>
                      <NavLink   to="/auth">Get Started</NavLink>
         
                    </div>
                            </div>
            <div>
                <img src="/mobile.png"/>

            </div>

            </div>
             
        </div>
        </>
    )
}