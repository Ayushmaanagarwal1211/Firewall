import React, { useState } from 'react';
import axios from 'axios';

function Default_policy() {
  const [status, setStatus] = useState('');
  const [denyResponse, setDenyResponse] = useState('');
  const [allowResponse, setAllowResponse] = useState('');

  const fetchStatus = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/fetch-status');
      setStatus(response.data.result);
    } catch (error) {
      setStatus('Error fetching UFW status.');
    }
  };

  const setDefaultDeny = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/default-deny');
      setDenyResponse(response.data.result);
      fetchStatus(); // Refresh status after change
    } catch (error) {
      setDenyResponse('Error setting default deny.');
    }
  };

  const setDefaultAllow = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/default-allow');
      setAllowResponse(response.data.result);
      fetchStatus(); // Refresh status after change
    } catch (error) {
      setAllowResponse('Error setting default allow.');
    }
  };

  return (
    <div className="App" style={{ padding: '20px' }}>
      <h1 style={{fontSize:"30px",marginBottom:"20px"}}> UFW Configuration Dashboard</h1>
    <div style={{display:"flex",gap:"30px"}}>

      <button onClick={fetchStatus}>Fetch UFW Status</button>
      <button onClick={setDefaultDeny} style={{ marginLeft: '10px' }}>Set Default Deny</button>
      <button onClick={setDefaultAllow} style={{ marginLeft: '10px' }}>Set Default Allow</button>
    </div>

      <h2>Status:</h2>
      <pre>{status}</pre>

      <h2>Command Responses:</h2>
      <p><strong>Default Deny Response:</strong> {denyResponse}</p>
      <p><strong>Default Allow Response:</strong> {allowResponse}</p>
    </div>
  );
}

export default Default_policy;
