import React, { useState } from 'react';
import axios from 'axios';

function Logging_policy() {
  const [loggingLevel, setLoggingLevel] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [error, setError] = useState('');

  const handleSetLogging = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/set-ufw-logging', {
        option: loggingLevel,
      });
      setResponseMessage(response.data.message);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to set logging level');
      setResponseMessage('');
    }
  };

  return (
    <div className="App" style={{ padding: '20px' }}>
      <h1 style={{fontSize:"20px"}}>Set UFW Logging Level</h1>
     <div style={{display:"flex",gap:"30px",alignItems:"center"}}>
      <label>
        Choose Logging Level:
        <select
          value={loggingLevel}
          onChange={(e) => setLoggingLevel(e.target.value)}
          style={{ marginLeft: '10px',padding:"10px" }}
        >
          <option value="">--Select--</option>
          <option value="off">Off</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="full">Full</option>
        </select>
      </label>
      <button onClick={handleSetLogging} style={{ marginLeft: '10px' }}>
        Set Logging
      </button>
      </div>
      {responseMessage && <p style={{ color: 'green' }}>{responseMessage}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default Logging_policy;
