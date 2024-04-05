import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import { Table, message } from "antd";

function DoctorsList() {

     const [doctors, setDoctors] = useState([]);

     const getDoctors = async () => {
          try {
            const res = await axios.get("/api/v1/admin/getAllDoctors", {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            });
            if (res.data.success) {
              setDoctors(res.data.data);
            }
          } catch (error) {
            console.log(error);
          }
        };

        //get Doctor detail
        const getDoctorDetail = async () => {}

        //delete Doctor
        const deleteDoctor = async (doctorId) => {
          try{
             const res= await axios.delete(`/api/v1/admin/deleteDoctor/${doctorId}`,{
              headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`
              }
             })
             if(res.data.success){
              message.success(res.data.message)
              setTimeout(()=> {
                window.location.reload()
              },2000)  
            }
          }catch(error){
            console.log(error);
          }
        }

        //handle Account
        const handleAccountStatus= async (record,status) => {
            try{
                const res= await axios.post('/api/v1/admin/changeAccountStatus',
                {doctorId:record._id, userId:record.userId ,status:status},{
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                  }
                })
                console.log(res);
                if(res.data.success){
                  message.success(res.data.message);
                  window.location.reload();
                }else{
                  message.success(res.data.message);
                }
            }catch(error){
              console.log(error);
              message.error('Something went wrong')
            }
        }



        useEffect(() => {
          getDoctors();
        }, []);

        const columns = [
          {
            title: "Name",
            dataIndex: "name",
            render: (text, record) => (
              <span>
                {record.firstName} {record.lastName}
              </span>
            ),
          },
          {
            title: "Status",
            dataIndex: "status",
          },
          {
            title: "phone",
            dataIndex: "phone",
          },
          {
            title: "Actions",
            dataIndex: "actions",
            render: (text, record) => (
              
              <div className="d-flex">
                {record.status === "pending" ? (
                  <button className="btn btn-success m-2" 
                  onClick= {()=> handleAccountStatus(record,"approved")}>Approve</button>
                ) : (
                  <button className="btn btn-dark m-2"
                  onClick= {()=> handleAccountStatus(record,"pending")} >Block</button>
                )}
                
                <button className="btn btn-success m-2" onClick={() => getDoctorDetail(record._id)}>
                 <i className="fa fa-edit"></i>
                </button>
                <button className="btn btn-danger m-2" onClick={()=> deleteDoctor(record._id)} >
                 <i className="fa fa-trash"></i>
                </button>
              </div>

              
            ),
          },
        ];

  return (
    <Layout>
     <h3 className='text-center text-danger py-4'
       style={{position:'absolute',zIndex:999,width:'77.5%',backgroundColor:'transparent',fontWeight:'bold'}}>Doctors <hr /></h3>
     <Table columns={columns} dataSource={doctors} style={{marginTop:'8%',backgroundColor:'transparent'}} />
    </Layout>
  )
}

export default DoctorsList