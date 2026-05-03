
import Landing from './pages/Landing'
import Authentication from './pages/Authentication'
import { ToastContainer} from 'react-toastify';
import './App.css'
import { Route, Routes } from 'react-router-dom'
import VideoMeetComponent from './pages/VideoMeetComponent';
import Home from './pages/home'
import History from './pages/history';

function App() {


  return (
    <>
    
    <ToastContainer/>
        <Routes>

    <Route path="/" element={<Landing/>}/>
    <Route path="/auth" element={<Authentication/>}/>
    <Route path="/home" element={<Home/>}/>
    <Route path="/:url" element={<VideoMeetComponent/>}/>
   <Route path="/history" element={<History/>}/>


  </Routes>


    
     
    </>
  )
}

export default App

