import React, {useState, useContext, useEffect} from 'react'
import axios from 'axios';
import { CartContext } from '../context/CartContext'
import { AuthContext } from '../context/AuthContext';

export const SHIPPING_PLANS = [
    {
        id: "overnight",
        label: "Overnight",
        price: 7.99,
        note: "Next working day"
    },
    {
        id: "express",
        label: "Express",
        price: 5.99,
        note: "1–2 working days"
    },
    {
        id: "standard",
        label: "Standard",
        price: 4.99,
        note: "3–5 working days"
    }
];

const CheckoutPage = () => {
    const cart = useContext(CartContext);
    const [displayedtotal, setDisplayedTotal] = useState(0)
    const { token } = useContext(AuthContext)
    const [shippingAddress, setShippingAddress] = useState("");
    const [billingAddress, setBillingAddress] = useState("");
    const [balance, setBalance] = useState(0);
    const [shippingIndex, setShippingIndex] = useState(0)

    if (!cart) {
        throw new Error("CartContextProvider is missing");
    }


    const fetchUserInfo = async () => {
        if(!token) return;

        try{
            // get address
            const header_config = {
                headers : {
                    'Authorization': `Bearer ${token}`
                }
            }
            const [addressesResponse, balanceResponse] = await Promise.all(
                [
                    axios.get("/user/addresses", header_config),
                    axios.get("/user/balance", header_config),
                ]
            )
            
            setShippingAddress(addressesResponse.data.shipping);
            setBillingAddress(addressesResponse.data.billing);
            setBalance(balanceResponse.data.balance);
        }
        catch(error){
            console.log(error);
        }
    };

    const selectShippingPlan = async (index) => {
        // no backend logic for this, just frontend customisation
        setShippingIndex(index);
        setDisplayedTotal(cart.cartTotal + SHIPPING_PLANS[shippingIndex].price);

    }

    useEffect(() => {
        fetchUserInfo()
    }, [token]);

    return (
        <div className="grid grid-cols-3">
            <div className="h-screen col-span-2">   
                <h2 className="text-xl font-semibold text-center mt-5">Secure Checkout</h2>
                <ul className="steps steps-vertical h-screen w-full p-5">
                    <li className="step step-primary">
                        <div className="collapse bg-base-100 border border-white h-full">
                            <input type="radio" name="my-accordion-1" defaultChecked />
                            <div className="collapse-title font-sem sibold">Shipping Address</div>
                            <div className="collapse-content text-sm">Please select an option from below:</div>
                        </div>
                    </li>
                    <li className="step">
                        <div className="collapse bg-base-100 border border-white">
                            <input type="radio" name="my-accordion-1" defaultChecked />
                            <div className="collapse-title font-semibold">Shipping Plan</div>
                            <div className="collapse-content text-sm"></div>
                        </div>
                    </li>
                    <li className="step">
                        <div className="collapse bg-base-100 border border-white">
                            <input type="radio" name="my-accordion-1" defaultChecked />
                            <div className="collapse-title font-semibold">Payment</div>
                            <div className="collapse-content text-sm"></div>
                        </div>
                    </li>
                    <li className="step">
                        <div className="collapse bg-base-100 border border-white">
                            <input type="radio" name="my-accordion-1" defaultChecked />
                            <div className="collapse-title font-semibold">Review & Order Summary</div>
                            <div className="collapse-content text-sm"></div>
                        </div>
                    </li>
                </ul>
            </div>
            <div className="col-span-1 h-full bg-blue-900 flex flex-col gap-5">
                <h2 className="text-xl font-semibold text-center mt-5">Basket</h2>
                <div className="flex flex-col justify-center items-center">
                    <h2 className="text-xl font-bold">Cart (1 Item) </h2>
                        <div className="flex flex-row gap-5 p-4"> 
                            <figure className="w-1/3 h-1/3">
                                <img
                                    src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                                    alt="Shoes" />
                            </figure>
                            <div className="flex flex-col gap-3 max-w-2/3">
                                <h2 className="text-xl font-semibold">Shoes</h2>
                                <p className="text-sm">Green and white Nike shoes asdsadasdsadasdsadasdasdasdasdas</p>
                            </div>
                            <div className="justify-center place-items-center flex flex-col">
                                <p>£199.99</p>
                                <button className="btn btn-error">Remove</button>
                            </div>

                        </div>
                </div>
                <div className="justify-items-center w-full">
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend text-sm">Enter a Promo Code</legend>
                        <input type="text" className="input w-full" placeholder="Type here" />
                        <legend className="label text-xs">1 per order</legend>
                    </fieldset>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex flex-row justify-between p-3">
                        <h2 className="font-bold">Subtotal:</h2>
                        <h2 className="font-bold">£{cart.cartTotal}</h2>
                    </div>
                    <div className="flex flex-row justify-between p-3">
                        <h2 className="font-bold">Shipping:</h2>
                        <h2 className="font-bold">£{SHIPPING_PLANS[shippingIndex].price}</h2>
                    </div>
                    <div className="flex flex-row justify-between p-3">
                        <h2 className="font-bold">Total:</h2>
                        <h2 className="font-bold">£{cart.cartTotal}</h2>
                    </div>
                </div>

            </div>
        </div>
  )
}

export default CheckoutPage