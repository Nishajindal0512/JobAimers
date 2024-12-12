import React,{useEffect,useContext} from 'react'
import "./App.css";
import {Context} from './main';
import {BrowserRouter ,Routes,Route} from 'react-router-dom';
import Login from './components/Auth/Login.jsx'
import Register from './components/Auth/Register.jsx'
import Navbar from './components/Layout/Navbar'
import Footer from './components/Layout/Footer'
import Home from './components/Home/Home'
import Jobs from './components/Job/Jobs'
import JobDetails from './components/Job/JobDetails'
import MyJobs from './components/Job/MyJobs'
import PostJob from './components/Job/PostJob'
import Application from './components/Applications/Application.jsx'
import MyApplication from './components/Applications/MyApplication.jsx'
import ResumeModal from './components/Applications/ResumeModal.jsx'
import NotFound from './components/NotFound/NotFound.jsx';
import axios from "axios"
import {Toaster} from "react-hot-toast";

const App = () => {

  const {isAuthorized,setisAuthorized,setUser}=useContext(Context);
  useEffect(()=>{
    const fetchUser=async()=>{
      try {
        const response=await axios.get("http://localhost:4000/api/v1/user/getuser",
        {
          withCredentials: true,
        }
        );
        // console.log("app front ji " + response)
        setUser(response.data.user);    
        setisAuthorized(true);
      } catch (error) {
        // console.error('Error message:', error.message);
        // if (error.response) {
        //     console.error('Response data:', error.response.data);
        //     console.error('Response status:', error.response.status);
        //     console.error('Response headers:', error.response.headers);
        // }
        setisAuthorized(false);
      }
    };
    fetchUser();
  },[isAuthorized]);

  
  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/' element={<Home/>}/>
          <Route path='/job/getall' element={<Jobs/>}/>
          <Route path='/job/:id' element={<JobDetails/>}/>
          <Route path='/job/post' element={<PostJob/>}/>
          <Route path='/job/me' element={<MyJobs/>}/>
          <Route path='/application/:id' element={<Application/>}/>
          <Route path='/application/me' element={<MyApplication/>}/>
          <Route path='*' element={<NotFound/>}/>
        </Routes>
        <Footer/>
        <Toaster/>  
      </BrowserRouter>
      
    </>
  )
}

export default App