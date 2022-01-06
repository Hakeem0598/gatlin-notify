import React from 'react'
import FadeInOnScroll from '../fade-in-on-scroll/fade-in-on-scroll'
import { FeaturesCardProps } from './features-card.types'

function FeaturesCard({ title, direction, paragraph, icon: Icon, ...rest }: FeaturesCardProps) {
    return (
        <FadeInOnScroll { ...rest } direction={direction} className='border border-gray-700 hover:border-gray-400 hover:shadow group transition-all duration-300 p-8 rounded-lg relative'>
            <div className='absolute top-0 left-0 right-0 bottom-0 bg-white opacity-5 rounded-lg transition-all duration-300 group-hover:bg-gray-500'></div>
            <div className='flex items-center mb-6'>
                <Icon className='text-4xl text-blue-300 mr-4' />
                <h2 className='text-white text-2xl font-bold capitalize tracking-wide'>{title}</h2>
            </div>
            <p className='text-gray-500 text-lg'>{paragraph}</p>
        </FadeInOnScroll>
    )
}

export default FeaturesCard;
