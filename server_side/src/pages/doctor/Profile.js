import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Col, Form, Input, Row, TimePicker, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../redux/features/alertSlice";
import moment from "moment";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const [doctor, setDoctor] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  // update doc ==========
  //handle form
  const handleFinish = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/doctor/updateProfile",
        {
          ...values,
          userId: user._id,
          timings: [
           (values.timings[0]).format("HH:mm"),
           (values.timings[1]).format("HH:mm"),
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Somthing Went Wrrong ");
    }
  };
  // update doc ==========

  //getDOc Details
  const getDoctorInfo = async () => {
    try {
      const res = await axios.post(
        "/api/v1/doctor/getDoctorInfo",
        { userId: params.id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setDoctor(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDoctorInfo();
  }, []);

  return (
    <Layout>
     <h3 className='text-center text-danger py-4 '
       style={{position:'absolute',zIndex:999,width:'77.5%',backgroundColor:'transparent',fontWeight:'bold'}}>Manage profile</h3>
      {doctor && (
        <Form
          style={{marginTop:'8%',fontWeight:'bold',backgroundColor:'transparent'}}
          layout="vertical"
          onFinish={handleFinish}
          className="form-control"
          initialValues={{
            ...doctor,
            timings: [
              moment(doctor.timings[0], "HH:mm"),
              moment(doctor.timings[1], "HH:mm"),
            ],
          }}
          
        >
          <h4 className="text-danger"><b>Personal Details :</b></h4>
          <Row gutter={20} className='mb-5'>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="First Name"
                name="firstName"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="your first name"/>
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Last Name"
                name="lastName"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="your last name" />
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
                label="Email"
                name="email"
                required
                rules={[{ required: true }]}
              >
                <Input type="email" placeholder="your email address" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label="Website" name="website">
                <Input type="text" placeholder="your website" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Address"
                name="address"
                required
                rules={[{ required: true }]}
              >
                <Input.TextArea row={4} type="text" placeholder="your clinic address" />
              </Form.Item>
            </Col>
          </Row>
          <hr />
          <h4 className="text-danger"><b>Professional Details :</b></h4>
          <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Specialization"
                name="specialization"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="your specialization" />
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
                label="Fees Per Consultation (/-)"
                name="feesPerConsultation"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="your consultation" />
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
          <hr />
          <div className="d-flex ">
                <button className='btn btn-dark text-danger form-control' style={{fontWeight:'bold'}}>Update</button>
           </div>
        </Form>
      )}
    </Layout>
  );
};

export default Profile;