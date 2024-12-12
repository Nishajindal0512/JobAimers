import React, { useContext, useState } from 'react'
import { Context } from '../../main';
import { FaPencilAlt, FaRegUser } from 'react-icons/fa';
import { MdOutlineMailOutline } from "react-icons/md"
import { FaPhoneFlip } from "react-icons/fa6"
import { RiLock2Fill } from 'react-icons/ri';
import { Link,Navigate } from 'react-router-dom';
import axios from "axios"
import toast from "react-hot-toast"
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("")

  const { isAuthorized, setisAuthorized } = useContext(Context);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:4000/api/v1/user/login"
        ,
        {  email, password, role },
        {
          headers: {
            "Content-Type": "application/json",
          
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setEmail("");
      setRole("");
      setPassword("");
      setisAuthorized(true);
    } catch (error) {
      toast.error(error.response.data.message)
      console.log("front ma hn login"+ error.response.data.message)
      console.log(e)


    }
  }

  if (isAuthorized) {
    return <Navigate to={"/"} />
  }
  return (
    <>

      <div className="authPage">
        <div className="container ">
          <div className="header">
            <img src="/JobZeelogo.png" alt="logo" />
            <h3>login to your  account</h3>
          </div>
          <form action="">
            <div className="inputTag">
              <label >login As </label>
              <div>
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">select role</option>
                  <option value="Employeer">Employeer</option>
                  <option value="Job seeker">Job Seeker</option>
                </select>
                <FaRegUser />
              </div>
            </div>

           

            <div className="inputTag">
              <label > Email address </label>
              <div>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder='zk@gmail.com' />
                <MdOutlineMailOutline />
              </div>
            </div>
        
            <div className="inputTag">
              <label > Password </label>
              <div>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                  placeholder='password' />
                <RiLock2Fill />
              </div>
            </div>
            <button onClick={handleLogin} type='submit'>login  </button>
            <Link to={'/register'}>register</Link>
          </form>
        </div>
        <div className="banner">
          <img src="/login.png" alt="login" />
        </div>
      </div>
    </>
  )
}

export default Login
