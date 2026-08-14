import React, { useContext, useState } from 'react'
import { CartContext } from '../../context/CartContext'
import { motion } from 'framer-motion'

const ItemPreview = ({item}) => {
    const cart = useContext(CartContext);
    const [isButtonLoading, setIsButtonLoading] = useState(false);

    const addToBasketButton = async (event) => {
        event.preventDefault();
        setIsButtonLoading(true);
        try {
        await cart.addToCart(item.id, );
        } finally {
        setIsButtonLoading(false);
        }
    };
    return (
        <div className="carousel-item">
            <motion.a
                whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
                }}
                className="card flex h-full min-h-80 w-64 flex-shrink-0 border border-white bg-inherit p-2 shadow-xl"
                href={`/item/${item.id || item._id}`}
            >
                <figure className="flex h-44 items-center justify-center overflow-hidden rounded-lg bg-white/10">
                <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="h-full w-full object-contain" />
                </figure>
                <div className="card-body flex flex-1 justify-between p-4">
                <h2 className="card-title line-clamp-2 text-sm">{item.title}<div className="text-sm card-title flex items-center gap-0.5"> {item.rating}
                    <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                </div></h2>
                <div className="card-actions justify-between">
                    <div className="font-bold">£{item.price}</div>
                    <button className="btn btn-primary text-xs">Add To Basket</button>
                </div>
                </div>
            </motion.a>
        </div>
  )
}

export default ItemPreview
