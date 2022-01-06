import React, { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'

import { sideBarData } from './data';
import Logo from '../../assets/gatlin.svg';
import { AuthContext } from '../../context/auth/auth.context';
import { GeneralObject } from '../../shared/types';


const SideBar = () => {
    const { user } = useContext(AuthContext);
    const { discord: { avatarURL, username }, role } = user as GeneralObject;

    return (
        <div className='hidden h-screen sm:flex flex-col w-64 border-r border-gray-800'>
            <Link to='/' className='flex items-center py-2 px-4 border-b border-gray-800'>
                <img className='h-14 w-14 -ml-3' src={Logo} alt='Logo'/>
                <h1 className='text-white text-2xl font-semibold'>Gatlin Notify</h1>
            </Link>
            <div className='flex flex-col flex-1'>
                <nav className='flex-1 px-6 py-4 border-b border-gray-800'>
                    {
                        sideBarData.map(({ title, path, icon: Icon }) => (
                            <NavLink 
                                key={title}
                                to={path}
                                className={({ isActive }) => 'text-white py-2 flex items-center' + (isActive ? ' text-gray-500' : '')}
                            >
                                <Icon className='text-lg mr-4' />
                                <span>{title}</span>
                            </NavLink>
                        ))
                    }
                </nav>
                <div >
                    <nav className='px-6 py-4'>
                        <div className='flex items-center'>
                            <img className="h-10 w-10 rounded-full mr-2" src={avatarURL} alt="Avatar" />
                            <div>
                                <div className='text-white text-sm'>{username} 👋</div>
                                <div className='text-xs text-gray-500 capitalize'>{role}</div>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default SideBar;