import React from 'react'
import Block_specific_ip from './module3/Block_specific_ip'
import Block_range_of_ip from './module3/Block_range_of_ip'

export default function Module3() {
  return (
    <div>
      <h1 className='text-[40px] ' style={{marginTop:"50px"}}>Ip Blocking </h1>
          <Block_specific_ip/>
          <Block_range_of_ip/>
    </div>
  )
}
