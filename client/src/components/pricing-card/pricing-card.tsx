import React, { useContext } from 'react'
import { FaUser, FaDiscord, FaStarOfLife } from 'react-icons/fa';
import { AuthContext } from '../../context/auth/auth.context';
import { PricingCardProps } from './pricing-card.types';


function PricingCard({ isPopular = false, subscription, price, lookupKey }: PricingCardProps) {
    const { user } = useContext(AuthContext);

    return (
        <div className={`bg-black rounded-xl p-8 max-w-sm border border-gray-800 z-20 ${ isPopular ? 'pt-0' : 'md:rounded-l-none md:border-l-0 md:mt-0 mt-6'} `}>
            {
                isPopular && (
                    <div className='text-right pt-4'>
                        <span className='text-white bg-green-400 rounded-full py-1 px-3 text-xs'>Popular</span>
                    </div>
                )
            }

            <div className='space-y-4'>
                <h2 className='text-blue-300 font-semibold text-xl tracking-wide capitalize'>{subscription}</h2>
                <p className='text-gray-400'>The perfect way to get started and get used to our tools</p>
            </div>

            <h3 className={`text-6xl text-white font-bold text-center ${ subscription === 'yearly' ? 'my-12' : 'my-8' }`}>£{price} <span className='text-sm font-normal'>/ {subscription.slice(0, -2)}</span></h3>

            <ul className='space-y-3 mb-8'>
                <li className='flex items-center space-x-3'>
                    <div className='p-2 rounded-full bg-green-200'>
                        <FaUser className='text-green-800 text-xs' />
                    </div>
                    <span className='text-gray-400 text-sm'>Instant access to products and information</span>
                </li>
                <li className='flex items-center space-x-3'>
                    <div className='p-2 rounded-full bg-green-200'>
                        <FaDiscord className='text-green-800 text-xs' />
                    </div>
                    <span className='text-gray-400 text-sm'>24/7 support and new features every day</span>
                </li>
                <li className='flex items-center space-x-3'>
                    <div className='p-2 rounded-full bg-green-200'>
                        <FaStarOfLife className='text-green-800 text-xs' />
                    </div>
                    <span className='text-gray-400 text-sm'>Cancel anytime</span>
                </li>
            </ul>
            
            <form action={`${process.env.REACT_APP_API_URL}/stripe/create-checkout-session`} method='POST'>
                <input type="hidden" name="lookup_key" value={lookupKey} />
                <button type='submit' className={`${ subscription === 'yearly' ? 'bg-blue-300' : 'bg-gray-900 text-gray-200'} ${ !user && 'cursor-not-allowed' } rounded-lg text-center w-full py-2.5 hover:bg-opacity-90`}  disabled={!!!user}>{user ? 'Get started' : 'Login to purchase'}</button>
            </form>
        </div>
    )
}

export default PricingCard;

