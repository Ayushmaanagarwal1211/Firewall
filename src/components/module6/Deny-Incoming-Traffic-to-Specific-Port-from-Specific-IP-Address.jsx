import React, { useState } from 'react';
import axios from 'axios';

function Deny_Incoming_Traffic_to_Specific_Port_from_Specific_IP_Address() {
  const [ip, setIp] = useState('');
  const [port, setPort] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleDenyPortIP = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/deny-port-ip', {
        ip: ip,
        port: port,
      });

      if (response.data.success) {
        setResponseMessage(response.data.message);
        setErrorMessage('');
      } else {
        setErrorMessage(response.data.error);
        setResponseMessage('');
      }
    } catch (error) {
      setErrorMessage('Failed to deny IP on the specified port.');
      setResponseMessage('');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{fontSize:"30px"}}>Deny Incoming Traffic to Specific Port from a Specific IP</h1>

      <div style={{display:"flex",gap:"30px",flexDirection:"row",justifyContent:"center",alignItems:"center"}}  className='w-[100%] flex flex-col items-center mt-[30px] gap-[40px]'>
        <label>IP Address: </label>
        <input
          type="text"
          value={ip}
          onChange={(e) => setIp(e.target.value)}
          placeholder="Enter IP address"
          style={{ marginLeft: '10px' }}
        />
      </div>

      <div style={{display:"flex",gap:"30px",flexDirection:"row",justifyContent:"center",alignItems:"center"}}  className='w-[100%] flex flex-col items-center mt-[30px] gap-[40px]'>
        <label>Port Number: </label>
        <input
          type="text"
          value={port}
          onChange={(e) => setPort(e.target.value)}
          placeholder="Enter Port Number"
          style={{ marginLeft: '10px' }}
        />
      <button onClick={handleDenyPortIP} style={{ marginTop: '10px' }}>
        Deny Traffic
      </button>
      </div>


      {responseMessage && <p style={{ color: 'green' }}>{responseMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
}

export default Deny_Incoming_Traffic_to_Specific_Port_from_Specific_IP_Address;
