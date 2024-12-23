import React, { useState } from 'react';
import axios from 'axios';

function Deny_traffic_from_range_of_Ip_address() {
  const [ipRange, setIpRange] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleDenySubnet = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/deny-subnet', {
        ip_range: ipRange,
      });

      if (response.data.success) {
        setResponseMessage(response.data.message);
        setErrorMessage('');
      } else {
        setErrorMessage(response.data.error);
        setResponseMessage('');
      }
    } catch (error) {
      setErrorMessage('Failed to deny traffic from subnet.');
      setResponseMessage('');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{fontSize:"30px"}}>Deny Traffic from a Subnet or Range of IP Addresses</h1>

      <div style={{display:"flex",gap:"30px",flexDirection:"row",justifyContent:"center",alignItems:"center"}}  className='w-[100%] flex flex-col items-center mt-[30px] gap-[40px]'>
        <label>IP Range/Subnet: </label>
        <input
          type="text"
          value={ipRange}
          onChange={(e) => setIpRange(e.target.value)}
          placeholder="Enter IP Range (e.g., 192.168.1.0/24)"
          style={{ marginLeft: '10px' }}
        />
      <button onClick={handleDenySubnet} style={{ marginTop: '10px' }}>
        Deny Traffic
      </button>
      </div>


      {responseMessage && <p style={{ color: 'green' }}>{responseMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
}

export default Deny_traffic_from_range_of_Ip_address;
