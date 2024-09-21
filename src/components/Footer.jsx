import React from 'react'
import { SiNpm } from "react-icons/si";
import { BsGithub } from "react-icons/bs";

const Footer = () => {
  return (
    // This component for showing the footer details 
    <div className='px-8 mt-20 md:flex md:px-12  border-t-2 pt-16 '>
     
        <section>
    <SiNpm className='size-12  opacity-80' />
    <BsGithub className='size-12 my-6'/>
    </section>

<article className='md:flex md:items-center md:justify-between md:w-10/12'>
    <section className='my-10 md:-mt-8 md:ml-20' >
        <h5 className='text-lg font-medium'>Support</h5>
        <h6 className='my-4 opacity-80'>Help</h6>
        <h6 className='my-4 opacity-80'>Advisories</h6>
        <h6 className='my-4 opacity-80'>Status</h6>
        <h6 className='my-4 opacity-80'>Contact npm</h6>
        
    </section>
    <section className='my-20 md:-mt-8 ' >
        <h5 className='text-lg font-medium'>Company</h5>
        <h6 className='my-4 opacity-80'>About</h6>
        <h6 className='my-4 opacity-80'>Blog</h6>
        <h6 className='my-4 opacity-80'>Press</h6>
     
        
    </section>

    <section className='my-20 md:-mt-2 ' >
        <h5 className='text-lg font-medium'>Terms & Policies</h5>
        <h6 className='my-4 opacity-80'>Policies</h6>
        <h6 className='my-4 opacity-80'>Terms of Use</h6>
        <h6 className='my-4 opacity-80'>Code of Conduct</h6>
        <h6 className='my-4 opacity-80'>Privacy</h6>
        
    </section>



 
  
    </article>
    </div>
  )
}

export default Footer