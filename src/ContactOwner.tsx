import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ContactOwner: React.FC = () => {
  const navigate = useNavigate(); 
  const [name, setName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState(''); 

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Form submitted:', { name, contactNumber, address, message });
    alert('Thank you for your message! We will be in touch soon.');
    navigate('/'); 
  };

  return (
    <div>
      <h1>Contact Pet Owner</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Your Name:</label>
          <input 
            type="text" 
            id="name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label htmlFor="contactNumber">Contact Number:</label>
          <input 
            type="tel" 
            id="contactNumber" 
            value={contactNumber} 
            onChange={(e) => setContactNumber(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label htmlFor="address">Your Address:</label>
          <input 
            type="text" 
            id="address" 
            value={address} 
            onChange={(e) => setAddress(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label htmlFor="message">Your Message:</label>
          <textarea 
            id="message" 
            value={message} 
            onChange={(e) => setMessage(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default ContactOwner;
