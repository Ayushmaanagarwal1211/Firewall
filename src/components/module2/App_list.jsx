import React,{useState,useEffect} from 'react'

export default function App_list() {
    const [apps, setApps] = useState([]);
    const [selectedApp, setSelectedApp] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [error,setError] = useState(false)
    // Fetch available applications
    useEffect(()=>{
      setTimeout(()=>setError(false),2000)
    },[error])
    const fetchApps = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:5000/api/apps");
        const data = await response.json();
        if (response.ok) {
          setApps(data.apps);
        } else {
          setMessage(data.error || "Failed to fetch application list");
        }
      } catch (error) {
        setMessage("An error occurred while fetching the application list.");
      }
      setLoading(false);
    };
  
    // Allow the selected application
    const allowApp = async () => {
      if (!selectedApp) {
        setMessage("Please select an application to allow.");
        return;
      }
  
      setLoading(true);
      try {
        const response = await fetch("http://localhost:5000/api/allow-app", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ app: selectedApp.trim() }),
        });
        const data = await response.json();
        if (response.ok) {
          setMessage(data.message);
          fetchApps(); // Refresh the list after allowing the app
        } else {setError(true)
          setMessage(data.error || "Failed to allow the application");
        }
      } catch (error) {
        setMessage("An error occurred while allowing the application.");
      }
      setLoading(false);
    };
  
    useEffect(() => {
      fetchApps();
    }, []);
  
    return (
      <div className='bg-[white] flex flex-col items-center' style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
        <h1 className='text-[30px] w-[500px]'>Firewall Application Management</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <h2 className='text-[20px] mt-[20px]'>Available Applications</h2>
            <select
              value={selectedApp}
              onChange={(e) => setSelectedApp(e.target.value)}
              style={{
                width: "200px",
                padding: "10px",
                margin: "10px 0",
              }}
            >
              <option value="">Select an application</option>
              {apps.map((app, index) => (
                <option key={index} value={app}>
                  {app}
                </option>
              ))}
            </select>
            <br />
            <button
              onClick={allowApp}
              style={{
                padding: "10px 20px",
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
            >
              Allow Application
            </button>
          </>
        )}
        {message && <p style={{ marginTop: "20px" }} className={`${error?"text-red-700":"text-green-700"}`}>{message}</p>}
      </div>
    );
}
