import React from 'react'
import Footer from '../../components/footer/footer';
import Navbar from '../../components/navbar/navbar';

function PageNotFound() {
    return (
        <div className='h-screen flex flex-col'>
            <Navbar />
            <div className='flex-1 max-w-2xl mx-auto my-auto text-center space-y-8 pt-44 pb-44 sm:pb-52 sm:pt-56 2xl:pt-72'>
                <h1 className='text-6xl text-white'>The page you’re looking for can’t be found.</h1>
            </div>
            <Footer />
        </div>
    )
}

export default PageNotFound;
