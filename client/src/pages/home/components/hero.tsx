import React from 'react'
import { FiArrowRight } from 'react-icons/fi';
import CustomButton from '../../../components/custom-button/custom-button';
import FadeInOnScroll from '../../../components/fade-in-on-scroll/fade-in-on-scroll';


function Hero() {
    return (
        <section id='home'>
            <FadeInOnScroll
                direction='center'
                className='mx-auto max-w-4xl text-center space-y-8 pt-44 pb-44 sm:pb-52 sm:pt-56 2xl:pt-72'
            >
                <div className="inline-flex relative group">
                    <div className="transition duration-300 group-hover:opacity-100 absolute top-0 right-0 left-0 bottom-0 opacity-80 blur filter bg-blue-300 rounded">
                    </div>
                    <div className="transition duration-300 group-hover:text-white relative text-blue-100 z-100 py-2 px-4 bg-gray-900 rounded-lg font-semibold inline-flex items-center capitalize w-60">
                        <div className='text-lg text-center w-full uppercase'>Buy sell profit</div> 
                    </div>
                </div>

                <h1 className='px-3 text-white text-6xl md:text-7xl uppercase font-bold'>
                    Reselling made <span className='text-blue-300'>easy.</span>
                </h1>

                <h2 className="text-gray-400 px-8 sm:px-24 text-xl sm:text-2xl">A group dedicated to helping you secure the latest sneaker releases, collectibles &#38; profitable items.</h2>
                <CustomButton link='/#pricing'>
                    Purchase now
                    <FiArrowRight className='transition duration-300 transform ml-2 group-hover:translate-x-1'/>
                </CustomButton>
            </FadeInOnScroll>
        </section>
    )
}

export default Hero
