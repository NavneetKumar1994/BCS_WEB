import React,{useState, useEffect} from 'react'
import Layout from '../components/Layout'
import axios from 'axios'
import moment from 'moment'
import { Table } from 'antd'

const DoctorAppointments = () => {

     const [appointments,setAppointments]= useState([])
    

     const getAppointments = async () => {
          try {
               const res= await axios.get('/api/v1/doctor/doctor-appointments',{
                     headers: {
                         Authorization: `Bearer ${localStorage.getItem('token')}`
                     }
               })
               if(res.data.success){
                    setAppointments(res.data.data)
               }
          } catch (error) {
               console.log(error);
          }
     }

     useEffect(()=> {
          getAppointments()
     },[])

     const changeAppointmentStatus= (record,status)=> {
      
     }

     const columns= [
       {title: <span style={{ color: 'rgb(17, 216, 216)' }}>ID</span>,
        dataIndex: '_id'
      },       
         {title: <span style={{ color: 'rgb(17, 216, 216)' }}>Name</span>,
          dataIndex: 'name',
          render: (text, record) => (
            <span>
              {record.userInfo.name}
            </span>
          )
         },
         {title: <span style={{ color: 'rgb(17, 216, 216)' }}>Email</span>,
          dataIndex: 'email',
          render: (text, record) => (
            <span>
              {record.userInfo.email}
            </span>
          )
         },
         {title: <span style={{ color: 'rgb(17, 216, 216)' }}>Phone Number</span>,
          dataIndex: 'phone',
          render: (text, record) => (
            <span>
              {record.userInfo.phone}
            </span>
          )
         },
         {title: <span style={{ color: 'rgb(17, 216, 216)' }}>Age</span>,
          dataIndex: 'age',
          render: (text, record) => (
            <span>
              {record.userInfo.age} 
            </span>
          )
         },
         {title: <span style={{ color: 'rgb(17, 216, 216)' }}>Date & Time</span>,
          dataIndex: 'date',
          render: (text, record) => (
            <span>
               {moment(record.date).format('DD-MM-YYYY')} &nbsp;
               {moment(record.time).format('HH:mm')}
            </span>
          )
         }
     ]


  return (
    <Layout>
     <h3 className='text-center text-danger py-4 border border-danger rounded'
       style={{position:'absolute',zIndex:999,width:'77.5%',backgroundColor:'transparent',fontWeight:'bold'}}>Appointments List <hr /></h3>
      <Table columns={columns} dataSource={appointments} style={{marginTop:'10%'}} />
    </Layout>
  )
}

export default DoctorAppointments