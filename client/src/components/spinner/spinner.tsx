import React from 'react'

type SpinnerProps = {
    tailwindHeight: string;
}

function Spinner({ tailwindHeight }: SpinnerProps) {
    return (
        <div className={`${tailwindHeight} flex justify-center items-center`}>
            <div className='h-16 w-16 rounded-full border-4 border-gray-800 border-t-gray-600 animate-spinner'></div>
        </div>
    )
}

export default Spinner;

