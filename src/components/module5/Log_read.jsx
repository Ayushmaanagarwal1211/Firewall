import React, { useState } from 'react';
import axios from 'axios';

function Log_read() {
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState('');

  // Fetch UFW logs
  const fetchLogs = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/get-ufw-logs');
      const logData = response.data.logs;
      const parsedLogs = parseLogs(logData);
      setLogs(parsedLogs);
      setError('');
    } catch (error) {
      setError('Failed to fetch logs. Ensure the backend is running with proper permissions.');
      setLogs([]);
    }
  };

  // Function to parse UFW logs into structured data
  const parseLogs = (logData) => {
    const logLines = logData.split('\n').filter(line => line.trim() !== '');
    return logLines.map(line => {
      const parts = line.match(/(\w{3}\s+\d+\s+\d{2}:\d{2}:\d{2})\s+(\S+)\s+(.+)/);
      return {
        timestamp: parts ? parts[1] : '',
        service: parts ? parts[2] : '',
        message: parts ? parts[3] : line,
      };
    });
  };

  return (
    <div className="App" style={{ padding: '20px' }}>
      <h1 style={{fontSize:"20px"}}>UFW Logs Viewer</h1>
      <button onClick={fetchLogs} style={{ marginBottom: '20px' }}>Fetch UFW Logs</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div style={{maxHeight:"80vh",overflow:"scroll"}}>

      {logs.length > 0 ? (
        <table style={{ width: '100%', borderCollapse: 'collapse',maxHeight:"80vh",overflow:"scroll" }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Timestamp</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Service</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Message</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, index) => (
              <tr key={index}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{log.message.substring(0,10)}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{log.service}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{log.message.substring(10,log.message.length)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No logs available. Click "Fetch UFW Logs" to load logs.</p>
      )}
      </div>
    </div>
  );
}

export default Log_read;
