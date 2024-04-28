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
import SignupClient from '../Pages/signup-client'
import SignupSP from '../Pages/signup-sp'
import ClientProfile from '../Pages/client-profile'
import SPprofile from '../Pages/sp-profile'

const Routers = () => {
  return (
    <Routes>
       <Route path ='/' element={<Navigate to = '/home' />}/>
       <Route path='/home' element={<Home/>}/>
       <Route path='/contact-us' element={<ContactUsScreen/>}/>
       <Route path='/available-jobs' element={<AvailableJobs/>}/>
       <Route path='/service-providers' element={<ServiceProviders/>}/>
       <Route path='/job-details/:id' element={<JobDetails/>}/>
       <Route path='/login-sp' element={<LoginSP/>}/>
       <Route path='/login-client' element={<LoginClient/>}/>
       <Route path='/signup-sp' element={<SignupSP/>}/>
       <Route path='/signup-client' element={<SignupClient/>}/>
       <Route path='/create-job' element={<CreateJob/>}/>
       <Route path='/client-profile' element={<ClientProfile/>}/>
       <Route path='/sp-profile' element={<SPprofile/>}/>
    </Routes>
  )
}

export default Routers