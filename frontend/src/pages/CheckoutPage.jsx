import React from 'react'

const CheckoutPage = () => {
  return (
    <div className="grid grid-cols-3">
        <div className="h-screen col-span-2">   
            <h2 className="text-xl font-semibold text-center mt-5">Secure Checkout</h2>
            <ul className="steps steps-vertical h-screen w-full p-5">
                <li className="step step-primary">
                    <div className="collapse bg-base-100 border border-white h-full">
                        <input type="radio" name="my-accordion-1" defaultChecked />
                        <div className="collapse-title font-sem sibold">Shipping Address</div>
                        <div className="collapse-content text-sm">Please enter your shipping address below:</div>
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
                    <h2 className="font-bold">£199.99</h2>
                </div>
                <div className="flex flex-row justify-between p-3">
                    <h2 className="font-bold">Shipping:</h2>
                    <h2 className="font-bold">£4.99</h2>
                </div>
                <div className="flex flex-row justify-between p-3">
                    <h2 className="font-bold">Total:</h2>
                    <h2 className="font-bold">£204.98</h2>
                </div>
            </div>

        </div>
    </div>
  )
}

export default CheckoutPage