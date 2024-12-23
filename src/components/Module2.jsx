import React from 'react'
import Allow_1 from './module2/Allow_1';
// import Allow_all_deny_one_port from './module2/Allow_all_deny_one_port';
import Allow_All_Deny_ports from './module2/Allow_All_Deny_ports';
import Allow_All_Ports from './module2/Allow_All_Ports';
import App_list from './module2/App_list';
import Show_All_ports from './module2/Show_All_ports';
export default function Module2() {
  return (
    <div>
       <h1 style={{fontSize:"40px"}}>Access Ports</h1>
      <Allow_1/>
      <h1 style={{fontSize:"40px"}}>Ports Manager</h1>
      <Allow_All_Deny_ports/>
      {/* <Allow_All_Ports/> */}
      <App_list/>
      <Show_All_ports/>
    </div>
  )
}
