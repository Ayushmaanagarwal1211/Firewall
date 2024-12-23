import React,{useState,useEffect, useContext} from 'react'
import Context from '../../context/context';

export default function Allow_1() {
  const [port, setPort] = useState('');
  let {render,setRender}= useContext(Context)
  const [responseMessage, setResponseMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Send POST request to Flask API
    try {
      const response = await fetch('http://127.0.0.1:5000/api/allow-port', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ port }),
      });

      const data = await response.json();

      if (response.ok) {
        setResponseMessage(data.message);
        setErrorMessage(null);
      } else {
        setErrorMessage(data.error);
        setResponseMessage(null);
      }
    } catch (error) {
      setErrorMessage('Failed to connect to the server');
      setResponseMessage(null);
    }
    setRender(value=>value+1)
  };
  useEffect(()=>{

  },[responseMessage,errorMessage])
  return (
    <div className="App">
      <h1 className='text-[30px]'>Allow Port Through Firewall</h1>

      <form onSubmit={handleSubmit} className="form-container">
        <label htmlFor="port">Enter Port Number:</label>
        <input
          id="port"
          value={port}
          onChange={(e) => setPort(e.target.value)}
          required
        />
        <button type="submit">Allow Port</button>
      </form>

      {responseMessage && (
        <div className="response">
          <h2>Success:</h2>
          <p>{responseMessage}</p>
        </div>
      )}

      {errorMessage && (
        <div className="error">
          <h2>Error:</h2>
          <p>{errorMessage}</p>
        </div>
      )}
    </div>
  );
}
