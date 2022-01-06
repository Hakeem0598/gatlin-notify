import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../../assets/gatlin.svg';
import Container from '../../../components/container/container';

function Navbar() {
    return (
        <div className='sticky top-0 left-0 right-0 backdrop-filter backdrop-blur-md z-50'>
            <Container>
                <div className='flex items-center justify-between py-3 xl:py-5'>
                    <Link to='/' className='flex items-center'>
                        <img className='h-10 w-10 -ml-2' src={Logo} alt='Logo'/>
                        <h2 className='text-white font-semibold uppercase'>Gatlin Notify</h2>
                    </Link>

                    <a href={`${process.env.REACT_APP_API_URL}/auth/logout`} className='text-red-500 hover:underline'>Logout</a>
                </div>
            </Container>
        </div>
    )
}

export default Navbar
