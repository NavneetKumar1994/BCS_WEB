import React,{useState} from 'react'
import Layout from '../../components/Layout'
import { useNavigate } from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import { hideLoading, showLoading } from '../../redux/features/alertSlice'
import { Col, Form, Input, Row, message} from "antd";
import CustomUpload from '../../components/CustomUpload'


import axios from 'axios'

const UserProfile = () => {
     const {user} = useSelector(state=> state.user);
     const dispatch= useDispatch();
     const navigate= useNavigate();
     const [avatar,setAvatar] = useState('');


     const handleFinish= async(values) => {
          try {
               dispatch(showLoading());
               const res= await axios.post(`/api/v1/user/updateUserProfile`,
               {userId:user._id,
                values
               },
               {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
               }
            )
            dispatch(hideLoading());
            if(res.data.success){
               message.success(res.data.message)
               setTimeout(() => {
                    window.location.reload();
                  }, 1000);
            }else{
               message.error(res.data.message)
            }

          } catch (error) {
             dispatch(hideLoading()) 
             console.log(error);
             message.error("Somthing Went Wrrong ");
          }
     }

     //change avatar
     const onChangeAvatar = async (avatar) => {
      try {
                 dispatch(showLoading());
                 const res= await axios.post(`/api/v1/user/updateUserAvatar`,
                 {userId:user._id,
                  avatar
                 },
                 {
                      headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                      },
                 }
              )
              dispatch(hideLoading());
              if(res.data.success){
                 message.success(res.data.message)
                 setTimeout(() => {
                      window.location.reload();
                    }, 1000);
              }else{
                 message.error(res.data.message)
              }
      
            } catch (error) {
               dispatch(hideLoading()) 
               console.log(error);
               message.error("Somthing Went Wrrong ");
            }
     }

     const onClickUpdatePassword= () => {
         navigate('/password/update')
     }



     

  return (
    <Layout>
     <h3 className='text-center text-danger py-4 '
       style={{position:'absolute',zIndex:999,width:'77.5%',backgroundColor:'transparent',fontWeight:'bold'}}>User Profile <hr /></h3>
    
     {user && (
      <>
                <div label='' name='avatar' style={{marginTop:'8%',display:'flex',justifyContent:'center'}}>
                 <CustomUpload avatar={avatar} onChange={onChangeAvatar}/>
                </div>   
        <Form
          style={{padding:'2px',fontWeight:'bold',color:'red',backgroundColor:'transparent'}}
          layout="vertical"
          onFinish={handleFinish}
          className="form-control p-3"  
          initialValues={{
               ...user
          }}   
         >
          <h4 className="text-danger"> <b> Personal Details : </b> </h4>
          <Row gutter={20} className='mb-5'>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Name"
                name="name"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Enter your Name" />
              </Form.Item>
            </Col>

            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Email"
                name="email"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Enter your Email" />
              </Form.Item>
            </Col>

            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Phone Number"
                name="phone"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="your contact no" />
              </Form.Item>
            </Col>

            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Age"
                name="age"
                required
                rules={[{ required: true }]}
              >
                <Input type="number" placeholder="Enter your Age" />
              </Form.Item>
            </Col>

            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Profession"
                name="profession"
              >
                <Input type="text" placeholder="Enter your Profession" />
              </Form.Item>
            </Col>

            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Work Experience"
                name="experience"
              >
                <Input type="text" placeholder="Work experience/Institutional Detail" />
              </Form.Item>
            </Col>

            <Col xs={24} md={24} lg={8}>
              <Form.Item 
              label="Address" 
              name="address" 
              required rules={[{ required: true }]}>
              <Input.TextArea rows={4} placeholder="Enter your Address" />              
              </Form.Item>
            </Col>


          </Row>
          <div>
                <button className='btn btn-dark form-control' style={{fontWeight:'bold'}}> <b> Update Profile </b> </button>
           </div>
           <button className='btn form-control text-white' style={{backgroundColor:'crimson',color:'rgb(244, 62, 30)',fontWeight:'bold'}} onClick={onClickUpdatePassword}>
                Update Password
           </button>
        </Form>
        </>
      )}

    </Layout>
  )
}

export default UserProfile