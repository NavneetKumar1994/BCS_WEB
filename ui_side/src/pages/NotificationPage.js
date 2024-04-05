import React from 'react'
import Layout from '../components/Layout'
import { useNavigate } from'react-router-dom'
import axios from 'axios'
import { Tabs, message } from 'antd'
import { useSelector,useDispatch } from 'react-redux'
import { showLoading, hideLoading } from '../redux/features/alertSlice'

const NotificationPage = () => {
     
     const {user} = useSelector(state=> state.user)
     const dispatch= useDispatch();
     const navigate= useNavigate();

     //handle read notification
     const handleMarkAllRead = async () => {
          try {
               dispatch(showLoading());
               const res= await axios.post('/api/v1/user/get-all-notification',
               {userId: user._id},{
                    headers: {
                     Authorization: `Bearer ${localStorage.getItem('token')}`
                 }
               })
               dispatch(hideLoading())
               window.location.reload();
               if(res.data.success){
                    message.success(res.data.message)
                    navigate('/notifications')
               }else{
                    message.error(res.data.message)
               }
          } catch (error) {
               dispatch(hideLoading());
              console.log(error);
              message.error("something went wrong") 
          }
     }
     const handleDeleteAllRead = async () => {
          try{
                dispatch(showLoading());
                const res= await axios.post('/api/v1/user/delete-all-notification',{
                     userId: user._id},{
                      headers: {
                       Authorization: `Bearer ${localStorage.getItem('token')}`
                     }
                })
                dispatch(hideLoading());
                if(res.data.success){
                    message.success(res.data.message)
                    setTimeout(()=> {
                         window.location.reload()
                    },1000)
                }else{
                    message.error(res.data.message)
                }
          }catch(error){
               console.log(error);
               message.error("something went wrong")
          }
     }

     const formatTimestamp = (timestamp) => {
          const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
        
          // Check if the timestamp is valid
          const isValidTimestamp = timestamp && !isNaN(timestamp);
        
          // Format the timestamp if it's valid, otherwise return an empty string or another default value
          return isValidTimestamp ? new Date(timestamp).toLocaleDateString(undefined, options) : 'Invalid Timestamp';
        };   

  return (
     <Layout>
     <h3 className='text-center text-danger py-4 border border-danger rounded'
       style={{position:'absolute',zIndex:999,width:'77.5%',backgroundColor:'transparent',fontWeight:'bold'}}>Notifications <hr /></h3>
       <Tabs style={{margin:'8% 20% 0 20%',
                     padding: '5px',
                     minHeight:'85%',
                     border:'4px solid rgb(17, 216, 216)',
                     borderRadius:'10px',
                     overflowY:'auto',
                     }}
                     >
          <Tabs.TabPane tab={<span style={{ color: 'crimson',margin:'0 25px 0 25px' }}><b> New </b></span>} key={0} >
               <div className="d-flex justify-content-end">
                    <h5 className='p-2 text-success' onClick={handleMarkAllRead} style={{cursor:'pointer'}}>Mark all read</h5>
               </div>
               {
                    user?.notifications.map(notification => (
                          <div className="card py-2 mb-2 text-dark" 
                         //  onClick= {navigate(notification.onClickPath)}
                          style={{cursor:'pointer', fontWeight:'bold',        background:'linear-gradient(45deg, oldlace, turquoise, oldlace)'}}>
                              <div className="card-text">
                                   {notification.message}
                                   {/* <p className="notification-timestamp">{formatTimestamp(notification.timestamp)}</p> */}
                              </div>
                          </div> 
                    ))
               }
          </Tabs.TabPane>

          <Tabs.TabPane tab={<span style={{ color: 'crimson',margin:'0 25px 0 25px' }}> <b> Seen </b></span>} key={1}>
               <div className="d-flex justify-content-end">
                    <h5 className='p-2 text-danger' onClick={handleDeleteAllRead} style={{cursor:'pointer'}}>Delete all read</h5>
               </div>

               {
                    user?.seenNotifications.map(notification => (
                          <div className="card py-2 mb-2 text-light bg bg-success" 
                         //  onClick= {navigate(notification.onClickPath)}
                          style={{cursor:'pointer',fontWeight:'bold'}}>
                              <div className="card-text">
                                   {notification.message}
                                   {/* <p className="notification-timestamp">{formatTimestamp(notification.timestamp)}</p> */}
                              </div>
                          </div> 
                    ))
               }
          </Tabs.TabPane>
       </Tabs>
    </Layout>
  )
}

export default NotificationPage