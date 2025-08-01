import React from 'react'
import ItemPreview from '../components/home/ItemPreview'
import Navbar from "../components/home/Navbar"

const ItemPage = () => {
  return (
    <div className='min-h-4/5 py-5 px-4 sm:px-6 lg:px-8'>
      <Navbar/>
      <div className='border rounded-lg shadow-md w-full max-w-6xl mx-auto p-8'>

      {/* item */}
      <div className='flex flex-row gap-10 items-center justify-center mb-10'>
        {/* images */}
        <div className="flex flex-col items-center justify-center w-1/2">
          {/* main image */}
          <figure>
            <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="Shoes" />
          </figure>

          {/* other images */}
          <div className="flex flex-row items-center justify-center gap-4 w-full mt-4">
            <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="Shoes thumbnail 1"
                className="h-20 w-30 object-cover rounded cursor-pointer hover:opacity-80 transition-opacity" />
            <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="Shoes thumbnail 2"
                className="h-20 w-30 object-cover rounded cursor-pointer hover:opacity-80 transition-opacity" />
            <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="Shoes thumbnail 3"
                className="h-20 w-30 object-cover rounded cursor-pointer hover:opacity-80 transition-opacity" />
          </div>
        </div>
        {/* info */}
        <div className="flex flex-col gap-5 w-1/2">
          {/* brand, name and desc */}
          <div>
            <h2 className="font-semibold text-secondary text-lg">Nike</h2>
            <h1 className="text-3xl font-bold mt-1">Green and White Nike Shoes</h1>
          </div>
          
          <p className='text-gray-600'>
            2020 Green and White Nike Uni-Sex Running Shoes that can be used for running, gym, or everday activities.
          </p>

          {/* price and rating */}
          <div className='flex flex-col gap-2 w-full py-2'>
            <div className="text-3xl font-bold">$200.00</div>
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="ml-1 font-medium">4.4</span>
              </div>
              <span className="text-gray-600">(300 reviews)</span>
            </div>
          </div>

          {/* add to basket */}
          <div className='flex flex-col sm:flex-row gap-4 w-full pt-2'>
            <button className='btn btn-primary btn-md flex-1'>Add To Basket</button>
            <button className='btn btn-outline btn-md flex-1'>Add To Wishlist</button>
          </div>
          
        </div>
      </div>

      {/* more items */}
      <div className='flex flex-row items-center justify-center overflow-x-scroll gap-3'>
        <ItemPreview/>
        <ItemPreview/>
        <ItemPreview/>
        <ItemPreview/>
      </div>
      </div>
    </div>
  )
}

export default ItemPage