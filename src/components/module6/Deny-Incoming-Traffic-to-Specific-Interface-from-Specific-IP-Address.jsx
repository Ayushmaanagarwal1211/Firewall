import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Deny_Incoming_Traffic_to_Specific_Interface_from_Specific_IP_Address() {
  const [interfaces, setInterfaces] = useState([]);
  const [selectedInterface, setSelectedInterface] = useState('');
  const [ip, setIp] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch available network interfaces
  useEffect(() => {
    const fetchInterfaces = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/get-interfaces');
        if (response.data.success) {
          setInterfaces(response.data.interfaces);
        } else {
          setErrorMessage(response.data.error);
        }
      } catch (error) {
        setErrorMessage('Failed to fetch interfaces.');
      }
    };
    fetchInterfaces();
  }, []);

  const handleDenyIncomingIP = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/deny-incoming-ip', {
        interface: selectedInterface,
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
      setErrorMessage('Failed to deny incoming IP.');
      setResponseMessage('');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{fontSize:"30px"}}>Deny Incoming Traffic to Specific Interface</h1>

      <div style={{display:"flex",gap:"30px",flexDirection:"row",justifyContent:"center",alignItems:"center"}}  className='w-[100%] flex flex-col items-center mt-[30px] gap-[40px]'>
        <label>Interface: </label>
        <select onChange={(e) => setSelectedInterface(e.target.value)} value={selectedInterface}>
          <option value="">Select Interface</option>
          {interfaces.map((iface, index) => (
            <option key={index} value={iface}>
              {iface}
            </option>
          ))}
        </select>
      </div>

      <div style={{display:"flex",gap:"30px",flexDirection:"row",justifyContent:"center",alignItems:"center"}}  className='w-[100%] flex flex-col items-center mt-[30px] gap-[40px]'> 
        <label>IP Address: </label>
        <input
          type="text"
          value={ip}
          onChange={(e) => setIp(e.target.value)}
          placeholder="Enter IP address"
          style={{ marginLeft: '10px' }}
        />

      <button onClick={handleDenyIncomingIP} style={{ marginTop: '10px' }}>
        Deny Incoming Traffic
      </button>
      </div>

      {responseMessage && <p style={{ color: 'green' }}>{responseMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
}

export default Deny_Incoming_Traffic_to_Specific_Interface_from_Specific_IP_Address;