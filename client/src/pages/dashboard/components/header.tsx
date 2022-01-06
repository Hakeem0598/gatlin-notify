import React from 'react'

type HeaderProps = React.ComponentProps<'div'> & {
    heading: string;
    description: string;
}

function Header({ heading, description }: HeaderProps) {
    return (
        <div>
            <h1 className='text-gray-200 text-2xl font-semibold'>{ heading }</h1>
            <p className='text-gray-500 mt-2'>{ description }</p>
        </div>
    )
}

export default Header
