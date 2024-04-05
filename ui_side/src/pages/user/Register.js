import React from 'react'
import {Form, Input, message} from 'antd'
import { useDispatch } from 'react-redux'
import { showLoading , hideLoading} from '../../redux/features/alertSlice'
import '../../styles/RegisterStyles.css'
import {Link,useNavigate} from 'react-router-dom'
import axios from 'axios'
import Footer from '../../components/footer/Footer'

const Register = () => {
     const navigate = useNavigate();
     const dispatch= useDispatch();


     //Form handler
     const onFinishHandler= async (values) => {
          try{
               dispatch(showLoading())
               const res= await axios.post('/api/v1/user/register', values)
               dispatch(hideLoading())
                if(res.data.success){
                    message.success('Registered successfully');
                    navigate('/login')
                }else{
                    message.error(res.data.message);
                }
          }catch(error){
             dispatch(hideLoading())
             console.log(error);
             message.error('Something went wrong');
          }
     }

  return (
     <>
     <div className='welcome-header row' style={{border:'2px solid',display:'flex',justifyContent:'space-between'}}>
        <img className='image1' src="/images/bcsLogo.jpeg" alt="logo" />
        Bihar Cancer Surgical
        <img className='image2' src="/images/bcsLogo.jpeg" alt="logo" />
        </div>
     <div className="row display-flex justify-content-center align-items-center" style={{margin:'10vh 0 5vh 0'}}>    
     <div className="col-lg-7 ">
     <h1 className="display-3" style={{color:'crimson'}}>Empowering Hope, Defeating Cancer</h1>
                    {/* <p className="lead text-muted">
                         We understand the physical, emotional, and psychological impact that a cancer diagnosis can have on individuals and their loved ones. That's why our highly skilled team of surgeons, oncologists, and medical professionals work tirelessly to deliver personalized care with utmost compassion and empathy.  At Bihar Cancer Surgical, your health and well-being are our top priorities,  we strive to make a positive impact in the lives of those affected by cancer. Together, let's fight cancer and embrace a future filled with healing, resilience, and renewed hope.
                    </p> */}
     </div>
      <div className="col-lg-4" style={{border:'3px solid maroon',borderRadius:'10px',backgroundColor:'transparent',
      backgroundImage:'url("https://assets.medpagetoday.net/media/images/102xxx/102611.jpg?width=0.6")',backgroundSize:'cover'}}>

     <div className="form-container" style={{backgroundColor:'transparent'}}>
         <Form layout='vertical' onFinish={onFinishHandler} className='register-form' >
         <h5 style={{
      backgroundColor: 'crimson',
      padding: '10px',
      textAlign: 'center',
      border: '2px solid',
      borderRadius: '5px',
      position: 'relative',
      right: '15%', // Set the left position to 10%
    }}>Welcome to Bihar Cancer Surgical</h5>

          <h3 className='text-center text-white'>SignUp</h3>
               <Form.Item label="Name" name='name'>
                    <Input type='text' placeholder='Enter your name' required />
               </Form.Item>
               <Form.Item label="Email" name='email' >
                    <Input type='text' placeholder='Enter your email' required />
               </Form.Item>
               <Form.Item label="Phone Number" name='phone' >
                    <Input type='number' placeholder='Enter your contact number' required />
               </Form.Item>
               <Form.Item label="Password" name='password' >
                    <Input type='password' placeholder='Enter your password' required />
               </Form.Item>
               <button className='form-control btn btn-primary' style={{backgroundColor:'crimson',border:'2px solid black'}}>Register</button>
               <Link to='/login' className='m-2' style={{textDecoration:'none',color:'crimson',fontWeight:'bold'}}>Existing User! Login here </Link>
         </Form>
     </div>
     </div> 


</div>  
<Footer/>  

     </>
  )
}

export default Register