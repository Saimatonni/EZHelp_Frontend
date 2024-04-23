import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import Home from '../Pages/Home'
import ContactUsScreen from '../Pages/contact-us'
import AvailableJobs from '../Pages/available-job'
import ServiceProviders from '../Pages/service-providers'
import JobDetails from '../Pages/job-details'
import LoginClient from '../Pages/login-client'
import LoginSP from '../Pages/login-sp'
import CreateJob from '../Pages/create-job'

const Routers = () => {
  return (
    <Routes>
       <Route path ='/' element={<Navigate to = '/home' />}/>
       <Route path='/home' element={<Home/>}/>
       <Route path='/contact-us' element={<ContactUsScreen/>}/>
       <Route path='/available-jobs' element={<AvailableJobs/>}/>
       <Route path='/service-providers' element={<ServiceProviders/>}/>
       <Route path='/job-details/:id' element={<JobDetails/>}/>
       <Route path='login-sp' element={<LoginSP/>}/>
       <Route path='login-client' element={<LoginClient/>}/>
       <Route path='create-job' element={<CreateJob/>}/>
    </Routes>
  )
}

export default Routers