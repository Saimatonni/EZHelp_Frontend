import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import Home from '../Pages/Home'
import ContactUsScreen from '../Pages/contact-us'
import AvailableJobs from '../Pages/available-job'
import ServiceProviders from '../Pages/service-providers'

const Routers = () => {
  return (
    <Routes>
       <Route path ='/' element={<Navigate to = '/home' />}/>
       <Route path='/home' element={<Home/>}/>
       <Route path='/contact-us' element={<ContactUsScreen/>}/>
       <Route path='/available-jobs' element={<AvailableJobs/>}/>
       <Route path='/service-providers' element={<ServiceProviders/>}/>
    </Routes>
  )
}

export default Routers