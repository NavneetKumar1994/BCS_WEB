import React from 'react'
import "../styles/LayoutStyles.css";
import { AdminMenu } from '../Data/data';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge, message, Avatar } from "antd";

const Layout = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const welcomeName= user?.name.split(' ')[0]=== 'Dr.' ?
   user?.name.split(' ')[0]+' '+user?.name.split(' ')[1] : user?.name.split(' ')[0];
  const location = useLocation();
  const navigate= useNavigate();

  //logout function
  const handleLogout = () => {
    localStorage.clear();
    message.success(<b>'Take care & Stay Healthy! Bye'</b>)
    navigate('/login')
  };

  // =========== user menu ===============
  const UserMenu = [
    {
      name: "Home",
      path: "/",
      icon: "fa-solid fa-hospital",
    },
    {
      name: "Appointments",
      path: "/appointments",
      icon: "fa-solid fa-list",
    },
    {
      name: "Apply_Doctor",
      path: "/apply-doctor",
      icon: "fa-solid fa-user-doctor",
    },
    {
      name: "Apply_Experts",
      path: "/apply-experts",
      icon: "fa-solid fa-users",
    },
    {
      name: "Profile",
      path: `/user/profile/${user?._id}`,
      icon: "fa-solid fa-user",
    }
  ];

   // =========== doctor menu ===============
   const doctorMenu = [
    {
      name: "Home",
      path: "/",
      icon: "fa-solid fa-hospital",
    },
    {
      name: "Appointments",
      path: "/doctor-appointments",
      icon: "fa-solid fa-list",
    },

    {
      name: "Doctor Profile",
      path: `/doctor/profile/${user?._id}`,
      icon: "fa-solid fa-user",
    },
  ];
  // =========== doctor menu ===============

  //rendering menu list
  const SidebarMenu = user?.isAdmin
  ? AdminMenu
  : user?.isDoctor
  ? doctorMenu
  : UserMenu;

  return (
    <>
    <div className='row'>
      <div className="main">
        <div className="layout">
          <div className="sidebar">
            <div className="logo">
              <img src="/images/bcsLogo.jpeg" alt="logo" />
              <h6>BIHAR CANCER SURGICAL</h6>
              <p>(ekah jeevanam, ekah avsaram)</p>
              <hr />
            </div>
            <div className="menu">
              {SidebarMenu.map((menu) => {
                const isActive = location.pathname === menu.path;
                return (
                  <>
                    <div className={`menu-item ${isActive && "active"}`}>
                      <i className={menu.icon}></i>
                      <Link to={menu.path}>{menu.name}</Link>
                    </div>
                  </>
                );
              })}
                   <div className={`menu-item`} onClick={handleLogout}>
                      <i className="fa-solid fa-right-from-bracket"></i>
                      <Link to='/login'>Logout</Link>
                    </div>
            </div>
          </div>

          <div className="content">
            <div className="header ">
              <div>
                <Avatar size={65} className='text-dark' 
                style={{backgroundColor:'fireBrick', 
                marginLeft:'5px',
                border:'2px solid black',
                fontSize:'50px',
                fontWeight:'bold'
                }}
                >
                  <img src={user?.avatar?.url} alt={user?.name.split('')[0]} />       
                </Avatar>
              </div>
              <div className="header-content" style={{cursor:'pointer'}}>
              <Badge count={user && user.notifications.length} onClick= {()=> navigate('/notifications')}  >
                  <i className="fa-solid fa-bell"></i>
              </Badge>
                <Link to={`/user/profile/${user?._id}`}>Hello, <b>{welcomeName}</b></Link>
              </div>
            </div>
            <div className="body">{children}</div>
          </div>
        </div>
      </div>
      </div>

      
    
    </>
  );
};

export default Layout;