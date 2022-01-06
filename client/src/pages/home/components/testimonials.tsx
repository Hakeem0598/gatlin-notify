import React from 'react'
import CustomSection from '../../../components/custom-section/custom-section'
import FadeInOnScroll from '../../../components/fade-in-on-scroll/fade-in-on-scroll';
import TestimonialCard from '../../../components/testimonial-card/testimonial-card';
import { testimonyData } from './data';

function Testimonials() {
    return (
        <CustomSection heading="Don't just take our word for it" sectionId='testimonials'>
            <FadeInOnScroll direction='center' className='col-count-1 md:col-count-2 lg:col-count-3'>
                {
                    testimonyData.map((data) => <TestimonialCard key={data.name} {...data} />)
                }
            </FadeInOnScroll>
        </CustomSection>
    )
}

export default Testimonials;
