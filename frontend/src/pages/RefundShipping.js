import React from 'react';

const RefundShipping = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-lg max-w-4xl mx-auto p-8">
        <h1 className="text-3xl font-semibold text-gray-800 text-center mb-6">Refund & Shipping Policy</h1>
        
        {/* Refund Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Refund</h2>
          <p className="text-gray-700 text-lg mb-4">
            As our products are perishable, all sales are considered final. You are eligible for a refund under the following circumstances:
          </p>
          <ul className="list-disc list-inside text-gray-700 text-md mb-4">
            <li>If the order has been cancelled within the cut-off time.</li>
            <li>If the ordered product is out of stock and Prakriti is unable to produce and/or supply the same due to unforeseen circumstances.</li>
            <li>
              If you received a broken or damaged bottle or the wrong product. In case of such an event, contact our customer support at the provided phone number within twenty-four (24) hours of receipt of the product.
            </li>
          </ul>
          <p className="text-gray-700 text-md mb-4">
            If approved for a refund, the amount will be credited to the card or account used during order placement or the original method of payment.
          </p>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-4">You are not eligible for a refund if:</h3>
          <ul className="list-disc list-inside text-gray-700 text-md mb-4">
            <li>If the shipment was returned due to an incorrect address.</li>
            <li>If arrangements have not been made for taking delivery of the product.</li>
            <li>If you refuse to accept the product at the time of delivery for reasons other than damage.</li>
            <li>If damage to the product is reported after 24 hours of receipt of the product.</li>
          </ul>
          <p className="text-gray-700 text-md mb-4">
            Prakriti reserves the right to approve or refuse the refund.
          </p>
        </div>

        {/* Shipping Section */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Shipping</h2>
          <p className="text-gray-700 text-lg mb-4">
            You agree that you will be responsible for paying shipping costs for returning your item. Shipping costs are nonrefundable and will be deducted from your refund, as applicable.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RefundShipping;
