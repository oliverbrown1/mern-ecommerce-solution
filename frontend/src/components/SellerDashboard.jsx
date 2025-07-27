import React from 'react';

const SellerDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">Seller Dashboard</h1>

      {/* summaries */}
      <div className="grid grid-cols-3 gap-4 mb-8 w-5/6">
                <div className="bg-base-200 p-4 rounded-lg">
                  <div className="text-sm text-gray-500">Unique Visitors</div>
                  <div className="text-2xl font-bold">800</div>
                </div>
                <div className="bg-base-200 p-4 rounded-lg">
                  <div className="text-sm text-gray-500">Total Orders</div>
                  <div className="text-2xl font-bold">120</div>
                </div>
                <div className="bg-base-200 p-4 rounded-lg">
                  <div className="text-sm text-gray-500">Total Sales</div>
                  <div className="text-2xl font-bold">$995.50</div>
                </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-5">
        {/* Pie Chart Placeholder */}
        <div className="bg-base-200 p-6 rounded-xl col-span-1">
          <h2 className="text-xl font-semibold mb-4">Sales by Category</h2>
          <div className="bg-white p-4 rounded-lg">
            <img 
              src="https://r-graph-gallery.com/piechart-ggplot2_files/figure-html/thecode2-1.png" 
              alt="Pie Chart" 
              className="w-64 h-64 object-contain"
            />
          </div>
        </div>

        {/* Line Graph Placeholder */}
        <div className="bg-base-200 p-6 rounded-xl col-span-2">
          <h2 className="text-xl font-semibold mb-4">Monthly Sales</h2>
          <div className="bg-white p-4 rounded-lg">
            <img 
              src="https://www.quanthub.com/wp-content/uploads//line_chart_monthly_sales-1-1536x1059.png" 
              alt="Line Graph" 
              className="w-full h-64 object-contain"
            />
          </div>
        </div>
     </div>

        {/* tables */}
        <div className="p-4 grid grid-cols-2 gap-3">
          <div> {/* orders table */}
            <h2 className="text-xl font-semibold mb-4 w-full">Recent Orders</h2>
            <div className="w-fulloverflow-x-auto rounded-box border border-base-content/5 bg-base-200 mb-5">
                <table className="table">
                    {/* head */}
                    <thead>
                    <tr>
                        <th>Order #</th>
                        <th>Date</th>
                        <th>Quantity</th>
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
          </div>
          <div> {/* products table */}
            <h2 className="text-xl font-semibold mb-4 w-full">Products</h2>
            <div className="w-fulloverflow-x-auto rounded-box border border-base-content/5 bg-base-200 mb-5">
                <table className="table">
                    {/* head */}
                    <thead>
                    <tr>
                        <th>Product #</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {/* row 1 */}
                    <tr className="hover:bg-blue-950">
                        <td>1</td>
                        <td>Product 1</td>
                        <td>$44.99</td>
                        <td>5</td>
                        <td>
                            <span className="badge badge-error">Out of Stock</span>
                        </td>
                    </tr>
                    {/* row 2 */}
                    <tr className="hover:bg-blue-950">
                        <td>2</td>
                        <td>Product 2</td>
                        <td>$59.99</td>
                        <td>3</td>
                        <td><span className="badge badge-success">In Stock</span></td>
                    </tr>
                    {/* row 3 */}
                    <tr className="hover:bg-blue-950">
                        <td>3</td>
                        <td>Product 3</td>
                        <td>$19.99</td>
                        <td>2</td>
                        <td><span className="badge badge-success">In Stock</span></td>
                    </tr>
                    </tbody>
                </table>
            </div>
          </div>
        </div>
    </div>
  );
};

export default SellerDashboard;