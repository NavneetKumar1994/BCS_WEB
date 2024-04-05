import React from 'react'
import {Link} from 'react-router-dom'
export default function Footer() {
  return (
     <>
     <footer className="border-top border-danger py-3 text-center small" style={{fontWeight:'bold'}}>

      <h6 style={{fontWeight:'bold'}}> 
         <Link to="/login" className="mx-1 text-danger">Home</Link> |
         <Link to="/about" className="mx-1 text-danger">About</Link> |
         <Link to="/terms&conditions" className="mx-1 text-danger">Terms&Conditions</Link>
      </h6>
      <p>Copyright &copy; All rights reserved:BCS</p>
     </footer>
    </>  
      )
}
