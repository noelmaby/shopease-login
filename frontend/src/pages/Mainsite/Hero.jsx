import React from 'react'
import heroimg from '../image/hero-image.jpg'

const hero = () => {
  return (
    <div className='max-w-[1640px] mx-auto p-5'>
        <div className='max-h-[500px] relative'>
            <div className='absolute w-full h-full text-gray-200 max-h-[500px] bg-black/30 flex flex-col justify bg-center'>
                <h1 className='ml-3 pt-24 text-4xl sm:text-2xl md:text-6xl lg:text-6xl font-bold'>Simplifying <span className='text-orange-500'>Your</span></h1>
                <h1 className='ml-3 pt-2 text-4xl sm:text-2xl md:text-6xl lg:text-6xl font-bold'> <span className='text-orange-500'>Shopping </span>Experience</h1>
            </div>
            <img className='w-full max-h-[500px] object-cover' src={heroimg} alt="Example image" />
        </div>
    </div>
  )
}

export default hero