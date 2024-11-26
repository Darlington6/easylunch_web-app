import React from "react";
import Piechart from "./Piechart.js";

const Dashboard = () => {
  return (
    <>
      <div className="p-6 ml-56 font-sans">
        {/* Page Header */}


        {/* Main Content */}
        <div className="grid grid-cols-1 mx-20 md:grid-cols-2 gap-6">
          {/* Piechart Section */}
          <div className="p-4 shadow-lg rounded-lg bg-white">
            <h2 className="text-xl font-semibold text-center mb-4 text-gray-700">
              Order Distribution
            </h2>
            <Piechart />
          </div>

          {/* Data Summary Section */}
          <div className="p-6 shadow-lg rounded-lg bg-gray-100">
            <h2 className="text-xl font-semibold text-center mb-4 text-gray-700">
              Summary
            </h2>
            <ul className="space-y-2">
              <li>
                <strong className="text-gray-800">Total Orders:</strong> 640
              </li>
              <li>
                <strong className="text-gray-800">Incoming Orders:</strong> 320
              </li>
              <li>
                <strong className="text-gray-800">Orders in Process:</strong> 120
              </li>
              <li>
                <strong className="text-gray-800">Completed Orders:</strong> 200
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
