import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../main'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import ResumeModal from './ResumeModal'
const MyApplication = () => {
  const [applications, setApplication] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");
  const { user, isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();
  useEffect(() => {
    try {
      if (user && user.role === "Employeer") {
        axios.get("http://localhost:4000/api/v1/application/employeer/getall", { withCredentials: true }).then(res => {
          setApplication(res.data.applications);
        })
      }
      else {
        axios.get("http://localhost:4000/api/v1/application/jobseeker/getall", { withCredentials: true }).then(res => {
          setApplication(res.data.applications);
        })
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }, [isAuthorized]);


  if (!isAuthorized) {
    navigateTo("/login")
  }

  const deleteApplication = (id) => {
    try {
       axios.delete(`http://localhost:4000/api/v1/application/delete/${id}`, {
         withCredentials: true })
       .then((res) => {
        toast.success(res.data.message);
        setApplication((prevApplications) => 
          prevApplications.filter((application) => application._id !== id)
        )
      })
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }


  const openModal = (imageUrl) => {
    setResumeImageUrl(imageUrl);
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
  }


  return (
    <section className='my_applications page'>
      {
        user && user.role === "Job seeker" ? (
          <div className="container">
            <h1>My Applications</h1>
            {
              applications.length<=0 ? (
                <>
                {" "}
                <h4>No Application Found</h4>{" "}
                </>
              ):(
                applications.map((element) => {
                  return <JobSeekerCard element={element} key={element._id}
                    deleteApplication={deleteApplication} openModal={openModal} />
                })
              )
            }
            
          </div>
        ) : (
          <div className="container">
            <h3>Application from Job Seekers</h3>
            {
              applications.map(element => {
                return <EmployeerCard element={element} key={element._id}
                  openModal={openModal} />
              })
            }
          </div>
        )

      }

      {
        modalOpen && (
          <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />
        )
      }
    </section>
  )
}

export default MyApplication;

const JobSeekerCard = ({ element, deleteApplication, openModal }) => {
  return (
    <>
      <div className="job_seeker_card">
        <div className="detail">
          <p><span>Name:</span>
            {element.name}
          </p>
          <p><span>Email:</span>
            {element.email}
          </p>
          <p><span>Phone:</span>
            {element.phone}
          </p>
          <p><span>Address:</span>
            {element.address}
          </p>
          <p><span>Cover Letter :</span>
            {element.coverLetter}
          </p>
        </div>

        <div className="resume">
          <img src={element.resume.url} alt="resume" onClick={() => openModal(element.resume.url)} />
        </div>
        <div className="btn_area">
          <button onClick={() => deleteApplication(element._id)}>Delete application</button>
        </div>
      </div>
    </>
  )
}

const EmployeerCard = ({ element, openModal }) => {
  return (
    <>
      <div className="job_seeker_card">
        <div className="detail">
          <p><span>Name:</span>
            {element.name}
          </p>
          <p><span>Email:</span>
            {element.email}
          </p>
          <p><span>Phone:</span>
            {element.phone}
          </p>
          <p><span>Address:</span>
            {element.address}
          </p>
          <p><span>Cover Letter :</span>
            {element.coverLetter}
          </p>
        </div>

        <div className="resume">
          <img src={element.resume.url} alt="resume" onClick={() => openModal(element.resume.url)} />
        </div>
      
      </div>

    </>
  )
}
