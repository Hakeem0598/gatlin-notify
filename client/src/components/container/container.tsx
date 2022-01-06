import React from 'react'

function Container({ children }: React.ComponentProps<'div'>) {
    return (
        <div className='max-w-5xl mx-auto px-8 md:px-20 xl:px-0'>
            { children }
        </div>
    )
}

export default Container
