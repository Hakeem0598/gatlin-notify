import React, { useEffect, useState } from 'react'
import CustomSection from '../../../components/custom-section/custom-section'
import FadeInOnScroll from '../../../components/fade-in-on-scroll/fade-in-on-scroll';
import PricingCard from '../../../components/pricing-card/pricing-card';
import Spinner from '../../../components/spinner/spinner';
import api from '../../../context/api';

type PriceDetails = {
    lookupKey: string;
    price: number;
}

type Prices = {
    monthly: PriceDetails;
    yearly: PriceDetails;
}

function Pricing() {
    const [prices, setPrices] = useState<Prices>({} as Prices);
    const { monthly, yearly } = prices;

    useEffect(() => {
        let unmounted = false;

        const getPrices = async () => {
            const { data: { prices } } = await api.get('/stripe/prices');
            if (!unmounted) setPrices({ ...prices })
        }

        getPrices()
        return () => {
            unmounted = true;
        }
    }, []);


    return (
        <div className='border-t border-b border-gray-700 relative'>
            <div className='absolute top-0 left-0 right-0 bottom-0 bg-white opacity-5'></div>
            <CustomSection heading='Pricing that just makes sense' sectionId='pricing'>
                <FadeInOnScroll direction='center' className='flex items-center justify-center flex-col md:flex-row'>
                    {
                        !monthly || !yearly ? (
                            <Spinner tailwindHeight='h-96' /> 
                        ) : (
                            <>
                            <PricingCard isPopular subscription='yearly' price={yearly.price / 100} lookupKey={yearly.lookupKey} />
                            <PricingCard subscription='monthly' price={monthly.price / 100} lookupKey={monthly.lookupKey} />
                            </>
                        )
                    }
                </FadeInOnScroll> 
            </CustomSection>
        </div>
    )

}

export default Pricing;

// Dashbord button directs users to dashboard page
    // check if user has a valid membership
        // if they do display their membership
        // if they don't give them a chance to activate a license key

