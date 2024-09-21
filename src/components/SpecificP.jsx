
import React, { useState} from 'react'
import { Link } from 'react-router-dom'
import { FaRegCopy } from "react-icons/fa";
import { TbBrandGit } from "react-icons/tb";
import { FaLink } from "react-icons/fa6";
import Version from './Version';
import { FaTags } from "react-icons/fa6";
import { LuFileSpreadsheet } from "react-icons/lu";

// This component Showing the Specific package and version of package

const SpecificP = ({packageDetail}) => {

    //  This state use for when hover in copy icon 
  const [ishover, setIshover] = useState(false);

  // this state use for toogle the readme and version button to show their specific data
  const [toogleButton, settoogleButton] = useState("readme")
 

  // If packageDetail has no any data it return null
 if(!packageDetail) return null


//  In this latestVersion the version data acquire from object package
 const latestVersion  = packageDetail["dist-tags"].latest

//  in this url acquiring with clear prefix of git+ in url 
 const repository  = packageDetail.repository.url
  const cleanurl = repository.replace("git+" , "")
 

// In this function it copy the text of npm i package name 
 const handleCopy = ()=>{
  const copytext = `npm i ${packageDetail.name}`
  navigator.clipboard.writeText(copytext)
 }

  return (
//   this UI is showing the Particular Package Detail and version 
  <div className='px-4 my-3 md:px-44 md:my-12 '>
    <h3 className='text-3xl font-medium md:text-xl'>{packageDetail.name}</h3>
  <section className='flex items-center gap-2 mt-2'>
    <h6 className='text-sm tracking-widest opacity-75'>{latestVersion}</h6>
    <span className=' opacity-75 text-3xl -mt-4'>.</span>
    <h6 className='text-sm tracking-widest text-teal-900 opacity-75'>public</h6>
    <span className='opacity-75 text-3xl -mt-4'>.</span>
    <h6 className='text-sm tracking-widest opacity-75'>publish 5 month ago</h6>
  </section>


{/* this part is showing the readme and version  */}
   <div className='flex flex-col my-3 md:flex-row'>
    <section className={`flex justify-center gap-3 items-center h-10 w-full  border-l-2 md:border-l-0 border-yellow-400  md:border-b-2 cursor-pointer
      ${toogleButton === "readme" ? " bg-[#FFF5D8]" : ""}
      `}
      onClick={() => settoogleButton("readme")}
      >
        <LuFileSpreadsheet  className='text-yellow-800 size-4'/>
        <h3 className='text-md font-medium  text-yellow-800'>Readme</h3>
    </section>
    <section className={`flex justify-center gap-3 items-center h-10 w-full cursor-pointer  border-l-2 border-teal-400 md:border-l-0 md:border-b-2
      ${toogleButton === "version" ? " bg-[#D4EEF9]" : ""}
      `}
      onClick={()=> settoogleButton("version")}
      >
        <FaTags className='text-teal-700' />

        <h3 className='text-md font-medium  text-teal-700'>Versions</h3>
    </section>
   </div>

{/* this section conditional rendering is use when toogleButton is readme it show readme article and when it is version it show the version component  */}

{
  toogleButton === "readme" ? (

    <article className='flex justify-between flex-col md:flex-row'>
 <div className='md:w-7/12'>
  <div className='inline-block my-3'>
   <h2 className='text-4xl font-medium text-black'>{packageDetail.name}</h2>
  </div>
 <hr />

 <p className='text-md my-3 opacity-75'>{packageDetail.description}</p>

 <section className='my-6 '>
<h6 className='text-2xl font-semibold mb-5'>Documention</h6>
<hr className='mb-4'/>
<Link to={`${packageDetail.homepage}`} className='text-red-500 text-lg font-medium my-4 '

>{packageDetail.homepage}</Link>

 </section>
 
{/* this section keywords are showing with use of map to show the multiple keywords */}
 {packageDetail.keywords && (


 <section>
    <h6 className='text-xl font-medium opacity-65 mb-3'>Keywords</h6>
    <div className='flex flex-wrap gap-3 '>
        {
            packageDetail.keywords.map((keyword , index)=>(

                <h6 key={index} className='text-red-500 text-lg font-medium '>{keyword}</h6>
            ))
        }
    </div>
 </section>
 )}
  </div>

  {/* It show the right side part of readme package where package installation command is there and some other url and information is their */}

  <div className='md:w-1/3  my-3 md:px-5'>
   <section>
    <h5 className='text-md opacity-60 font-medium'>Install</h5>
    <div className='w-full h-12 border-2 rounded-lg flex justify-between items-center mt-5 px-6'>
      <div className={`inline-block ${ishover ? "bg-blue-300" : "bg-transparent"}`}>
      <h5 className='text-sm font-light opacity-80'>npm i <span className='mx-1'>{packageDetail.name}</span></h5>
      </div>
    <FaRegCopy className='opacity-50 cursor-pointer'
    onMouseEnter={()=> setIshover(true)}
    onMouseLeave={()=> setIshover(false)}
    onClick={handleCopy}
    />
    </div>
   </section>
  
   <section className='my-5'>
    <h4 className='text-md opacity-75'>Reposiory</h4>
     <div className='flex items-center gap-3 my-3'>
     <TbBrandGit className='size-5'/>
      <Link to={cleanurl} className='text-black text-md font-medium'>{cleanurl}</Link>
     </div>
   </section>
   <hr />


   <section className='my-5'>
    <h4 className='text-md opacity-75'>Homepage</h4>
     <div className='flex items-center gap-3 my-3'>
     <FaLink className='size-5'/>
      <Link to={`${packageDetail.homepage}`} className='text-black text-md font-medium'>{packageDetail.homepage}</Link>
     </div>
   </section>
   <hr />

  <div className='flex flex-row my-3'>
    <section className='w-1/2 '>
    <h4 className='text-md opacity-75'>Version</h4>
    <h5 className='text-black font-semibold text-md my-2 mx-1'>{latestVersion}</h5>
    </section>
    <section className='w-1/2'>
    <h4 className='text-md opacity-75'>License</h4>
    <h5 className='text-black font-semibold text-md my-2 mx-1'>{packageDetail.license}</h5>
</section>
  </div>
<hr />
</div>
  </article>


  ) : (
// In code Version component is shown when toogle button equal to version
    <Version packageDetail={packageDetail}/>
  )
}
 </div>
  
  )
}

export default SpecificP