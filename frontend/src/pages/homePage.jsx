import React from 'react'
import { motion } from 'framer-motion'
import ItemCard from '../components/home/ItemCard'
import CategoryTabs from '../components/home/CategoryTabs'
import Navbar from '../components/home/Navbar'

const homePage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-base-100">
      <Navbar/>

      <div className="flex-1 flex flex-col w-full">
        <CategoryTabs/>
        <div className="flex-1 p-6 bg-base-100">
          <div className="h-full w-full overflow-y-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
              {/* <div className="card w-96 shadow-xl border border-white"> */}
              <ItemCard/>
              <ItemCard/>
              <ItemCard/>
              <ItemCard/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default homePage