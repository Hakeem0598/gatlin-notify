import React from 'react';
import { GoChevronRight } from 'react-icons/go';
import { Link } from 'react-router-dom';

type AnalyticsCardProps = {
    title: string;
    value: string | number;
    path: string;
}

const AnalyticsCard = ({ title, value, path }: AnalyticsCardProps) => {
    return (
        <div className='group shadow-xl hover:grow rounded-xl text-center bg-black overflow-hidden w-80 sm:flex-1 py-3'>
            <h4 className='capitalize transition-all duration-300 group-hover:text-white text-gray-400 font-light'>{title}</h4>
            <div className='py-8'>
                <h1 className={`text-4xl ${title === 'Monthly revenue' ? 'text-green-600' : 'text-gray-200'}`}>{value}</h1>
            </div>
            <Link to={path} className='hover:underline text-blue-600 inline-flex justify-center items-center'>
                <div className='-mt-1'>See more</div>
                <GoChevronRight />
            </Link>
        </div>
    )
}

export default AnalyticsCard;