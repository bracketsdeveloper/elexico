import React from 'react'

const Cancel = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="bg-white shadow-md rounded-lg max-w-2xl p-8">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Cancellation</h1>
        
        <p className="text-gray-700 text-lg mb-4">
          Prakriti reserves the right to accept or reject an order. Order acceptance is subject to dispatch of the product.
          Once the order is placed, order confirmation will be communicated on the registered phone number.
        </p>
        
        <h2 className="text-xl font-medium text-gray-800 mb-4">Cancellation</h2>
        
        <p className="text-gray-700 text-lg mb-4">
          You can cancel the order by contacting our customer support at the phone number provided.
          You will receive a full refund if order cancellation is carried out on the same day of order placement. 
          Else the order will be considered confirmed.
        </p>
        
        <p className="text-gray-600 text-sm">
          For any queries, feel free to contact our support team at the provided phone number.
        </p>
      </div>
    </div>
  )
}

export default Cancel
