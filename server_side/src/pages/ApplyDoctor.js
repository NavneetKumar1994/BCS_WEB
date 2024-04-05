import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Layout from '../components/Layout'
import {showLoading, hideLoading} from '../redux/features/alertSlice'
import {Col, Form,Input,Row,TimePicker,message} from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import moment from "moment";


const ApplyDoctor = () => {

     const {user}= useSelector(state=> state.user)

     const dispatch= useDispatch();
     const navigate= useNavigate();

     //handleform
     const handleFinish = async (values) => {
           try {
               dispatch(showLoading())
               const res= await axios.post('/api/v1/user/apply-doctor',
               {
                    ...values,
                    userId: user._id,
                    userAvatar: user.avatar,
                    timings: [
                         (values.timings[0]).format("HH:mm"),
                         (values.timings[1]).format("HH:mm"),
                       ]
               },
               {
                    headers: {
                         Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
               })
               dispatch(hideLoading())
               if(res.data.success){
                    message.success(res.data.message)
                    navigate('/')
               }else{
                    message.error(res.data.success)
               }
           } catch (error) {
               dispatch(hideLoading())
               console.log(error)
               message.error('Something went wrong')
           }
     }

  return (
     <Layout>
       <h3 className='text-center text-danger py-4'
       style={{position:'absolute',zIndex:999,width:'77.5%',backgroundColor:'transparent',fontWeight:'bold'}}>
       Connect as a Doctor with BCS
       <hr />
       </h3>
      <Form 
      style={{padding:'10px',fontWeight:'bold',backgroundColor:'transparent'}} 
      layout='vertical' 
      onFinish={handleFinish} 
      className='form-control'
      initialValues={{
          ...user
       }}
       >

       <h4 className='text-danger' style={{marginTop:'10%'}}> <b> Personal Details: </b></h4>
        <Row gutter={20} className='mb-5'>
          <Col xs={24} md={24} lg={8}>
               <Form.Item 
               label='First Name' 
               name='firstName' 
               required 
               rules={[{required:true}]}
               >
                    <Input placeholder='Enter first name'/>
               </Form.Item>
          </Col>
     
          <Col xs={24} md={24} lg={8}>
               <Form.Item 
               label='Last Name' 
               name='lastName' 
               required 
               rules={[{required:true}]}
               >
                    <Input placeholder='Enter last name'/>
               </Form.Item>
               </Col>


          <Col xs={24} md={24} lg={8}>
               <Form.Item 
               label='Phone Number' 
               name='phone' 
               required 
               rules={[{required:true}]}
               >
                    <Input placeholder='Your contact number'/>
               </Form.Item>
          </Col>

               
          <Col xs={24} md={24} lg={8}>
               <Form.Item 
               label='Email' 
               name='email' 
               required 
               rules={[{required:true}]}
               >
                    <Input placeholder='Enter your Email'/>
               </Form.Item>
     </Col>


          <Col xs={24} md={24} lg={8}>  
               <Form.Item 
               label='Website' 
               name='website' 
               >
                    <Input placeholder='Enter Website name! optional...'/>
               </Form.Item>
          </Col>

               
          <Col xs={24} md={24} lg={8}>
               <Form.Item 
               label='Address' 
               name='address' 
               required 
               rules={[{required:true}]}
               >
                    <Input.TextArea row={4} placeholder='Your clinic address'/>
               </Form.Item>
          </Col>               
        </Row>

        <h4 className='text-danger'> <b>Professional Details:</b></h4>
        <Row gutter={20}>
          <Col xs={24} md={24} lg={8}>
               <Form.Item 
               label='Specialization' 
               name='specialization' 
               required 
               rules={[{required:true}]}
               >
                    <Input placeholder='Enter your specialization'/>
               </Form.Item>
          </Col>

          <Col xs={24} md={24} lg={8}>
               <Form.Item 
               label='Registration Number' 
               name='regNumber' 
               >
                    <Input placeholder='Enter your registration(if available)'/>
               </Form.Item>
          </Col>

          <Col xs={24} md={24} lg={8}>
               <Form.Item 
               label='Member' 
               name='membership' 
               >
                    <Input placeholder='Optional, if you have...'/>
               </Form.Item>
          </Col>
     
     
          <Col xs={24} md={24} lg={8}>
               <Form.Item 
               label='Experience' 
               name='experience' 
               required 
               rules={[{required:true}]}
               >
                    <Input.TextArea row={4} placeholder='Enter your experience'/>
               </Form.Item>
               </Col>


          <Col xs={24} md={24} lg={8}>
               <Form.Item 
               label='Fees Per Consultation' 
               name='feesPerConsultation' 
               required 
               rules={[{required:true}]}
               >
                    <Input placeholder='Your consultation fees'/>
               </Form.Item>
          </Col>

               
          <Col xs={24} md={24} lg={8}>
               <Form.Item 
               label='Timings' 
               name='timings' 
               required 
               rules={[{required:true}]}
               >
                    <TimePicker.RangePicker format="HH:mm"/>
               </Form.Item>
          </Col> 

        </Row>
           <div className="d-flex justify-content-end">
                <button className='btn btn-dark form-control'><b>Submit</b></button>
           </div>
      </Form>

    </Layout>
  )
}

export default ApplyDoctor