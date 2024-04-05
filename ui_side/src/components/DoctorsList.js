import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Avatar } from "antd";
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar,faUserDoctor,faMoneyBill, faClock, faCertificate, faUserMd, faRegistered, faUserCheck, faPhone } from '@fortawesome/free-solid-svg-icons';



function DoctorsList({doctor}) {
     const navigate = useNavigate();


  return (
    <>
    <div className="card m-2" 
    style={{cursor:'pointer',width:'25%',border:'2px solid fireBrick'}}
    onClick={()=> navigate(`/doctor/book-appointment/${doctor._id}`)}
    >
     <div className="card-header bg-danger text-dark text-center " style={{borderRadius:'5px'}} >
        <h5> <b> {doctor.firstName} {doctor.lastName} </b></h5>
     </div>
     <div className="card-body" style={{background:'linear-gradient(45deg, oldlace, turquoise, oldlace)',borderRadius:'5px'}}>
          <div style={{display:'flex',justifyContent:'center'}}>
          <Avatar size={85} className='text-dark' 
          style={{backgroundColor:'fireBrick', 
                border:'2px solid black',
                fontWeight:'bold'}}>
                    <img src={doctor?.userAvatar?.url} alt={doctor?.firstName.split(' ')[1]} />             
          </Avatar>
          </div>
          <hr />
          <h6>
          <FontAwesomeIcon icon={faCertificate} /><b>Specialization:</b> {doctor.specialization}
          </h6>
          <hr />
          <h6>
          <FontAwesomeIcon icon={faPhone} /> <b>Contact@:</b> {doctor.phone}
          </h6>
          <hr />
          <h6>
          <FontAwesomeIcon icon={faMoneyBill} />    <b>Fees per consultation:</b> {doctor.feesPerConsultation}/-
          </h6>
          <hr />
           <h6>
           <FontAwesomeIcon icon={faClock} />   <b>Timings:</b> {doctor.timings[0]}-{doctor.timings[1]}
          </h6>
     </div>
    </div>
    </>
  )
}

export default DoctorsList