import React from 'react'
import {Link} from 'react-router-dom'
import Container from '../Container'
import Footer from './Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar,faSignIn, faFileContract } from '@fortawesome/free-solid-svg-icons';


export default function Terms() {
  return (
<>
     <Container >
     <Link to='/login' className='form-control mt-5 text-center bg-dark' style={{border:'2px solid black',borderRadius:'5px',color:'crimson',fontWeight:'bold',textDecoration:'none',padding:'5px',backgroundColor:'ActiveBorder'}}><FontAwesomeIcon icon={faSignIn} />  Login</Link>
      <div style={{fontWeight:'bold',color:'black',marginTop:'10px',
      backgroundColor:'cadetblue',opacity:'0.8',padding:'2%'}}>
        <h2 style={{color:'crimson'}}><FontAwesomeIcon icon={faFileContract} /> Terms &amp; Conditions</h2>

<p><FontAwesomeIcon icon={faStar} style={{color:'crimson'}} /> Acceptance of Terms: State that by accessing or using your website, users agree to abide by the terms and conditions.</p> <br />

<p><FontAwesomeIcon icon={faStar} style={{color:'crimson'}}/> User Obligations: Outline the obligations and responsibilities of users when using your website. This may include:<br />

 1. Prohibited activities: Specify any actions or content that are not allowed on your website.<br />
 2. User accounts: Explain the registration process, if applicable, and how users should protect their account information.<br />
 3. Content submission: Specify any guidelines or restrictions on user-generated content.<br />
 4. Compliance with laws: State that users must comply with applicable laws and regulations when using your website.</p><br />
<p><FontAwesomeIcon icon={faStar} style={{color:'crimson'}} /> Intellectual Property: Clarify the ownership of intellectual property rights related to your website's content, such as text, images, logos, and trademarks. Specify that users are not allowed to use or reproduce this content without proper authorization.</p><br />

<p><FontAwesomeIcon icon={faStar} style={{color:'crimson'}}/> Privacy and Data Collection: Explain how you collect, use, store, and protect user data. Include information about cookies, analytics, and third-party services, if applicable. You may want to refer users to a separate privacy policy for more detailed information.</p><br />

<p><FontAwesomeIcon icon={faStar} style={{color:'crimson'}}/> Disclaimers: Include disclaimers to limit your liability. For example:

Content accuracy: Clarify that the information provided on your website is for general informational purposes only and may not be entirely accurate or up to date.
Third-party content: Specify that you are not responsible for the content or actions of third-party websites or services linked to or mentioned on your website.
Limitation of Liability: State that you are not liable for any damages or losses resulting from the use of your website or reliance on the information provided.</p><br />

<p><FontAwesomeIcon icon={faStar} style={{color:'crimson'}}/> Governing Law and Jurisdiction: Specify the governing law and jurisdiction that apply to the terms and conditions, typically based on your location.</p><br />

<p><FontAwesomeIcon icon={faStar} style={{color:'crimson'}}/> Modifications: Reserve the right to modify or update the terms and conditions at any time and explain how you will notify users of such changes.</p><br />

<p><FontAwesomeIcon icon={faStar} style={{color:'crimson'}}/> Contact Information: Provide contact details for users to reach out for questions, concerns, or requests related to the terms and conditions.</p><br />

<p><FontAwesomeIcon icon={faStar} style={{color:'crimson'}}/> Remember, this is a general outline, and it's crucial to consult with a legal professional to ensure that your terms and conditions align with the specific needs and requirements of your website and business.</p><br />

</div>
<Footer/>
      </Container>
 </> 
   )
}
