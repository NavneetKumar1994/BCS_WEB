import React from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { hideLoading, showLoading } from '../../redux/features/alertSlice'
import {  Row, Form, Input, message } from "antd";
import axios from 'axios'
import Layout from '../../components/Layout';


function UpdatePassword() {

     const {user}= useSelector(state => state.user);
     const dispatch= useDispatch();

     const onFinishHandler = async (passwords) => {
        try {
          dispatch(showLoading());
          const res= await axios.put('/api/v1/user/password/update',{
               userId: user._id,
               passwords
          },
          {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
          })
          dispatch(hideLoading());
          if(res.data.success){
              message.success(res.data.message)
          }else{
               message.error(res.data.message)
          }

        } catch (error) {
          dispatch(hideLoading());
           message.error(error.message);
          console.log(error);    
        }
     }

  return (
    <>
    <Layout>
    <h3 className='text-center text-danger py-4'
       style={{position:'absolute',zIndex:999,width:'77.5%',backgroundColor:'transparent'}}> <b>Update Password</b></h3>

       <Form layout='vertical' 
       onFinish={onFinishHandler} 
       className='form-control register-form'           
       style={{marginTop:'8%',background:'transparent'}}
       >

         <h2 className='form-control text-center text-dark py-3' style={{background:'linear-gradient(45deg, oldlace, turquoise, oldlace)',border:'2px solid crimson'}}>
          <b>Change Your Password</b>
         </h2>

         <Row gutter={5} className='form-control mb-2 ' style={{fontWeight:'bold',backgroundColor:'cadetblue',opacity:'0.9'}}>
              {/* <Col xs={24} md={24} lg={8}> */}
              <Form.Item label="Current Password" name='oldPassword' >
                   <Input type='password' placeholder='Enter your current Password' required />
              </Form.Item>
              {/* </Col> */}
              </Row>

              <hr />
              
              {/* <Col xs={24} md={24} lg={8}> */}
              <Row gutter={5} className='form-control mb-2' style={{fontWeight:'bold',backgroundColor:'cadetblue',opacity:'0.9'}}>

              <Form.Item label="New Password" name='newPassword'>
                   <Input type='password' placeholder='Enter New password' required />
              </Form.Item>
              {/* </Col> */}   
              </Row>
              <hr />
              
          <button className=' btn btn-dark form-control' style={{textDecoration:'none',color:'crimson',fontWeight:'bold'}} > Change Password </button>
        </Form>
     </Layout>
    </>
  )
}

export default UpdatePassword