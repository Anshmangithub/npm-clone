import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SpecificP from './components/SpecificP.jsx'

// In this code routing is created where parent component app has child specific package component render 

const router = createBrowserRouter([
  {path : "/",
   element : <App/>,
   children : [
    {path : "/package/:packagename" ,
      element : <SpecificP/>
    }
   ]
   }
   
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
       <RouterProvider router={router} />
  </StrictMode>,
)
