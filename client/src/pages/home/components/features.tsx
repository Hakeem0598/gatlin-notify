import React from 'react'
import FeaturesCard from '../../../components/features-card/features-card';
import CustomSection from '../../../components/custom-section/custom-section';
import { featuresData } from './data';

function Features() {
    return (
        <CustomSection heading='features' sectionId='features'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                {
                    featuresData.map((data) => (
                        <FeaturesCard key={data.title} {...data} />
                    ))
                }
            </div>
        </CustomSection>
    )
}

export default Features;
