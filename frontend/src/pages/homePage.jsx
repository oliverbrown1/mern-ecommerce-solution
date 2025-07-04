import React from 'react'
import { motion } from 'framer-motion'
import ItemCard from '../components/ItemCard'
import CategoryTabs from '../components/CategoryTabs'

const homePage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-base-100">
      {/* <div className=" p-10 border-b navbar">
        <div classname="text-lg">
          logo
          <h2 className="text-xl font-semibold">MERN Marketplace</h2>
        </div>
        <div>
          <h2 className="text-xl font-semibold">navbar + search</h2>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Profile</h2>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Basket</h2>
        </div>
      </div> */}
    
      <div className="navbar shadow-sm">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">MERN Marketplace</a>
        </div>
        <div>
          <div className="relative inset-y-0 start-0 flex items-center ps-3 input input-bordered w-full">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
            <input type="text" placeholder="Search" className="md:w-auto" />
          </div>
        </div>
        <div className="flex-none">
          <div className="dropdown dropdown-end p-5">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <div className="indicator">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /> </svg>
                <span className="badge badge-sm indicator-item bg-red-500">10</span>
              </div>
            </div>
            <div
              tabIndex={0}
              className="card card-compact dropdown-content bg-base-100 z-50 mt-3 w-52 shadow">
              <div className="card-body">
                <span className="text-lg font-bold">8 Items</span>
                <span className="text-info">Subtotal: $999</span>
                <div className="card-actions">
                  <a href="/checkout" className="btn btn-primary btn-block">View cart</a>
                </div>
              </div>
            </div>
          </div>
          <div className="dropdown dropdown-end z-50">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              <li>
                <a className="justify-between" href="/profile">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li><a href="/login">Logout</a></li>
            </ul>
          </div>
        </div>
      </div>

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