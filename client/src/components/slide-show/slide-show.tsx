import React, { useEffect, useState } from 'react';
import { data } from './data';

const colors = ["#60A3D9", "#FFFFFF", "#60A3D9", '#FFFFFF', "#60A3D9", "#FFFFFF", "#60A3D9", '#FFFFFF', "#60A3D9", "#FFFFFF", "#60A3D9", '#FFFFFF'];

function SlideShow() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => prevIndex === colors.length - 1 ? 0 : prevIndex + 1);
        }, 2000)

        return () => clearInterval(interval);
    }, []);

    
    return (
        <div className="my-0 mx-auto overflow-hidden max-w-5xl">
            <div
                className="whitespace-nowrap transition-all duration-1000 space-x-12"
                style={{ transform: `translateX(${-index * 25}%)` }}
            >
                {
                    data.map(({ icon: Icon, name, description, id }) => (
                        <div className="inline-flex items-center px-5 space-x-4 h-24 min-w-min w-1/3 max-w-lg rounded-2xl bg-gray-600 bg-opacity-20" key={id}>
                            <Icon className='text-white text-4xl' />
                            <div>
                                <h2 className='font-semibold text-2xl text-white'>{name}</h2>
                                <p className='text-gray-500 text-sm'>{description}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default SlideShow;

