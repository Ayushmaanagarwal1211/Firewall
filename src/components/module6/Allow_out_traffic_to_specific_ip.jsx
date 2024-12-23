import React, { useState } from 'react';
import axios from 'axios';

function Allow_out_traffic_to_ip() {
  const [ip, setIp] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleAllowOutgoingIP = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/allow-outgoing-ip', {
        ip: ip,
      });
      if (response.data.success) {
        setResponseMessage(response.data.message);
        setErrorMessage('');
      } else {
        setErrorMessage(response.data.error);
        setResponseMessage('');
      }
    } catch (error) {
      setErrorMessage('Failed to allow outgoing IP.');
      setResponseMessage('');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{fontSize:"30px"}}>Allow Outgoing Traffic to Specific IP</h1>

      <div style={{display:"flex",gap:"30px",flexDirection:"row",justifyContent:"center",alignItems:"center"}}  className='w-[100%] flex flex-col items-center mt-[30px] gap-[40px]'>
        <label>Enter IP Address: </label>
        <input
          type="text"
          value={ip}
          onChange={(e) => setIp(e.target.value)}
          placeholder="IP address"
          style={{ marginLeft: '10px' }}
        />
      <button onClick={handleAllowOutgoingIP} style={{ marginTop: '10px' }}>
        Allow Outgoing Traffic
      </button>
      </div>


      {responseMessage && <p style={{ color: 'green' }}>{responseMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
}

export default Allow_out_traffic_to_ip;
