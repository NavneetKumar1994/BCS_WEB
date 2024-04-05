import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import Layout from '../../components/Layout'
import { Table, message, Input, Avatar } from "antd";
import { SearchOutlined } from '@ant-design/icons';

function UsersList() {
     const [users,setUsers]= useState([]);
     const [userDetail,setUserDetail]= useState({});
     const [searchTerm, setSearchTerm] = useState('');

     const navigate= useNavigate();

     //getUsers 
      const getUsers = async () => {
          try {
            const res= await axios.get('/api/v1/admin/getAllUsers',{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if(res.data.success){
               setUsers(res.data.data)
            }  
          } catch (error) {
               console.log(error);
          }
      }

      //get user detail
      const getUserDetail = async (userId) => {
        try{
          const res= await axios.get(`/api/v1/admin/getUserDetails/${userId}`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          })
          navigate(`/admin/users/${userId}`)
          if(res.data.success){
            message.success(res.data.message)
            setUserDetail(res.data.data)
            console.log(res.data.data);
          }
        }catch(error){
          console.log(error);
        }
      }

      const deleteUser = async (userId) => {
        try{
           const res= await axios.delete(`/api/v1/admin/deleteUser/${userId}`,{
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

      //search user by name
      const filteredUsers = users.filter((user) => {
        return user.name.toLowerCase().includes(searchTerm.toLowerCase());
      });
 
      useEffect(()=> {
         getUsers()
      },[])

      // antD table col
  const columns = [
    {
      title: <h6 style={{ color: 'rgb(14, 75, 75)',fontWeight:'bold' }}>Avatar</h6>,
      dataIndex: "phone",
      render: (text, record) => <span  >
         <Avatar size={50}><img src={record.avatar?.url} alt="User" /></Avatar> 
        </span>,

    },
     {
       title: <h6 style={{ color: 'rgb(14, 75, 75)',fontWeight:'bold' }}>Name</h6>,
       dataIndex: "name",
       render: text => <span >{text}</span>
     },
     {
      title: <h6 style={{ color: 'rgb(14, 75, 75)',fontWeight:'bold' }}>Email</h6>,
      dataIndex: "email",
       render: text => <span >{text}</span>

     },{
      title: <h6 style={{ color: 'rgb(14, 75, 75)',fontWeight:'bold' }}>Contact</h6>,
      dataIndex: "phone",
      render: (text, record) => <span  >{record.phone}</span>,

    },
    //  {
    //   title: <h6 style={{ color: 'rgb(14, 75, 75)',fontWeight:'bold' }}>Profession</h6>,
    //   dataIndex: "profession",
    //    render: (text, record) => <span >{record.profession}</span>,
    //  },
    //  {
    //   title: <h6 style={{ color: 'rgb(14, 75, 75)',fontWeight:'bold' }}>Experience</h6>,
    //   dataIndex: "experience",
    //   render: (text, record) => <span >{record?.experience}</span>
    // },
     {
      title: <h6 style={{ color: 'rgb(14, 75, 75)',fontWeight:'bold' }}>Actions</h6>,
      dataIndex: "actions",
       render: (text, record) => (
         <div className="d-flex">   
           <button className="btn btn-success m-2" onClick={() => getUserDetail(record._id)}>
           <i className="fa fa-edit"></i>
           </button>
           <button className="btn btn-danger m-2" onClick={()=> deleteUser(record._id)} >
           <i className="fa fa-trash"></i>
           </button>
         </div>
       ),
     },
   ];
 

  return (
    <Layout>
     <h3 className='text-center text-danger py-4'
       style={{position:'absolute',zIndex:999,width:'77.5%',backgroundColor:'transparent',fontWeight:'bold'}}>Users <hr /></h3>
       <Input
        style={{ width: '30%', marginLeft: '1%',marginTop:'6%',
        position:'fixed',
        zIndex:999,
        background:'linear-gradient(45deg, oldlace, turquoise, oldlace)',
        }}
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        suffix={<SearchOutlined />}
       />
       {<Input
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
       /> 
       ?
       <Table className="table-container" columns={columns} dataSource={filteredUsers} style={{ marginTop: '12%' }}/>
       :
       <Table className='table-container' columns={columns} dataSource={users} style={{marginTop:'12%'}} />
       }
    </Layout>
  )
}

export default UsersList