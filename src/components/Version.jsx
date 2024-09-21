import React , {useState}from 'react'
import { FaRegCopy } from "react-icons/fa";
import { TbBrandGit } from "react-icons/tb";
import { FaLink } from "react-icons/fa6";
import { Link } from 'react-router-dom'

const Version = ({packageDetail}) => {
  
    // In this code we acquiring all the version object in version if packageDetail version is their
    const versions = packageDetail.versions ? Object.entries(packageDetail.versions) : []

      //  This state use for when hover in copy icon 
    const [ishover, setIshover] = useState(false);

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

    // This UI component is showing the version of package with other information
    <div className='my-5 px-2'>

        <div className='flex md:flex-row justify-between flex-col'>
        <div className='md:w-7/12'>
    <h5 className='text-xl text-black font-medium opacity-80'>Version History</h5>

    {/* In this section the version is showing of package with the help of map in which taka array of objects with version and detail and index for unique identity */}
    <section>
        <h6 className='text-sm my-3'>Versions</h6>
       {versions.length > 0 ? (

         versions.map(([version , detail] , index)=>(
             <div key={index}>
  
                 <h6  className='text-sm underline decoration-1 opacity-75 cursor-pointer md:text-lg'>{version}</h6>
                 
             </div>
         ))

       ) : (
        <p>No version available</p>
       )}
    </section>
    </div>

{/* In this section the right side part is shown with npm installation and some other url  */}
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
</div>
</div>
  )
}

export default Version