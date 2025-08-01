import React from 'react'

const MyProfile = () => {
  return (
    <div>
            <h1 className="text-3xl font-bold mb-8">My Profile</h1>
            
            {/* Rest of your content remains the same */}
            <div className="flex items-start mb-8 gap-20">
              <div className="avatar">
                <div className="w-30 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src="https://i.pravatar.cc/150?img=1" alt="User" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="text-4xl font-bold">D.B Cooper</h2>
                <p className="text-lg text-gray-600">me@example.com</p>
                <p className="text-gray-500">Member since January 2023</p>
              </div>
              {/* ... rest of your content ... */}
            </div>

            {/* summaries */}
            <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-base-200 p-4 rounded-lg">
                  <div className="text-sm text-gray-500">Total Orders</div>
                  <div className="text-2xl font-bold">12</div>
                </div>
                <div className="bg-base-200 p-4 rounded-lg">
                  <div className="text-sm text-gray-500">Total Spent</div>
                  <div className="text-2xl font-bold">$856.45</div>
                </div>
                <div className="bg-base-200 p-4 rounded-lg">
                  <div className="text-sm text-gray-500">Wishlist</div>
                  <div className="text-2xl font-bold">5</div>
                </div>
            </div>

            {/* order table */}  
            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-200 mb-5">
                <table className="table">
                    {/* head */}
                    <thead>
                    <tr>
                        <th>Order #</th>
                        <th>Date</th>
                        <th>Items</th>
                        <th>Total</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {/* row 1 */}
                    <tr className="hover:bg-blue-950">
                        <td>1</td>
                        <td>01/01/2023</td>
                        <td>5</td>
                        <td>$44.99</td>
                        <td>
                            <span className="badge badge-accent">In Progress</span>
                        </td>
                    </tr>
                    {/* row 2 */}
                    <tr className="hover:bg-blue-950">
                        <td>2</td>
                        <td>14/12/2022</td>
                        <td>3</td>
                        <td>$59.99</td>
                        <td><span className="badge badge-success">Delivered</span></td>
                    </tr>
                    {/* row 3 */}
                    <tr className="hover:bg-blue-950">
                        <td>3</td>
                        <td>01/03/2023</td>
                        <td>2</td>
                        <td>$19.99</td>
                        <td><span className="badge badge-success">Delivered</span></td>
                    </tr>
                    </tbody>
                </table>
            </div>

            {/* address and card */}
{/* Address and Payment */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Address */}
            <div className="bg-base-200 p-4 rounded-lg">
                <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
                <form className="space-y-3">
                <input type="text" placeholder="Address" className="input input-bordered w-full" />
                <input type="text" placeholder="City" className="input input-bordered w-full" />
                <div className="flex gap-2">
                    <input type="text" placeholder="Postal Code" className="input input-bordered flex-1" />
                    <select className="select select-bordered">
                    <option>Country</option>
                    <option>US</option>
                    <option>UK</option>
                    </select>
                </div>
                <button className="btn btn-primary btn-sm mt-2">Save</button>
                </form>
            </div>

            {/* Payment */}
            <div className="bg-base-200 p-4 rounded-lg">
                <h2 className="text-xl font-bold mb-4">Payment Method</h2>
                <form className="space-y-3">
                <input type="text" placeholder="Card Number" className="input input-bordered w-full" />
                <div className="flex gap-2">
                    <input type="text" placeholder="MM/YY" className="input input-bordered w-24" />
                    <input type="text" placeholder="CVV" className="input input-bordered w-20" />
                </div>
                <button className="btn btn-primary btn-sm">Save</button>
                </form>
            </div>
            </div>
    </div>
  )
}

export default MyProfile