import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import './DeleteRules.css';  // Import external CSS file
import './module9.css'
const Delete_rules = () => {
  const [rules, setRules] = useState([]);
  const [ruleNumber, setRuleNumber] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchUfwStatus();
  }, []);

  const fetchUfwStatus = async () => {
    try {
      const response = await axios.get('http://localhost:5000/ufw-status-module9');
      if (response.data.success) {
        setRules(response.data.status.map((line) => {
          const [ruleNumber, ...rest] = [line.substring(0,4),line.substring(4,line.length)];
 
          return { ruleNumber: ruleNumber.replace('[', '').replace(']', ''), ruleDetails: rest.join(' ') };
        }));
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      setMessage('Error fetching UFW status.');
    }
  };


  const handleDeleteRule = async () => {
    try {
      const response = await axios.post('http://localhost:5000/delete-rule', { rule_number: parseInt(ruleNumber) });
      setMessage(response.data.message);
      fetchUfwStatus();  // Refresh rules after deletion
    } catch (error) {
      setMessage('Error deleting the rule.');
    }
  };

  return (
    <div className="ufw-container">
      <h2>UFW Rule Manager</h2>
      <div>
        <h3>Current UFW Rules:</h3>
        {rules.length > 0 ? (
          <table className="ufw-table">
            <thead>
              <tr>
                <th>Rule Number</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {rules.map((rule) => (
                <tr key={rule.ruleNumber}>
                  <td>{rule.ruleNumber}</td>
                  <td>{rule.ruleDetails}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No rules available.</p>
        )}
      </div>
      <div className="delete-form">
        <label>
          Enter Rule Number to Delete:
          <input
            type="number"
            value={ruleNumber}
            onChange={(e) => setRuleNumber(e.target.value)}
            placeholder="Rule number"
          />
        </label>
        <button onClick={handleDeleteRule}>Delete Rule</button>
      </div>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Delete_rules;
