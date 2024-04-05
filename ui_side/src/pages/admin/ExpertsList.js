import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import { Table, message, Input } from "antd";
import { SearchOutlined } from '@ant-design/icons';


function ExpertsList() {

     const [experts, setExperts] = useState([]);
     const [searchTerm, setSearchTerm] = useState('');


     const getExperts = async () => {
          try {
            const res = await axios.get("/api/v1/admin/getAllExperts", {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            });
            if (res.data.success) {
              setExperts(res.data.data);
            }
          } catch (error) {
            console.log(error);
          }
        };

        //get Doctor detail
        const getExpertDetail = async () => {}

        //delete Expert
        const deleteExpert = async (expertId) => {
          try{
             const res= await axios.delete(`/api/v1/admin/deleteExpert/${expertId}`,{
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
                const res= await axios.post('/api/v1/admin/changeExpertStatus',
                {expertId:record._id, userId:record.userId ,status:status},{
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                  }
                })
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

         //search expert by their expertize by name
      const filteredExperts = experts.filter((expert) => {
        return expert.expertRole.toLowerCase().includes(searchTerm.toLowerCase());
      });




        useEffect(() => {
          getExperts();
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
            title: "Role",
            dataIndex: "expertRole",
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
                
                <button className="btn btn-success m-2" onClick={() => getExpertDetail(record._id)}>
                 <i className="fa fa-edit"></i>
                </button>
                <button className="btn btn-danger m-2" onClick={()=> deleteExpert(record._id)} >
                 <i className="fa fa-trash"></i>
                </button>
              </div>

              
            ),
          },
        ];

  return (
    <Layout>
     <h3 className='text-center text-danger py-4 '
       style={{position:'absolute',zIndex:999,width:'77.5%',backgroundColor:'transparent',fontWeight:'bold'}}>Hospital Staffs <hr /></h3>
     <Input
        style={{ width: '30%', 
        marginLeft: '1%', 
        boder:'2px solid black',
        marginTop:'6%',
        position:'fixed',
        zIndex:999,
        background:'linear-gradient(45deg, oldlace, turquoise, oldlace)',
        }}
        placeholder= "Search by Role"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        suffix={<SearchOutlined />}
       />
       {
        <Input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
       /> 
       ?
       <Table className="table-container" columns={columns} dataSource={filteredExperts} style={{ marginTop: '12%' }}/>
       :
       <Table className='table-container' columns={columns} dataSource={experts} style={{marginTop:'12%'}} />
       }    
    </Layout>
  )
}

export default ExpertsList