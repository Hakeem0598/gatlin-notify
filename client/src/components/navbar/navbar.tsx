import React, { useContext } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import Logo from '../../assets/gatlin.svg';
import { AuthContext } from '../../context/auth/auth.context';
// import CustomButton from '../custom-button/custom-button';
import { data } from './data';

const scrollWithOffset = (el: HTMLElement) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -70; 
    window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' }); 
}

function Navbar() {
    const { user } = useContext(AuthContext);

    return (
        <div className='fixed top-0 left-0 right-0 border-b border-gray-800 py-2 backdrop-filter backdrop-blur-md z-50'>
            <div className='max-w-6xl mx-auto flex justify-between items-center px-5'>
                <Link className='flex justify-center items-center' to="/">
                    <img className='h-14 w-14' src={Logo} alt='logo' />
                    <span className='text-white font-semibold text-lg'>Gatlin Notify</span>
                </Link>
                <div className='hidden sm:block space-x-8 text-gray-500 text-sm'>
                    {
                        data.map((linkName) => (
                            <Link key={linkName} className='hover:text-white' smooth scroll={el => scrollWithOffset(el)} to={`/#${linkName.toLowerCase()}`}>{linkName}</Link>
                        ))
                    }
                </div>
                <div className='text-sm'>
                    <a href={ user ? '/dashboard' : `${process.env.REACT_APP_API_URL}/auth/discord`} className='group transition duration-300 ml-4 bg-gradient-to-b from-blue-200 to-blue-300 py-3 px-4 rounded-md text-black inline-flex items-center justify-center text-center focus:outline-none hover:glow capitalize'>{ user ? 'Dashboard' : 'Login with discord' }</a>
                    {/* <CustomButton link='/api/auth/discord'>Dashboard</CustomButton> */}
                </div>
            </div>
        </div>
    )
}

export default Navbar
