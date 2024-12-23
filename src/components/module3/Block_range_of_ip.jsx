import React,{useState,useEffect} from 'react'
import axios from 'axios';
export default function Block_range_of_ip() {
    const [ip, setIp] = useState('');
    const [response, setResponse] = useState('');
    const [error, setError] = useState('');
  
    const handleBlockIp = async () => {
      setResponse('');
      setError('');
  
      try {
        const res = await axios.post('http://127.0.0.1:5000/api/block-ip', { ip });
        setResponse(res.data.message);
      } catch (err) {
        setError(err.response?.data?.error || 'An error occurred');
      }
    };
  
    return (
      <div className="App flex" style={{display:"flex",gap:"20px",flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
        <h1 style={{marginTop:"0px"}}> Range IP Blocker</h1>
        <div>
          <input
            type="text"
            placeholder="Enter IP range"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
          />
          <button onClick={handleBlockIp}>Block IP</button>
        </div>
        {response && <p className="success">{response}</p>}
        {error && <p className="error">{error}</p>}
      </div>
    );
}
