import React from 'react'
import Container from '../container/container'
import FadeInOnScroll from '../fade-in-on-scroll/fade-in-on-scroll'
import { CustomSectionProps } from './custom-section.types'

function CustomSection({ heading, sectionId,  children }: CustomSectionProps) {
    return (
        <section id={sectionId} className='py-20'>
            <Container>
                <div className='space-y-10'>
                    <FadeInOnScroll direction='left'>
                        <h1 className='text-white font-bold text-4xl text-center sm:text-5xl lg:text-left capitalize'>{heading}</h1>
                    </FadeInOnScroll>
                    { children }
                </div>
            </Container>
        </section>
    )
}

export default CustomSection
