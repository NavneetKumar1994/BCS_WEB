import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import { Row, Input } from 'antd';
import DoctorsList from '../components/DoctorsList';
import { SearchOutlined } from '@ant-design/icons';


const HomePage = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Get doctors data
  const getDoctorsData = async () => {
    try {
      const res = await axios.get('/api/v1/user/getAllDoctors', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });  
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDoctorsData();
  }, []);

  // Filter doctors by specialization
  const filteredDoctors = doctors.filter(doctor =>
    doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <h3 className='text-center text-danger py-4 ' 
      style={{ position: 'absolute', zIndex: 999, width: '77.5%',
       backgroundColor: 'transparent', fontWeight: 'bold' }}>Doctors With BCS <hr /></h3>
      <Input
        style={{ width: '30%', marginLeft: '0.8%', marginTop: '8%',background:'linear-gradient(45deg, oldlace, turquoise, oldlace)' }}
        placeholder="Search Doctors by specialization"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        suffix={<SearchOutlined />}
      />
      <hr />
      <Row>
        {filteredDoctors.map(doctor => (
          <DoctorsList key={doctor._id} doctor={doctor} />
        ))}
      </Row>
    </Layout>
  );
}

export default HomePage;
