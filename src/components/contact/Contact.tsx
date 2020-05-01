import React from 'react';
import './contact.scss';
import profile from '../../shared/images/profil3.png';

 
function Contact() {
    return (
        <div className='contact'>
            <h2>Contact</h2>

            <div className="contact-info"><img src={profile} alt="profile"></img><span>rosi.drott@gmail.com</span></div>
        
        </div>
    );
}
 
export default Contact;