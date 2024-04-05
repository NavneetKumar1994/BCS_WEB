import React,{useState, useEffect} from 'react'
import Layout from '../components/Layout'
import axios from 'axios'
import moment from 'moment'
import { Table } from 'antd'

const Appointments = () => {

     const [appointments,setAppointments]= useState([])

     const getAppointments = async () => {
          try {
               const res= await axios.get('/api/v1/user/user-appointments',{
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

     const columns= [
          {title:  <span style={{ color: 'rgb(14, 75, 75)' }}>ID</span>,
          dataIndex: '_id'
         },
         {title:  <span style={{ color: 'rgb(14, 75, 75)' }}>Doctor Name</span>,
          dataIndex: 'name',
          render: (text, record) => (
            <span>
              {record.doctorInfo.firstName} {record.doctorInfo.lastName}
            </span>
          )
         },
         {title:  <span style={{ color: 'rgb(14, 75, 75)' }}>Email</span>,
          dataIndex: 'email',
          render: (text, record) => (
            <span>
              {record.doctorInfo.email}
            </span>
          )
         },
         {title:  <span style={{ color: 'rgb(14, 75, 75)' }}>Phone Number</span>,
          dataIndex: 'phone',
          render: (text, record) => (
            <span>
              {record.doctorInfo.phone} 
            </span>
          )
         },
         {title:  <span style={{ color: 'rgb(14, 75, 75)' }}>Date & Time</span>,
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
     <h3 className='text-center text-danger py-4'
       style={{position:'absolute',zIndex:999,width:'77.5%',backgroundColor:'trasparent',fontWeight:'bold'}}>Appointments <hr /></h3>
     <Table columns={columns} dataSource={appointments}   style={{marginTop:'8%',background:'linear-gradient(45deg, oldlace, turquoise, oldlace)'}} />
    </Layout>
  )
}

export default Appointments