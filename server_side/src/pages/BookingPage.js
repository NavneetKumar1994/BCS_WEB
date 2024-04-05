import React,{useState,useEffect} from 'react'
import {Carousel} from 'react-bootstrap'
import ListReviews from '../components/review/ListReviews'
import Layout from '../components/Layout'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { DatePicker, TimePicker, message, Rate, Avatar} from 'antd'
import moment from "moment";
import { useSelector, useDispatch } from'react-redux'
import { showLoading, hideLoading } from '../redux/features/alertSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar,faUserDoctor,faMoneyBill, faClock, faCertificate, faUserMd, faRegistered, faUserCheck, faFeed } from '@fortawesome/free-solid-svg-icons';



const BookingPage = () => {

     const params= useParams();
     const dispatch= useDispatch();
     const {user}= useSelector(state=> state.user);

     const [doctor,setDoctor]= useState()
     const [rating,setRating]= useState(0);
     const [comment,setComment]= useState('')
     const [date , setDate]= useState();
     const [time,setTime]= useState();
     const [isAvailable,setIsAvailable]= useState(false)


     //doctor data
     const getDoctorData =async () => {
       try{
           const res= await axios.post('/api/v1/doctor/getDoctorById',
           {doctorId: params.doctorId},
           {
             headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
              } 
           })
           if(res.data.success){
             setDoctor(res.data.data)
           }
       }catch(error){
         console.log(error);
       }
     }
     //==========booking funct
     const handleBooking= async ()=> {
      setIsAvailable(true);
      if(!date && !time){
        return alert('date and time required');
      }
        try {
          dispatch(showLoading());
          const res= await axios.post('/api/v1/user/book-appointment',
          {doctorId: params.doctorId,
           userId: user._id,
           doctorInfo: doctor,
           userInfo: user,
           date: date,
           time: time
          },{
            headers: {
               Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        console.log(res.data);
        if(res.data.success){
          message.success(res.data.message);
        }
        dispatch(hideLoading())
        } catch (error) {
          dispatch(hideLoading())
          console.log(error);
        }
     }

     const handleAvailability= async () => {
      if(!date && !time){
        return alert('date and time required');
      }
       try {
           dispatch(showLoading())
           const res= await axios.post('/api/v1/user/booking-availability',
           {doctorId: params.doctorId, date, time},
           {
             headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
           })
           dispatch(hideLoading());

           if(res.data.success){
            setIsAvailable(true);
            message.success(res.data.message);
           }else{
            message.error(res.data.message);
           }
         } catch (error) {
          dispatch(hideLoading())
          console.log(error);
         }
     }
   
     useEffect(()=> {
       getDoctorData();
     },[]);

     const setDoctorRatings = (value) => {
      setRating(value);
  };
  

     //create doctor review
     const createNewReview= async() => {
      try {
        const res= await axios.put('/api/v1/doctor/review',{doctorId:params.doctorId,comment,rating},
        {
          headers: {
             Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        if(res.data.success){
          message.success(res.data.message);
        }else{
          message.error(res.data.message);
        }
        dispatch(showLoading());
        setTimeout(()=>{
          window.location.reload();
        },500)
      } catch (error) {
        console.log(error);
      }
     }


 

  
  return (
    <Layout>
     <h3 className='text-center text-danger py-4 '
       style={{position:'absolute',zIndex:999,width:'77.5%',backgroundColor:'transparent',fontWeight:'bold'}}>Book Your Appointment <hr /></h3> 
     <div className="container" style={{marginTop:'8%'}}>
          {doctor && (
               <div style={{color:'black',background:'linear-gradient(45deg, oldlace, turquoise, oldlace)'}} >
               <p style={{color:'black',
               display:'flex',
               justifyContent:'space-between',
               alignItems:'center'}}>
                <div>
                <h4 style={{color:'crimson'}}><FontAwesomeIcon icon={faUserDoctor} />  <b>{doctor.firstName} {doctor.lastName}</b></h4>
               <FontAwesomeIcon icon={faCertificate} /> <b> {doctor.specialization} </b> <br />
               <FontAwesomeIcon icon={faUserMd} /> <b> {doctor.experience} </b><br />
               <FontAwesomeIcon icon={faRegistered} /> <b>  Registration:{doctor.regNumber} </b> <br />
               <FontAwesomeIcon icon={faUserCheck} /> <b>  Member: {doctor.membership} </b>
               </div>
               <div style={{margin:'0 15px 0 '}}>
                  <Avatar  size={150}><img src={doctor.userAvatar.url} alt="Doctor" /></Avatar>
               </div>
               </p>
               

               <hr />
               <h6><FontAwesomeIcon icon={faMoneyBill} /> <b> Fees: {doctor.feesPerConsultation}/-</b></h6>
               <h6><FontAwesomeIcon icon={faClock} /> <b> Timings: {doctor.timings[0]} - {doctor.timings[1]}</b> </h6>
               <h6><FontAwesomeIcon icon={faStar} /> <b> Ratings: {doctor.ratings ? doctor.ratings.toFixed(1) : '(Not rated yet)' } <FontAwesomeIcon icon={faStar} style={{color:'orange'}} /></b></h6>
               <div className="d-flex flex-column w-100">
                    <DatePicker 
                    className='m-2'
                    format= 'DD-MM-YYYY'
                    onChange= {(value)=> {
                      setDate( moment(value).format("DD-MM-YYYY"))
                    }} />
                    <TimePicker
                     className='m-2'
                     format= 'HH:mm'
                     onChange= {(value)=> {
                      setTime( moment(value).format("HH:mm"))
                    }} />

                     
                    <button className='btn btn-danger ' onClick= {handleAvailability}><b>Check Availability </b></button>
                    <button className='btn btn-dark  my-2' onClick= {handleBooking}><b>Book Now </b></button>
                    
               </div>             
               </div>     
                   )}

                   <hr />

                    <div>
                      <h5 style={{color:'crimson',textDecoration:'underline',fontWeight:'bold'}}><FontAwesomeIcon icon={faStar} />Rate Doctor as per your experience:</h5>
                    <Rate allowHalf onChange={setDoctorRatings} 
                    style={{backgroundColor:'white',
                    padding:'2px',
                    border:'2px solid black',
                    borderRadius:'10px'}} />
                    </div>
                    <hr />
                    <div className="row mt-2 mb-2">
                    <label htmlFor="review" style={{color:'crimson',textDecoration:'underline'}}><h5><FontAwesomeIcon icon={faFeed} /><b>Your Feedback:</b></h5></label>
                    <textarea
                        name="review"
                        id="review" 
                        className="form-control mt-1"
                        value={comment}
                        // style={{opacity:'0.5'}}
                        placeholder='give your valuable feedback to betterment of future services...'
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <button className="btn btn-dark my-2 text-white"
                     onClick={createNewReview}>Submit</button>
                    </div>
                    <hr />

            {doctor?.reviews && doctor?.reviews.length > 0 && (
                <ListReviews reviews={doctor.reviews} />
              )}

     </div>
    </Layout>
  )
}

export default BookingPage