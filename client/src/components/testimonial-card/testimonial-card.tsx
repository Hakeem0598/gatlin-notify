import React from 'react'
import { TestimonialCardProps } from './testimonial-card.types'

function TestimonialCard({ imageSrc, name, testimony }: TestimonialCardProps) {
    return (
        <div className='inline-block border border-gray-800 rounded-md mb-4 p-5 relative'>
            <div className='absolute left-0 right-0 bottom-0 top-0 rounded-md bg-white bg-opacity-5'></div>
            <div className='flex items-center mb-4'>
                <img className='rounded-full h-9 w-9 mr-3' src={imageSrc} alt="avatar" />
                <h2 className='font-semibold text-white text-lg'>{name}</h2>
            </div>
            <p className='text-white'>{`"${testimony}"`}</p>
        </div>
    )
}

export default TestimonialCard
