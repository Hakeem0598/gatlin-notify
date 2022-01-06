import React from 'react'

function Label({ children }: React.ComponentProps<'h4'>) {
    return <h4 className='text-gray-500 text-xs uppercase font-semibold'>{ children }</h4>
}

export default Label
