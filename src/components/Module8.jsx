import React from 'react'
import Allow_inbound_http_traffic from './module8/Allow_inbound_http_traffic'
import Allow_incoming_traffic_from_incoming_ip from './module8/Allow_incoming_traffic_from_incoming_ip'
import Allow_traffic_from_range_of_ip from './module8/Allow_traffic_from_range_of_ip'
import Deny_incoming_traffic_from_specific_ip_address from './module8/Deny_incoming_traffic_from_specific_ip_address'

export default function Module8() {
  return (
    <div>
        <Allow_inbound_http_traffic/>
        <Allow_incoming_traffic_from_incoming_ip/>
        <Allow_traffic_from_range_of_ip/>
        <Deny_incoming_traffic_from_specific_ip_address/>
    </div>
  )
}
