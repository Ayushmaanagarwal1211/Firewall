import React, { useState, useEffect } from "react";
import axios from "axios";

const SSHBlocker = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/analyze");
      setLogs(response.data);
    } catch (err) {
      setError("Failed to fetch logs");
    } finally {
      setLoading(false);
    }
  };

  const blockIP = async (ip) => {
    try {
      const response = await axios.post("http://localhost:5000/block", { ip });
      alert(response.data.message);
      fetchLogs(); // Refresh the logs after blocking
    } catch (err) {
      alert("Failed to block IP");
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);
console.log('asassas')
  return (
    <div>
      <h1>SSH Log Analysis</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && logs.length === 0 && <p>No suspicious IPs found.</p>}
      <table border="1">
        <thead>
          <tr>
            <th>IP Address</th>
            <th>Failed Attempts</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, index) => (
            <tr key={index}>
              <td>{log.ip}</td>
              <td>{log.count}</td>
              <td>
                <button onClick={() => blockIP(log.ip)}>Block IP</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SSHBlocker;
