import React, {useState, useContext} from 'react'
import { CartContext } from '../../context/CartContext'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const ItemCard = ({item}) => {
    const navigate = useNavigate();
    const cart = useContext(CartContext)
    const { addToCart } = cart
    const [isBasketButtonLoading, setIsBasketButtonLoading] = useState(false);

    const addToBasketButton = async (e) => {
        e.preventDefault();
        setIsBasketButtonLoading(true);
        try {
            await addToCart(item.id, 1);
        } finally {
            setIsBasketButtonLoading(false);
        }
    }

    return (
        <motion.a
            type="button"
            whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
            }}
            className="card w-full shadow-xl border border-white p-3 text-left bg-inherit"
            // onClick={() => navigate(`/item/${item.id}`)}
            href={`/item/${item.id}`}
        >
            <figure className="rounded-lg p-3 bg-white/10 ring-1 ring-white/10">
            <img
                src={item.image_url}
                alt="Shoes"
                className="w-full h-48 object-contain" />
            </figure>
            <div className="card-body">
            <h2 className="card-title">{item.name}<div className="text-sm card-title flex items-center gap-0.5">{item.rating} 
                <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00 .95 .69l .5 .5z" />
                </svg>
            </div></h2>
            {/* <p className="mb-2">Green and white Nike shoes </p> */}
            <div className="card-actions justify-between">
                <div className="text-xl font-bold">£{item.price}</div>
                <form onSubmit={addToBasketButton}>
                    <button disabled={isBasketButtonLoading} className="btn btn-primary btn-md pointer-events-none">Add To Basket</button>
                </form>
            </div>
            </div>
        </motion.a>
    )
}

export default ItemCard
