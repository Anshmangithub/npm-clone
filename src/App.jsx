import { useEffect, useState } from 'react'

import './App.css'
import axios from 'axios'
import Navbar from './components/Navbar'
import { Link, useParams } from 'react-router-dom'
import SpecificP from './components/SpecificP'
import Footer from './components/Footer'

function App() {

  // this are the states 
  // searchQuery state for input search 
  const [searchQuery, setSearchQuery] = useState("") 


  // this npmPackage is for rendering packages list on search key
  const [npmPackage, setNpmPackage] = useState([])


  // this packageDetail state for showing the specific package 
  const [packageDetail, setpackageDetail] = useState(null)


  // this searchlist state for toggle the list after click it remove
  const [searchList, setsearchList] = useState(false)


  // this is useparams use for taking params from url 
  const {packagename} = useParams()


  // this is npmapi async function where it fetch the api of package list with query about 10 list 
  const npmapi = async (query) => {

    try {
      const response = await axios.get(
        `https://registry.npmjs.org/-/v1/search?text=${query}&size=10`
      );
      setNpmPackage(response.data.objects); // Storing the array of package objects
      setsearchList(true);
     
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
 

  // this packageDetailAPi is async function is use for fetch the specific package detial with their pagename url
  const packageDetialApi = async()=>{
    try {
       const response = await axios.get(`https://registry.npmjs.org/${packagename}`)

       setpackageDetail(response.data);
       setsearchList(false)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

// this handleSerch is use for taking the value from input search on every event
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value.trim()) {
      npmapi(e.target.value); // Trigger search on typing
    }
  };


  // this function handlpackgeCLick is use for when user click on any package it remove the value from input and false the vlaue of setsearchList 
  const handlePackageClick = ()=>{
    setSearchQuery('')
    setsearchList(false)
  }
   

  // this useEffect use for mounting the data on browser and updating on dependencies
  useEffect(()=>{

    // it call the packageDetailApi when packagename is there and when user goes to / path the package will be null 
  if(packagename){
    packageDetialApi()

  }else if(location.pathname === "/"){
    setpackageDetail(null)
    setsearchList(false)
  }
  }, [packagename ])
  

  return (

    // this is UI for Navbar , search input , signup , login, footer  section. It is parent component and 
    // In this component the Specific package is shown with readme and version detail 

    <div className='overflow-x-hidden'>
     <div className='w-screen h-screen '>
      {/* this is navbar it is reuseable component  */}
   <Navbar/>
     
     {/* This code for  search input with responsiveness  */}
     <div className='w-full h-16 border-b-2  md:h-20 flex items-center '>
      <Link to={"/"}>
      <img src="/npm-logo-imgage.png" alt="" className='size-24 mx-3  '/>
      </Link>
      <div className='w-full h-20  flex items-center p-5 md:visible invisible '>

        {/* this input for search the query for desktop */}
        <input type="text" className='w-9/12 h-12 bg-[#F2F2F2] px-5 border-hidden'
        name='searchQuery'
         value={searchQuery}
         onChange={handleSearch}
        placeholder='search packages'/>
        
        <button className='w-20 h-12 md:w-28 bg-black text-white font-medium'
        onClick={() => npmapi(searchQuery)}>Search</button>
            </div>

            {/* this section for signup and login button */}
            <div className='absoulte flex z-10 -ml-52'>
            <button className='w-24 h-12 border-2 '>
        sign Up
            </button>
            <button className='w-24 h-12  '>
        sign In
            </button>
            </div>
            </div>
   

   {/* this search input for mobile device  */}
      <div className='w-full h-16  flex items-center p-5 md:hidden'>
        <input type="text" className='w-9/12 h-12 bg-[#F2F2F2] px-5 border-hidden' placeholder='search packages'
        name='searchQuery'
        value={searchQuery}
        onChange={handleSearch}
        />
        <button className='w-20 h-12 bg-black text-white font-medium' 
      onClick={() => npmapi(searchQuery)}
        >Search</button>
      </div>

  


{/* In this section the when the searchlist is ture the packagelist is shown */}

  {searchList && (


<div className=' w-8/12 h-auto bg-white  mx-5 -my-2  md:-my-4 md:mx-36 overflow-hidden z-20 absolute'>
<ul className='flex flex-col w-full'>
  {

    // In this section show the list of package with name , description and version on searchquery with using map for showing the list of package
    npmPackage.map((pack) => (

      // this link is use for rendering the specific detail of package with their name 

     <Link to={`/package/${pack.package.name}`} key={pack.package.name} 
     onClick={handlePackageClick}>

      <li className='p-2 flex justify-between items-center border-[1px] border-slate-200' >
       
        <div className='flex-1 overflow-hidden'> 
          <h4 className='text-sm font-medium'>{pack.package.name}</h4>
          <p className='text-xs text-ellipsis overflow-hidden whitespace-nowrap'>{pack.package.description}</p> 
        </div>
        <h5 className='text-md'>{pack.package.version}</h5>
        
      </li>
      </Link>
   ))
  }
</ul>
</div>
  )}

  {/* In this section I use the conditional rendering if packageDetail is there it show the Specific package 
  and in specific package component i pass the packageDetail as props and use that data on that component */}

{
  packageDetail  ? (<SpecificP  packageDetail={packageDetail}/>) : (


    // If there is no any package so it show the Landing page ui with Building Amazing Images and some other text and button 
    <div className='w-screen min-h-screen md:px-96 '
    style={{
      backgroundImage : 'linear-gradient(270deg, rgba(176, 42, 42, 0.16) 0%, rgba(176, 42, 42, 0.56) 18.45%, rgba(176, 42, 42, 0.8) 49.67%, rgba(176, 42, 42, 0.56) 82.52%, rgba(176, 42, 42, 0.196364) 99.7%, rgba(189, 40, 40, 0) 99.71%, rgba(203, 56, 55, 0) 99.72%, rgba(203, 56, 55, 0.16) 99.73%) , url("https://static-production.npmjs.com/abf53a31b2da4657a1a004ee9358551c.png")',
      backgroundPosition : "center"
      

    }}
    >
  
     <section ><h3 className='text-5xl font-semibold md:medium text-white text-wrap text-center pt-20 md:text-[80px] '>Build Amazing Things</h3></section>
     <section>
      <h6 className='text-center text-white text-sm my-7 px-5 leading-relaxed md:px-[20vh] md:text-md md:mt-14'>We're GitHub, the company behind the npm Registry and npm CLI. We offer those to the community for free, but our day job is building and selling useful tools for developers like you.</h6>
      </section>

      <section>
       <h3 className='text-2xl text-white text-center font-semibold md:text-4xl md:px-28 md:mt-3'>Take your JavaScript development up a notch</h3>
      </section>

      <section>
        <h6 className='text-center text-white text-sm my-5 px-3 leading-relaxed md:px-[20vh] md:text-md md:mt-14' >Get started today for free, or step up to npm Pro to enjoy a premium JavaScript development experience, with features like private packages.</h6>
      </section>

      <section className='flex md:flex-row flex-col px-5 gap-4 mt-10'>
        <button className='bg-[#FFC329] rounded-3xl text-black font-semibold w-full h-14'>Sign up for free</button>
        <button className='bg-[#CB3837] border-2 border-white text-white font-semibold w-full h-14 rounded-3xl'>Learn about pro</button>
      </section>
    </div>
  )
}


  <Footer/>
  </div>
    </div>
  )
}

export default App

