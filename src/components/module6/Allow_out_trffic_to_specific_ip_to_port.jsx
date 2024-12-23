import React, { useState } from 'react';
import axios from 'axios';

function Allow_out_trffic_to_specific_ip_to_port() {
  const [port, setPort] = useState('');
  const [ip, setIp] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleAllowOutgoingPortIP = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/allow-outgoing-port-ip', {
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
      setErrorMessage('Failed to allow outgoing IP and port.');
      setResponseMessage('');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{fontSize:"30px"}}>Allow Outgoing Traffic to Specific IP on Specific Port</h1>

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
          placeholder="Enter Port number"
          style={{ marginLeft: '10px' }}
        />
      <button onClick={handleAllowOutgoingPortIP} style={{ marginTop: '10px' }}>
        Allow Outgoing Traffic
      </button>
      </div>


      {responseMessage && <p style={{ color: 'green' }}>{responseMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
}

export default Allow_out_trffic_to_specific_ip_to_port;
