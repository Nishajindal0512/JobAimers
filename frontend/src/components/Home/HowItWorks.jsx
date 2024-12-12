import React from 'react'
import { FaUserPlus } from 'react-icons/fa'
import { MdFindInPage } from 'react-icons/md'
import { IoMdSend } from 'react-icons/io'
const HowItWorks = () => {
  return (
    <div className='howitworks'>
      <div className="container">
        <h3>how Jobzee works</h3>
        <div className="banner">
          <div className="card">
            <FaUserPlus/>
            <p>create your account</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit iste aut obcaecati.
               Debitis, reprehenderit!</p>
          </div>
          <div className="card">
            <MdFindInPage/>
            <p>find a job/post a job</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit iste aut obcaecati.
               Debitis, reprehenderit!</p>
          </div>
          <div className="card">
            <IoMdSend/>
            <p>create your account</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit iste aut obcaecati.
               Debitis, reprehenderit!</p>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default HowItWorks
