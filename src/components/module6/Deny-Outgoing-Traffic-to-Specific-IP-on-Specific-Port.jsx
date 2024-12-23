import React ,{useState,useEffect}from 'react'
import axios from 'axios';
export default function Deny_Outgoing_Traffic_to_Specific_IP_on_Specific_Port() {
    const [ip, setIp] = useState('');
    const [port, setPort] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
  
    const handleDenyOutgoingTraffic = async () => {
      try {
        const response = await axios.post('http://127.0.0.1:5000/deny-outgoing-port-ip', {
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
        setErrorMessage('Failed to deny outgoing traffic.');
        setResponseMessage('');
      }
    };
  
    return (
      <div style={{ padding: '20px' }}>
        <h1 style={{fontSize:"30px"}}>Deny Outgoing Traffic to Specific IP on a Specific Port</h1>
  
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
          />
        <button  onClick={handleDenyOutgoingTraffic} >
          Deny Outgoing Traffic
        </button>
        </div>
  
  
        {responseMessage && <p style={{ color: 'green' }}>{responseMessage}</p>}
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </div>
    );
}
