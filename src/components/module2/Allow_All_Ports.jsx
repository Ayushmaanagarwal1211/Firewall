import React, { useState ,useEffect} from 'react'

export default function Allow_All_Ports() {
    const [deniedPorts, setDeniedPorts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
  
    // Fetch denied ports from the API
    const fetchDeniedPorts = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:5000/api/denied-ports");
        const data = await response.json();
        if (response.ok) {
          setDeniedPorts(data.denied_ports);
        } else {
          setMessage(data.error || "Failed to fetch denied ports");
        }
      } catch (error) {
        setMessage("An error occurred while fetching denied ports.");
      }
      setLoading(false);
    };
  
    // Allow all denied ports
    const allowAllPorts = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:5000/api/allow-all", {
          method: "POST",
        });
        const data = await response.json();
        if (response.ok) {
          setMessage(data.message);
          console.log(response.ok)
          fetchDeniedPorts(); // Refresh the list after allowing ports
        } else {
          setMessage(data.message || "Failed to allow ports");
        }
      } catch (error) {
        setMessage("An error occurred while allowing ports.");
      }
      setLoading(false);
    };
  
    // Fetch denied ports on component mount
    useEffect(() => {
      fetchDeniedPorts();
    }, []);
  
    return (
      <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
        <h1>Firewall Management</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <h2>Denied Ports</h2>
            {deniedPorts.length > 0 ? (
              <ul>
                {deniedPorts.map((port, index) => (
                  <li key={index}>{port}</li>
                ))}
              </ul>
            ) : (
              <p>No denied ports found.</p>
            )}
          </>
        )}
        <button
          onClick={allowAllPorts}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Allow All Ports
        </button>
        {message && <p style={{ marginTop: "20px", color: "red" }}>{message}</p>}
      </div>
    );
}
