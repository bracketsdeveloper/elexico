import React from 'react'
import { IoMdCloseCircle } from "react-icons/io";

const DispImage = ({
    imageUrl,
    onClose
}) => {
  return (
    <div className='fixed bottom-0 top-0 right-0 left-0 flex justify-center items-center bg-slate-100'>
        
        <div className='bg-white shadow-lg rounded max-w-5xl mx-auto '>
        <div className='w-fit ml-auto text-2xl hover:text-red-800 cursor-pointer' onClick={onClose}>
        <IoMdCloseCircle className='text-red-600 text-3xl' />
        </div>

        <div className='flex justify-center items-center p-4 max-w-[80vh]'>
        <img src={imageUrl} className='w-full h-full'/>
        </div>
        </div>
    </div>
  )
}

export default DispImage