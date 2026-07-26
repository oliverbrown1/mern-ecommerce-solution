import React, { useEffect, useState } from 'react'
import ItemPreview from '../components/home/ItemPreview'
import Navbar from "../components/home/Navbar"
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { AnimatePresence, motion } from 'framer-motion'

const ItemPage = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [similarItems, setSimilarItems] = useState([]);
  const [currentThumbnail, setCurrentThumbnail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchItem = async () => {
    setIsLoading(true);
    try{
      const response = await axios.get(`http://localhost:3001/items/item/${id}`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      });
      setItem(response.data.item);
      setCurrentThumbnail(response.data.item.thumbnail);
      setSimilarItems(response.data.similar);

    }
    catch(error){
      console.log(error);
    }
    finally{
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchItem();
  }, [id]);

  const imageOnClick = (img) => {
    setCurrentThumbnail(img);
  }

  return (
    <div className='min-h-4/5 py-5 px-4 sm:px-6 lg:px-8'>
      <Navbar/>
      <div className='border rounded-lg shadow-md w-full max-w-6xl mx-auto p-8'>
      {isLoading && (
        <div className="flex justify-center items-center min-h-64">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}

      {!isLoading && item && (
      <>

      {/* item */}
      <section className='mb-12 flex flex-row gap-10 items-start justify-center border-b border-white/10 pb-12'>
        {/* images */}
        <div className="flex flex-col items-center justify-center w-1/2">
          {/* main image */}
          <div className="relative w-full min-h-[28rem] overflow-hidden rounded-2xl bg-white/10 p-4 ring-1 ring-white/10">
            <AnimatePresence mode="wait">
              <motion.figure
                key={currentThumbnail}
                className="absolute inset-0 flex items-center justify-center p-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
              >
                <img
                    src={currentThumbnail}
                    alt={item.title}
                    className="max-h-[26rem] w-full object-contain" />
              </motion.figure>
            </AnimatePresence>
          </div>

          {/* other images */}
          <div className="mt-4 flex w-full flex-row items-center justify-center gap-3 rounded-2xl border border-white/10 bg-base-200/40 p-3">
            {item.images?.map((img, index) => (
              <motion.button 
                onClick={() => imageOnClick(img)} 
                type="button" key={index} 
                className={`overflow-hidden rounded-xl border bg-inherit p-1 transition-colors ${
                  currentThumbnail === img
                    ? "border-secondary ring-2 ring-secondary/40"
                    : "border-white/10"
                }`}
                whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.2 },
                }}
              >
                <img
                  src={img}
                  alt={`Shoes thumbnail ${index + 1}`}
                  className="h-20 w-24 rounded-lg object-cover transition-opacity hover:opacity-80"
                />
              </motion.button>
            ))}
          </div>
        </div>
        {/* info */}
        <div className="flex flex-col gap-5 w-1/2">
          {/* brand, name and desc */}
          <div>
            <h2 className="font-semibold text-secondary text-lg">{item.brand}</h2>
            <h1 className="text-3xl font-bold mt-1">{item.title}</h1>
          </div>
          
          <p className='text-gray-600'>
            {item.description}
          </p>

          {/* price and rating */}
          <div className='flex flex-col gap-2 w-full py-2'>
            <div className="text-3xl font-bold">£{item.price}</div>
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="ml-1 font-medium">{item.rating}</span>
              </div>
              <a href="#reviews" className="text-blue-500 hover:underline">
                (see reviews)
              </a>
            </div>
          </div>

          {/* add to basket */}
          <div className='flex flex-col sm:flex-row gap-4 w-full pt-2'>
            <button className='btn btn-primary btn-md flex-1'>Add To Basket</button>
            <button className='btn btn-outline btn-md flex-1'>Add To Wishlist</button>
          </div>
          
        </div>
      </section>

      {/* more items */}
      <section className='mb-12 border-b border-white/10 pb-12'>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Similar Items</h2>
          <p className="text-sm text-base-content/60">More from the same catalogue lane</p>
        </div>
        <div className="carousel rounded-box w-screen py-2 gap-5">
          {similarItems.map((similarItem) => (
          <ItemPreview item={similarItem} key={similarItem.id || similarItem._id}/>
        ))}
        </div>
        {/* <div className='flex items-stretch gap-4 overflow-x-auto py-2'>
        {similarItems.map((similarItem) => (
          <ItemPreview item={similarItem} key={similarItem.id}/>
        ))}
        </div> */}
      </section>

      {/* reviews */}
      <section id="reviews" className="mx-auto flex w-full max-w-3xl flex-col justify-center rounded-2xl border border-white/10 bg-base-200/40 p-6 shadow-lg">
        {/* review summary */}
        <div className="flex flex-col gap-4 text-center m-2">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold">
              Customer Reviews for <span className="text-secondary">{item.title}</span>
            </h2>
          </div>

          <dl className="flex flex-wrap items-center justify-center gap-4">
            <div className="min-w-40 rounded-xl border border-white/10 bg-base-100/60 px-4 py-3">
              <dt className="text-xs uppercase tracking-wide text-base-content/60">Total Reviews</dt>
              <dd className="mt-1 text-2xl font-bold">{item.reviews.length}</dd>
            </div>

            <div className="min-w-40 rounded-xl border border-white/10 bg-base-100/60 px-4 py-3">
              <dt className="text-xs uppercase tracking-wide text-base-content/60">Average Rating</dt>
              <dd className="mt-1 flex items-center justify-center gap-2 text-2xl font-bold">
                <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span>{item.rating} / 5</span>
              </dd>
            </div>
          </dl>
        </div>
        {/* individual reviews */}
        <div className="flex flex-col gap-5">
          {item.reviews.map((review, index) => (
            <div className="min-w-40 rounded-xl border border-white/10 bg-base-100/60 px-4 py-3" key={index}>
              <dt className="text-xs tracking-wide justify-between flex flex-row w-full">
                <div className="text-primary">
                {review.reviewerName}
                </div>
                <div className="text-base-content/60">
                  {review.date.split('T')[0]}
                </div>
                </dt>
              <dd className="mt-1 flex flex-row w-full justify-between gap-5">
                <div>
                  {review.comment}
                </div>
                <div className="flex shrink-0 items-center gap-1 whitespace-nowrap">
                  <span>{review.rating}</span>
                  <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </dd>
            </div>
          ))}
        </div>
      </section>
      </>
      )}
      </div>
    </div>
  )
}

export default ItemPage
