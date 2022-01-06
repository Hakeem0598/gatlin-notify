import React from 'react'
import { HashLink as Link } from 'react-router-hash-link';

type CustomButtonProps = React.ComponentProps<'a'> & {
    link: string;
}

function CustomButton({ link, children }: CustomButtonProps) {
    return (
        <Link smooth className='group transition duration-300 ml-4 bg-gradient-to-b from-blue-200 to-blue-300 py-3 px-4 rounded-md text-black inline-flex items-center justify-center text-center focus:outline-none hover:glow' to={link}>{children}</Link>
    )
}

export default CustomButton;
