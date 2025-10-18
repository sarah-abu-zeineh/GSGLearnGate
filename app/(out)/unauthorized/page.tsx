import Image from 'next/image'
import React from 'react'

const page = () => {
  return (
    <div className=' h-dvh flex justify-center items-center'>
        <Image src="/img/401 Error Unauthorized (1).gif" width={600} height={600} alt='unauthorized'/>
    </div>
  )
}

export default page
