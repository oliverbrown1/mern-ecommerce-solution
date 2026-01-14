import React, { useState, useEffect } from 'react'
// import { motion } from 'framer-motion'
import ItemCard from '../components/home/ItemCard'
import CategoryTabs from '../components/home/CategoryTabs'
import Navbar from '../components/home/Navbar'
import axios from 'axios'

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [homePageItems, setHomePageItems] = useState([]);

  const fetchItems = async () => {
    setIsLoading(true);
    try{
      const response = await axios.get("http://localhost:3001/items/home-screen-items", {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      }
      });
      setHomePageItems(response.data);

    }
    catch(error){
      console.log(error);
      // alert(error.response.data.message)
    }
    finally{
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-base-100">
      <Navbar/>

      <div className="flex-1 flex flex-col w-full">
        <CategoryTabs/>
        <div className="flex-1 p-6 bg-base-100">
          <div className="h-full w-full overflow-y-auto">
            {isLoading ? (
              <div className="flex justify-center items-center h-full">
                <span className="loading loading-spinner loading-lg"></span>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
                {homePageItems.map((item) => (
                  <ItemCard item={item} key={item.id} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
