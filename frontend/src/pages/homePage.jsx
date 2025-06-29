import React from 'react'
import { motion } from 'framer-motion'

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
              className="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-52 shadow">
              <div className="card-body">
                <span className="text-lg font-bold">8 Items</span>
                <span className="text-info">Subtotal: $999</span>
                <div className="card-actions">
                  <a href="/checkout" className="btn btn-primary btn-block">View cart</a>
                </div>
              </div>
            </div>
          </div>
          <div className="dropdown dropdown-end">
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
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li><a>Settings</a></li>
              <li><a>Logout</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col w-full">
        <div className="tabs tabs-boxed w-full bg-base-200">
          <a className="tab tab-lg flex-1">Category 1</a>
          <a className="tab tab-lg flex-1 tab-active">Category 2</a>
          <a className="tab tab-lg flex-1">Category 3</a>
        </div>
        <div className="flex-1 p-6 bg-base-100">
          <div className="h-full w-full overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
              
              {/* <div className="card w-96 shadow-xl border border-white"> */}
              <motion.div
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 },
                }}
                className="card w-96 shadow-xl border border-white p-3"
              >
                <figure>
                  <img
                    src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                    alt="Shoes" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">Shoes<div className="text-sm card-title flex items-center gap-0.5">4.4 
                    <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div></h2>
                  <p className="mb-2">Green and white Nike shoes </p>
                  <div className="card-actions justify-between">
                      <div className="text-xl font-bold">£199.99</div>
                      <button className="btn btn-primary btn-md">Add To Basket</button>
                  </div>
                </div>
              </motion.div>
              <div>test2</div>
              <div>test3</div>
              <div> test4</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default homePage