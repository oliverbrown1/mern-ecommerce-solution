import React from 'react'
import MyProfile from '../components/profile/MyProfile'
import SellerDashboard from '../components/profile/SellerDashboard'
import Settings from '../components/profile/Settings'
import SettingsTabs from '../components/profile/SettingsTabs'
import { useState } from 'react'

const ProfilePage = () => {
  const [tabs, setTabs] = useState([true, false, false])
  const [activeIndex, setActiveIndex] = useState(0)

  const handleTabClick = (e) => {
    setActiveIndex(parseInt(e.target.value));
    const newTabs = tabs.map((_, index) => index === parseInt(e.target.value) ? true : false);
    setTabs(newTabs);
  }
  
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="min-h-screen rounded-xl border border-white p-10 relative">
        <div className="absolute top-16 right-16 z-10">
          <div className="join join-vertical">
            <SettingsTabs name="Profile" value="0" onClick={handleTabClick} isActive={tabs[0]}/>
            <SettingsTabs name="Seller Dashboard" value="1" onClick={handleTabClick} isActive={tabs[1]}/>
            <SettingsTabs name="Settings" value="2" onClick={handleTabClick} isActive={tabs[2]}/>
          </div>
        </div>
        {tabs[0] && <MyProfile/>}
        {tabs[1] && <SellerDashboard/>}
        {tabs[2] && <Settings/>}
      </div>
    </div>
  )
}

export default ProfilePage