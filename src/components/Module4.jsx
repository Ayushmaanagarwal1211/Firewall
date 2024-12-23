import React from 'react'
import Default_policy from './module4/Default_policy'
import EnableDisable from './module4/Enable-Disable'
import Ipv6_Support from './module4/Ipv6_support'

export default function Module4() {
  return (
    <div style={{marginBottom:"60px"}}>
        <Default_policy/>
      <EnableDisable/>
      <Ipv6_Support/>
    </div>
  )
}
