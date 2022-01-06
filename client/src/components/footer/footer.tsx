import React from 'react'
import Container from '../container/container';
import Logo from '../../assets/gatlin.svg';

function Footer() {
    return (
        <footer className='border-t border-gray-700 py-6'>
            <Container>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center'>
                        <img className='h-8 w-8 mr-1' src={Logo} alt='logo' />
                        <p className='text-gray-500 text-sm'>2021 Gatlin Notify. All Rights Reserved.</p>
                    </div>

                    {/* Navbar */}
                    <div className='flex items-center space-x-6'>
                        <p className='text-gray-500 text-sm'>Home</p>
                        <p className='text-gray-500 text-sm'>Features</p>
                        <p className='text-gray-500 text-sm'>Pricing</p>
                        <p className='text-gray-500 text-sm'>Testimonials</p>
                        <p className='text-gray-500 text-sm'>FAQ</p>
                    </div>
                </div>

            </Container>
        </footer>
    )
}


export default Footer;