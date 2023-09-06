import React from 'react'
import './UserProfile.css';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import TabPanel from './TabPanel/TabPanel'

const UserProfile = () => {
  return (
    <>

      <Navbar />

      <div className='UserTabPanel'>
      <div className='TabHeading'>
          <h4>Account</h4>
          <span>UG User</span>
        </div>
        <TabPanel />
      </div>

      <Footer />
    
    </>
  )
}

export default UserProfile