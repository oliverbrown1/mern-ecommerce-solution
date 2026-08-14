import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from './AuthContext';
import axios from 'axios'

export const CartContext = React.createContext(null);

export const CartContextProvider = ({children}) => {
        const { token } = useContext(AuthContext);
        const [cart, setCart] = useState(null);
        const [cartTotal, setCartTotal] = useState(0) ;

        const loadCartState = async () => {
            try{
                const response = await axios.get("/cart/get", {
                    headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }});

                setCart(response.data.cart);
                setCartTotal(response.data.total);
            }
            catch(error){
                console.log(error);
            }
        };

        const addToCart = async ( itemId, quantity ) => {
            try{
                const response = await axios.post("/cart/add", {
                    itemId: itemId,
                    quantity: quantity,
                }, {
                    headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }});

                // relevant alert for what was done 

            }
            catch(error){
                console.log(error)
            }
            loadCartState();
        }

        const modifyCart = async (itemId, quantity) => {
            try{
                const response = await axios.patch(`/cart/modify/:${itemId}`, {
                    quantity: quantity,
                    }, {
                    headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }});
                
                // relevant alert for what was done 

            }
            catch(error){
                console.log(error);
            }
            loadCartState();
        }

        const emptyCart = async () => {
            try{
                const response = await axios.delete(`/cart/empty`, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                // relevant alert for what was done 

            }
            catch(error){
                console.log(error);
            }
            loadCartState();
            
        };

        const checkoutCart = async ( useBalance ) => {
            try{
                const response = await axios.post(`/cart/checkout`, {
                    useBalance : useBalance
                    },{
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                // relevant alert for what was done 

            }
            catch(error){
                console.log(error);
            }
            loadCartState();
        };

        useEffect(() => {
            loadCartState();
        }, [token]);


        return(
            <CartContext.Provider value={{cart, cartTotal, addToCart, modifyCart, emptyCart, checkoutCart}}>
                {children}
            </CartContext.Provider>
        );
}