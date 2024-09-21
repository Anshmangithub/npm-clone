import React from 'react'

const Navbar = () => {
  return (
    // This UI component is use for Navbar 
    <div className='border-b-2 w-full h-12 px-5 pt-2 md:px-10 md:h-16 md:pt-5'>
     <nav className='flex flex-shrink-0 gap-3 md:gap-5'>

       <h5 className=''>Pro</h5>
       <h5 className=''>Teams</h5>
       <h5 className=''>Pricing</h5>
       <h5 className=''>Documentation</h5>
     </nav>
    </div>
  )
}

export default Navbar