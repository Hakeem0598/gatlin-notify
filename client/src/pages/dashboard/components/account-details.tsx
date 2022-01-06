import React from 'react'
import { AiTwotoneMail } from 'react-icons/ai';
import { GoKey } from 'react-icons/go';
import { License } from '../../../shared/types';
// import { FaDiscord } from 'react-icons/fa';
// import { ImCross } from 'react-icons/im';
// import { Link } from 'react-router-dom';
import Label from './label';


type AccountDetailsProps = {
    avatarURL: string;
    username: string;
    discriminator: string;
    email: string;
    createdAt: string;
    license: License;
}


function AccountDetails({ avatarURL, username, discriminator, email, createdAt, license }: AccountDetailsProps) {
    return (
        <div className='border border-gray-700 rounded-lg xl:flex-1'>
            <div className='p-6 border-b border-gray-700'>
                <div className='flex items-center'>
                    <img className='h-12 w-12 rounded-full mr-4' src={avatarURL} alt='avatar' />
                    <div>
                        <h2 className='text-gray-200 text-lg'>{username}<span className='text-gray-500 font-medium'>#{discriminator}</span></h2>
                        <h4 className='text-gray-500 text-sm font-medium'>Member since {(new Date(createdAt)).toDateString()}</h4>
                    </div>
                </div>
            </div>

            <div className='px-6 divide-y divide-gray-700'>
                <div className='flex items-center justify-between text-sm py-6'>
                    <div className='flex items-center'>
                        <AiTwotoneMail className='text-gray-500 mr-2'/>
                        <Label>Email</Label>
                    </div>
                    <div className='text-gray-200 font-medium'>{email}</div>
                </div>

                {
                    license?.key && (
                        <>
                            <div className='flex items-center justify-between text-sm py-6'>
                                <div className='flex items-center'>
                                    <GoKey className='text-gray-500 mr-2'/>
                                    <Label>License</Label> 
                                </div>
                                <div className='text-gray-200 font-medium'>{license.key}</div>
                            </div>

                            <form action={`${process.env.REACT_APP_API_URL}/stripe/create-portal-session`} method='POST' className='py-6'>
                                <button type='submit' className='w-full py-2 rounded text-sm font-medium bg-gray-400 transition-all duration-300 hover:bg-gray-200'>Update subscription</button>
                            </form>
                        </>
                    )
                }
            </div>
        </div>
    )
}

export default AccountDetails
