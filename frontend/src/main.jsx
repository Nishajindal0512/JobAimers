import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { createContext } from 'react'

export const Context=createContext({isAuthorized:false})

const AppWrapper=()=>{
  const[isAuthorized,setisAuthorized]=useState(false);
  const[user,setUser]=useState({});
  return (
    <Context.Provider value={{isAuthorized,setisAuthorized,user,setUser}}>
      <App/>
    </Context.Provider>
  )

}
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>,
)
