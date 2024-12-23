import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AIT_Specific_Interface_From_Ip() {
  const [interfaces, setInterfaces] = useState([]);
  const [interfaceInput, setInterfaceInput] = useState('');
  const [ipInput, setIpInput] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchInterfaces = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/get-interfaces');
        console.log(response)
        if (response.data.success) {
          setInterfaces(response.data.interfaces);
        } else {
          setErrorMessage('Failed to load interfaces');
        }
      } catch (error) {
        setErrorMessage('Error fetching interfaces');
      }
    };

    fetchInterfaces();
  }, []);

  const handleAllowIP = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/allow-ip-module6', {
        interface: interfaceInput,
        ip: ipInput
      });
      if (response.data.success) {
        setResponseMessage(response.data.message);
        setErrorMessage('');
      } else {
        setErrorMessage(response.data.error);
        setResponseMessage('');
      }
    } catch (error) {
      setErrorMessage('Failed to allow IP on interface');
      setResponseMessage('');
    }
  };

  return (
    <div className="App" style={{ padding: '20px' }}>
      <h1 style={{fontSize:"30px"}}>Allow Incoming Traffic to Interface from Specific IP</h1>

      <div style={{display:"flex",gap:"30px",flexDirection:"row",justifyContent:"center",alignItems:"center"}} className='w-[100%] flex flex-col items-center mt-[30px] gap-[40px]'>
        <label>Choose Network Interface: </label>
        <select  value={interfaceInput} onChange={(e) => setInterfaceInput(e.target.value)} style={{ padding:"10px",marginLeft: '10px' }}>
          <option value="">--Select--</option>
          {interfaces.map((interface1) => (
            <option key={interface1} value={interface1}>{interface1}</option>
          ))}
        </select>
      </div>

      <div style={{display:"flex",gap:"30px",flexDirection:"row",justifyContent:"center",alignItems:"center"}}  className='w-[100%] flex flex-col items-center mt-[30px] gap-[40px]'>
        <label>Enter IP Address: </label>
        <input
          type="text"
          value={ipInput}
          onChange={(e) => setIpInput(e.target.value)}
          placeholder="IP address"
          style={{ marginLeft: '10px' }}
        />
      <button onClick={handleAllowIP} style={{ marginTop: '10px' }}>
        Allow Incoming Traffic
      </button>
      </div>


      {responseMessage && <p style={{ color: 'green' }}>{responseMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
}

export default AIT_Specific_Interface_From_Ip;
